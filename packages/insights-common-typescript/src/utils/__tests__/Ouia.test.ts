import { getOuiaPropsFactory, setOuiaPage } from '../Ouia';

describe('src/utils/Ouia.test.ts', () => {
    it('setOuiaPage sets data-ouia-page-type on document', () => {
        setOuiaPage('list-items');
        expect(document.body).toHaveAttribute('data-ouia-page-type', 'list-items');
    });

    it('setOuiaPage sets data-ouia-page-action on document', () => {
        setOuiaPage('list-items', 'view');
        expect(document.body).toHaveAttribute('data-ouia-page-action', 'view');
    });

    it('setOuiaPage removes data-ouia-page-action on document', () => {
        setOuiaPage('list-items', 'view');
        setOuiaPage('list-items');
        expect(document.body).not.toHaveAttribute('data-ouia-page-action');
    });

    it('setOuiaPage sets data-ouia-page-object-id on document', () => {
        setOuiaPage('policy-detail', 'view', 'abcd-edfg-asdg-0121');
        expect(document.body).toHaveAttribute('data-ouia-page-object-id', 'abcd-edfg-asdg-0121');
    });

    it('setOuiaPage removes data-ouia-page-object-id on document', () => {
        setOuiaPage('policy-detail', 'view', 'abcd-edfg-asdg-0121');
        setOuiaPage('policy-detail', 'view');
        expect(document.body).not.toHaveAttribute('data-ouia-page-object-id');
    });

    it('getOuiaFactory returns a Function', () => {
        expect(getOuiaPropsFactory('foo')).toBeInstanceOf(Function);
    });

    it('getOuiaProps returns data-ouia-component-type with prefix of the framework value sent to the factory', () => {
        const getOuiaProps = getOuiaPropsFactory('foobarbaz');
        expect(getOuiaProps('table', 'table-001')['data-ouia-component-type']).toStartWith('foobarbaz');
    });

    it('after prefix of data-ouia-component-type and type is separated by a slash', () => {
        const getOuiaProps = getOuiaPropsFactory('foobarbaz');
        expect(getOuiaProps('table', 'table-001')['data-ouia-component-type']).toBe('foobarbaz/table');
    });

    it('getOuiaProps returns data-ouia-component-id with the id', () => {
        const getOuiaProps = getOuiaPropsFactory('foobarbaz');
        expect(getOuiaProps('table', 'table-001')['data-ouia-component-id']).toBe('table-001');
    });

    it('getOuiaProps returns data-ouia-safe with default to true', () => {
        const getOuiaProps = getOuiaPropsFactory('foobarbaz');
        expect(getOuiaProps('table', 'table-001')['data-ouia-safe']).toBe(true);
    });

    it('getOuiaProps returns data-ouia-safe with provided value', () => {
        const getOuiaProps = getOuiaPropsFactory('foobarbaz');
        expect(getOuiaProps('table', 'table-001', false)['data-ouia-safe']).toBe(false);
    });
});
