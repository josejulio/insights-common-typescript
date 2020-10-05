import fetchMockJest from 'fetch-mock-jest';
import { execute, getProgram } from '../schema';
import { existsSync, readFileSync, mkdirSync } from 'fs';
import rimRaf from 'rimraf';
import fetchMock from 'node-fetch';

jest.mock('node-fetch', () => fetchMockJest.sandbox());

describe('src/cli/schema', () => {
    it('getProgram default values', () => {
        const {
            skipPostProcess,
            skipActionGenerator,
            addEslintDisable
        } = getProgram();
        const options = {
            skipPostProcess,
            skipActionGenerator,
            addEslintDisable
        };
        expect(options).toEqual({
            skipPostProcess: false,
            skipActionGenerator: false,
            addEslintDisable: true
        });
    });

    describe.each([
        './src/cli/__tests__/notifications-openapi.json',
        './src/cli/__tests__/policies-openapi.json',
        './src/cli/__tests__/simple-openapi.json'
    ])('execute for %s', (filename) => {

        const tempSchemaDir = './tmp/schemas';

        beforeEach(() => {
            mkdirSync(tempSchemaDir, {
                recursive: true
            });
        });

        afterEach(() => {
            rimRaf.sync(tempSchemaDir);
        });

        it('execute input file accepts path', () => {
            return execute({
                inputFile: filename,
                output: tempSchemaDir,
                skipPostProcess: false,
                addEslintDisable: true,
                skipActionGenerator: false
            }).then(() => {
                expect(existsSync(`${tempSchemaDir}/Generated.ts`)).toBeTruthy();
                expect(readFileSync(`${tempSchemaDir}/Generated.ts`).toString()).toMatchSnapshot();

            });
        });

        it('execute accepts urls', async () => {
            (fetchMock as any).get('http://foobar.baz/my-openapi.json', {
                body: readFileSync(filename).toString(),
                status: 200
            });

            return execute({
                inputFile: 'http://foobar.baz/my-openapi.json',
                output: tempSchemaDir,
                addEslintDisable: true,
                skipPostProcess: false,
                skipActionGenerator: false
            }).then(() => {
                (fetchMock as any).restore();
                expect(existsSync(`${tempSchemaDir}/Generated.ts`)).toBeTruthy();
                expect(readFileSync(`${tempSchemaDir}/Generated.ts`).toString()).toMatchSnapshot();
            });
        });
    });
});
