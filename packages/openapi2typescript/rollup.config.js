import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import typescript from '@rollup/plugin-typescript';
import compiler from '@ampproject/rollup-plugin-closure-compiler';
import dts from 'rollup-plugin-dts';
import execute from 'rollup-plugin-execute';

const extensions = [ '.js', '.ts' ];

const buildItemConfig = (inputFilename, isWatch, external) => {
    const outputs = [
        {
            file: `${inputFilename}.js`,
            format: 'umd',
            name: 'index',
            sourcemap: true
        }
    ];

    const dtsPlugin = [ dts() ];

    if (!isWatch) {
        outputs.push(
            {
                file: `esm/${inputFilename}.js`,
                format: 'esm',
                sourcemap: true
            },
            {
                file: `cjs/${inputFilename}.js`,
                format: 'cjs',
                sourcemap: true
            }
        );
    } else {
        dtsPlugin.push(execute('which yalc > /dev/null && yalc publish --changed --push'));
    }

    return [
        {
            input: `src/${inputFilename}.ts`,
            output: outputs,
            external,
            plugins: [
                json(),
                typescript({
                    allowSyntheticDefaultImports: true
                }),
                commonjs({
                    extensions
                }),
                compiler()
            ]
        },
        {
            input: `src/${inputFilename}.ts`,
            output: [
                {
                    file: `${inputFilename}.d.ts`
                }
            ],
            external,
            plugins: dtsPlugin
        }
    ];
};

export default function makeConfig(params) {

    return [
        ...buildItemConfig('index', !!params.watch, [ 'zod' ]),
        ...buildItemConfig('react-fetching-library', !!params.watch, [ 'zod', 'react-fetching-library' ])
    ];
}
