#!/usr/bin/env node

import { Command } from 'commander';
import * as jq from 'node-jq';
import { CLIEngine } from 'eslint';
import { Codegen } from 'openapi3-typescript-codegen/dist/codegen';
import { OpenAPI3 } from 'openapi3-typescript-codegen/dist/schema';
import fetch from 'node-fetch';
import isUrl from 'is-url';

const program = new Command();

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

const execute = async (options: Options) => {
    const templatePath: string = options.templatePath ?? `${__dirname}/../src/schemas`;

    let inputType = 'file';
    let input = options.inputFile;

    if (isUrl(options.inputFile)) {
        inputType = 'string';
        input = await fetch(options.inputFile, {
            headers: {
                Accept: 'application/json'
            }
        }).then(res => res.text());
    }

    jq.run('.', input, {
        sort: true,
        input: inputType
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
};

execute(program as unknown as Options);
