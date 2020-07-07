import { localUrl } from '..';

describe('src/config/Config', () => {

    beforeEach(() => {
        (global as any).insights = undefined;
    });

    it('localUrl does prepend beta to path if running on beta', () => {
        expect(localUrl('/foo/bar', true)).toBe('/beta/foo/bar');
    });

    it('localUrl does not prepend beta to path when not in beta ', () => {
        expect(localUrl('/baz/bar', false)).toBe('/baz/bar');
    });
});
