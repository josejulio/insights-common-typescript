#!/usr/bin/env ts-node-script

import { program } from 'commander';
import * as jq from 'node-jq';
import { CLIEngine } from 'eslint';
import { Codegen } from 'openapi3-typescript-codegen/dist/codegen';
import { OpenAPI3 } from 'openapi3-typescript-codegen/dist/schema';

program
.description('Generates the actions needed by react-fetching-library to do the queries out of the openapi.json file')
.option(
    '-t, --template-path <template-path>',
    'Path to load the templates (defaults to local templates)'
)
.requiredOption(
    '-i, --input-file <openapijson-path>',
    'URL or local path to the openapi.json file.'
)
.requiredOption(
    '-o, --output <output-path>',
    'Output path to put the generated files'
);
program.parse(process.argv);

interface Options {
    templatePath?: string;
    inputFile: string;
    output: string;
}

const options = program as unknown as Options;

const templatePath: string = options.templatePath ?? './src/schemas';

jq.run('.', program.inputFile, {
    sort: true
}).then(output => {
    return new Codegen(
        templatePath,
        options.output,
        {
            generateEnums: true
        }
    ).generate(JSON.parse(output as string) as OpenAPI3);
}).then(async () => {
    const eslint = new CLIEngine({
        fix: true
    });
    const results = await eslint.executeOnFiles([ `${options.output}/*.ts*` ]);
    return CLIEngine.outputFixes(results);
});
