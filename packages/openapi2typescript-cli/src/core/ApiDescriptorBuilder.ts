import { isReference, OpenAPI3 } from './types/OpenAPI3';
import {
    APIDescriptor, Type, StringMap, Schema, SchemaObject, SchemaOrType, SchemaType, SchemaUnknown, SchemaWithTypeName,
    Parameter, ParamType, Path, RequestBody, Response, Verb, deType, isType
} from './types/ApiDescriptor';
import camelcase from 'camelcase';
import { sortByKey } from './Utils';

const refToName = (reference: OpenAPI3.Reference) => {
    const [ last ] = reference.$ref.split('/').reverse();
    return last;
};

export interface ApiDescriptorBuilderOptions {
    nonRequiredPropertyIsNull: boolean;
}

const verbs = [ Verb.GET, Verb.POST, Verb.PUT, Verb.DELETE ];

const EMPTY_SCHEMA_KEY = '__Empty';

class ApiDescriptorBuilder {
    readonly topSchemas: StringMap<SchemaWithTypeName>;
    readonly openapi: Readonly<OpenAPI3>;
    readonly options: ApiDescriptorBuilderOptions;

    constructor(openapi: OpenAPI3, options: Partial<ApiDescriptorBuilderOptions>) {
        this.openapi = openapi;
        this.topSchemas = this.getTopSchemasPlaceholders();
        this.options = {
            nonRequiredPropertyIsNull: false,
            ...options
        };
    }

    public build(): APIDescriptor {
        const descriptor: APIDescriptor = {
            basePath: this.getBasePath(),
            components: {
                schemas: this.getSchemaComponents()
            },
            paths: this.getPaths()
        };

        this.findAndFixLoops(descriptor);

        return descriptor;
    }

    private findAndFixLoops(descriptor: APIDescriptor) {
        for (const [ name, schema ] of Object.entries(descriptor.components?.schemas ?? {})) {
            this.findAndFixLoopsOfSchema(schema, [ name ]);
        }
    }

    private findAndFixLoopsOfArraySchema(schemasOrTypes: Array<SchemaOrType>, typePath: Array<string>) {
        for (const schemaOrType of schemasOrTypes) {
            this.findAndFixLoopsOfSchema(schemaOrType, typePath);
        }
    }

    private findAndFixLoopsOfSchema(schemaOrType: SchemaOrType, typePath: Array<string>) {
        const localTypePath = [ ...typePath ];
        if (isType(schemaOrType)) {
            if (localTypePath.includes(schemaOrType.typeName)) {
                schemaOrType.hasLoop = true;
            }

            localTypePath.push(schemaOrType.typeName);

            if (schemaOrType.hasLoop) {
                // Loop already identified, nothing else to do.
                return;
            }
        }

        const schema = deType(schemaOrType);

        switch (schema.type) {
            case SchemaType.OBJECT:
                if (schema.properties) {
                    this.findAndFixLoopsOfArraySchema(Object.values(schema.properties), localTypePath);
                }

                if (schema.additionalProperties) {
                    this.findAndFixLoopsOfSchema(schema.additionalProperties, localTypePath);
                }

                break;
            case SchemaType.ARRAY:
                if (schema.items) {
                    this.findAndFixLoopsOfSchema(schema.items, localTypePath);
                }

                break;
            case SchemaType.ANY_OF:
                this.findAndFixLoopsOfArraySchema(schema.anyOf, localTypePath);
                break;
            case SchemaType.ONE_OF:
                this.findAndFixLoopsOfArraySchema(schema.oneOf, localTypePath);
                break;
            case SchemaType.ALL_OF:
                this.findAndFixLoopsOfArraySchema(schema.allOf, localTypePath);
                break;
        }
    }

    private getSchemaComponents(): StringMap<SchemaWithTypeName> {
        if (this.openapi.components?.schemas) {
            for (const [ typeName, schema ] of Object.entries(this.openapi.components.schemas)) {
                if (isReference(schema)) {
                    throw new Error('Invalid reference found at component level');
                } else {
                    Object.assign(this.topSchemas[typeName], {
                        ...this.getSchema(schema) as SchemaWithTypeName
                    });
                }
            }
        }

        return this.topSchemas;
    }

    private getPaths(): Array<Path> {
        const paths: Array<Path> = [];
        if (this.openapi.paths) {
            for (const [ pathKey, openApiPath ] of sortByKey(Object.entries(this.openapi.paths))) {
                const path: Path = {
                    operations: [],
                    path: pathKey
                };

                for (const verb of verbs) {
                    const openApiOp = openApiPath[verb.toLowerCase()] as OpenAPI3.Operation;

                    if (!openApiOp) {
                        continue;
                    }

                    const id = camelcase(
                        openApiOp.operationId ?? `${verb}_${pathKey.replace(/{/g, 'By_').replace(/[/}]/g, '_')}`,
                        {
                            pascalCase: true
                        }
                    );

                    let requestBody;
                    if (openApiOp.requestBody) {
                        requestBody = {
                            schema: this.getRequestBodyOrResponseSchemaOrType(openApiOp.requestBody)
                        };
                    }

                    const responses = this.getResponses(openApiOp.responses);

                    if (openApiOp) {
                        path.operations.push({
                            id,
                            description: openApiOp.summary,
                            parameters: this.getParameters(openApiOp.parameters),
                            path: pathKey,
                            verb,
                            requestBody,
                            responses
                        });
                    }
                }

                paths.push(path);
            }
        }

        return paths;
    }

    private getRequestBody(requestOrRef: OpenAPI3.RequestBody | OpenAPI3.Reference) : RequestBody {
        const requestBodySchema = this.getRequestBodyOrResponseSchemaOrType(requestOrRef);
        const schema: SchemaOrType = requestBodySchema ? requestBodySchema :  {
            type: SchemaType.UNKNOWN
        };

        return {
            schema
        };
    }

    private getEmptyType(): Type<Schema> {
        if (!this.topSchemas[EMPTY_SCHEMA_KEY]) {
            this.topSchemas[EMPTY_SCHEMA_KEY] = {
                typeName: EMPTY_SCHEMA_KEY,
                type: SchemaType.STRING,
                maxLength: 0,
                isOptional: true
            };
        }

        return {
            typeName: EMPTY_SCHEMA_KEY,
            referred: this.topSchemas[EMPTY_SCHEMA_KEY]
        };
    }

    private getResponses(oapiResponses: OpenAPI3.Responses): Array<Response> {
        const responses: Array<Response> = [];
        if (oapiResponses) {
            if (oapiResponses.default) {
                throw new Error('default response not yet supported');
            }

            for (const [ status, oapiResponse ] of sortByKey(Object.entries(oapiResponses))) {
                const response = this.getRequestBodyOrResponseSchemaOrType(oapiResponse);

                responses.push({
                    status,
                    schema: response !== undefined ? response : this.getEmptyType()
                });
            }
        }

        return responses;
    }

    private getRequestBodyOrResponseSchemaOrType(
        requestOrResponse: OpenAPI3.RequestBody | OpenAPI3.Response | OpenAPI3.Reference) : SchemaOrType | undefined {
        if (isReference(requestOrResponse)) {
            throw new Error('Reference for RequestBody or Response is not yet supported');
        }

        if (requestOrResponse.content) {
            const keys = Object.keys(requestOrResponse.content);
            if (keys.length > 0) {
                const firtSchema = requestOrResponse.content[keys[0]].schema;
                if (firtSchema) {
                    return this.getSchema(firtSchema);
                }
            }
        }

        return undefined;
    }

    private getParameters(oapiParameters: Array<OpenAPI3.Parameter | OpenAPI3.Reference> | undefined) {
        if (!oapiParameters) {
            return [];
        }

        const parameters: Array<Parameter> = [];
        for (const oapiParam of oapiParameters) {
            if (isReference(oapiParam)) {
                throw new Error('Parameters as Reference is not yet supported');
            } else {
                let paramType: ParamType;
                switch (oapiParam.in) {
                    case 'header':
                        paramType = ParamType.HEADER;
                        break;
                    case 'query':
                        paramType = ParamType.QUERY;
                        break;
                    case 'cookie':
                        paramType = ParamType.COOKIE;
                        break;
                    case 'path':
                        paramType = ParamType.PATH;
                        break;
                }

                let typeOrSchema;
                if (oapiParam.schema !== undefined) {
                    typeOrSchema = this.getSchema(oapiParam.schema);
                } else {
                    typeOrSchema = {
                        type: SchemaType.UNKNOWN
                    };
                }

                if (oapiParam.required || paramType === ParamType.PATH) {
                    typeOrSchema.isOptional = false;
                } else if (!oapiParam.required) {
                    typeOrSchema.isOptional = true;
                }

                parameters.push({
                    type: paramType,
                    name: oapiParam.name,
                    schema: typeOrSchema
                });
            }
        }

        return parameters;
    }

    private getSchemaType(schema: OpenAPI3.Schema): Schema {
        if (schema.allOf) {
            return {
                type: SchemaType.ALL_OF,
                allOf: schema.allOf.map(s => this.getSchema(s))
            };
        } else if (schema.oneOf) {
            return {
                type: SchemaType.ONE_OF,
                oneOf: schema.oneOf.map(s => this.getSchema(s))
            };
        } else if (schema.anyOf) {
            return {
                type: SchemaType.ANY_OF,
                anyOf: schema.anyOf.map(s => this.getSchema(s))
            };
        } else if (schema.enum) {
            return {
                type: SchemaType.ENUM,
                enum: schema.enum
            };
        } else if (schema.type) {
            switch (schema.type) {
                case 'array':
                    return {
                        type: SchemaType.ARRAY,
                        items: schema.items ? this.getSchema(schema.items) : {
                            type: SchemaType.UNKNOWN
                        }
                    };
                case 'number':
                    return {
                        type: SchemaType.NUMBER
                    };
                case 'integer':
                    return {
                        type: SchemaType.INTEGER
                    };
                case 'string':
                    return {
                        type: SchemaType.STRING
                    };
                case 'boolean':
                    return {
                        type: SchemaType.BOOLEAN
                    };
                case 'null':
                    return {
                        type: SchemaType.NULL
                    };
                case 'object':
                    return this.getSchemaForObject({ ...schema, type: 'object' });
                default:
                    throw new Error(`Unknown type found: ${schema.type} for schema ${JSON.stringify(schema)}`);
            }
        } else {
            return {
                type: SchemaType.UNKNOWN
            };
        }
    }

    private getSchema(schemaOrRef: OpenAPI3.Schema | OpenAPI3.Reference): SchemaOrType {
        if (isReference(schemaOrRef)) {
            const typeName = refToName(schemaOrRef);
            return {
                typeName,
                isNullable: false,
                isOptional: false,
                referred: this.topSchemas[typeName]
            };
        } else {
            const schema = this.getSchemaType(schemaOrRef);
            if (schemaOrRef.nullable) {
                schema.isNullable = true;
            }

            return schema;
        }
    }

    private getSchemaForObject(schema: OpenAPI3.Schema & { type: 'object' }): SchemaObject | SchemaUnknown {
        if (schema.properties || schema.additionalProperties) {
            let additionalProperties: SchemaObject['additionalProperties'] = undefined;
            if (schema.additionalProperties) {
                if (schema.additionalProperties === true) {
                    additionalProperties = {
                        type: SchemaType.UNKNOWN
                    };
                } else {
                    additionalProperties = this.getSchema(schema.additionalProperties);
                }
            }

            let properties: SchemaObject['properties'] = undefined;
            if (schema.properties) {
                properties = {};
                for (const [ key, value ] of sortByKey(Object.entries(schema.properties))) {
                    properties[key] = this.getSchema(value);
                    if (!schema.required?.includes(key)) {
                        properties[key].isOptional = true;
                        if (this.options.nonRequiredPropertyIsNull) {
                            properties[key].isNullable = true;
                        }
                    }
                }
            }

            return {
                type: SchemaType.OBJECT,
                additionalProperties,
                properties
            };
        }

        return {
            type: SchemaType.UNKNOWN
        };
    }

    private getBasePath(): string {
        if (this.openapi.servers) {
            const variables = this.openapi.servers[0].variables;
            if (variables?.basePath?.default) {
                return variables.basePath.default;
            }
        }

        return '';
    }

    private getTopSchemasPlaceholders(): StringMap<SchemaWithTypeName> {
        const schemas: StringMap<SchemaWithTypeName> = {};
        if (this.openapi.components?.schemas) {
            for (const [ typeName ] of sortByKey(Object.entries(this.openapi.components.schemas))) {
                schemas[typeName] = {
                    typeName
                } as unknown as SchemaWithTypeName;
            }
        }

        return schemas;
    }
}

export const buildApiDescriptor = (openapi: Readonly<OpenAPI3>, options?: Partial<ApiDescriptorBuilderOptions>): APIDescriptor => {
    const builder = new ApiDescriptorBuilder(openapi, options ?? {});
    return builder.build();
};
