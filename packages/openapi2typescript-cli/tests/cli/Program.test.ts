import { getProgram } from '../../src/cli/Program';
import { ActionGeneratorType } from '../../src/core/types/ActionGeneratorType';

describe('src/Program', () => {
    it('getProgram default values', () => {
        expect(getProgram()).toMatchObject({
            skipPostProcess: false,
            actionGenerator: ActionGeneratorType.NONE,
            addEslintDisable: false,
            skipTypes: false,
            strict: true,
            explicitTypes: false
        });
    });

    it('Allows to override default values', () => {
        expect(getProgram().parse([
            '--skip-post-process',
            '--action-generator',
            'react-fetching-library',
            '--add-eslint-disable',
            '--skip-types',
            '--no-strict',
            '--explicit-types',
            '-i',
            'input',
            '-o',
            'output'
        ], {
            from: 'user'
        })).toMatchObject({
            skipPostProcess: true,
            actionGenerator: ActionGeneratorType.REACT_FETCHING_LIBRARY,
            addEslintDisable: true,
            skipTypes: true,
            strict: false,
            explicitTypes: true
        });
    });
});
