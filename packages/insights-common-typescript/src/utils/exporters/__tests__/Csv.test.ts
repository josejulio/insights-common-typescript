import { ExporterCsv, ExporterHeaders } from '../Csv';
import { ExporterType } from '../Type';

describe('src/utils/exporters/Csv', () => {

    const foo = {
        just: 'an',
        object: 'with some' as string | undefined,
        values: 'and keys',
        nested: {
            array: [ 'ba', 1, 2, 3 ],
            orOther: {
                objects: 'bye'
            }
        }
    };

    class FooExporterCsv extends ExporterCsv<typeof foo> {
        headers(): ExporterHeaders<FooExporterCsv, typeof foo> {
            return [
                [ 'just-2', 'Justice' ],
                [ 'object', 'Object,and,stuff' ],
                [ 'array', 'Array "data"' ]
            ];
        }

        serialize(element) {
            return {
                'just-2': element.just,
                object: element.object,
                array: element.nested.array.join(',')
            };
        }
    }

    it('Exports elements to csv string', () => {
        const exporter = new FooExporterCsv();
        const result = exporter.export([ foo, { ...foo, just: 'foo,baz', object: undefined }, { ...foo, just: '"bar,ok"' }]);
        const reader = new FileReader();
        return new Promise((done) => {
            reader.addEventListener('loadend', () => {
                expect(reader.result).toEqual(
                    'Justice,"Object,and,stuff","Array ""data"""\ran,with some,"ba,1,2,3"\r"foo,baz",,"ba,1,2,3"\r"""bar,ok""",with some,"ba,1,2,3"\r'
                );
                done(undefined);
            });
            reader.readAsText(result);
        });
    });

    it('Children class is of type CSV', () => {
        const exporter = new FooExporterCsv();
        expect(exporter.type).toBe(ExporterType.CSV);
    });

    it('Blob result is text/csv', () => {
        const exporter = new FooExporterCsv();
        expect(exporter.export([ foo ]).type).toBe('text/csv');
    });
});
