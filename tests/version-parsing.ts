import * as assert from 'assert';
import {parse} from '..';

describe('Version', () => {
    describe('Npm version', () => {
        it('Major version (comparator ^)', () => {
            const expected = '^1';
            const {version} = parse(`name@${expected}`);

            assert.strictEqual(version!.original, expected);
            assert.strictEqual(version!.basic, '1');
            assert.strictEqual(version!.comparator, '^');
        });

        it('Major version (comparator ~)', () => {
            const expected = '~1';
            const {version} = parse(`name@${expected}`);

            assert.strictEqual(version!.original, expected);
            assert.strictEqual(version!.basic, '1');
            assert.strictEqual(version!.comparator, '~');
        });

        it('Major version (comparator >)', () => {
            const expected = '>1';
            const {version} = parse(`name@${expected}`);

            assert.strictEqual(version!.original, expected);
            assert.strictEqual(version!.basic, '1');
            assert.strictEqual(version!.comparator, '>');
        });

        it('Major version (comparator <)', () => {
            const expected = '<1';
            const {version} = parse(`name@${expected}`);

            assert.strictEqual(version!.original, expected);
            assert.strictEqual(version!.basic, '1');
            assert.strictEqual(version!.comparator, '<');
        });

        it('Major version (comparator <=)', () => {
            const expected = '<=1';
            const {version} = parse(`name@${expected}`);

            assert.strictEqual(version!.original, expected);
            assert.strictEqual(version!.basic, '1');
            assert.strictEqual(version!.comparator, '<=');
        });

        it('Major version (comparator >=)', () => {
            const expected = '>=1';
            const {version} = parse(`name@${expected}`);

            assert.strictEqual(version!.original, expected);
            assert.strictEqual(version!.basic, '1');
            assert.strictEqual(version!.comparator, '>=');
        });

        it('Major version (@scope) (comparator >=1.X.*`)', () => {
            const expected = '>=1.X.*';
            const {version} = parse(`@scope/name@${expected}`);

            assert.strictEqual(version!.original, expected);
            assert.strictEqual(version!.basic, '1.X.*');
            assert.strictEqual(version!.comparator, '>=');
        });

        it('Major version', () => {
            const expected = '1';
            const {version} = parse(`name@${expected}`);

            assert.strictEqual(version!.original, expected);
            assert.strictEqual(version!.basic, expected);
        });

        it('Major version (@scope)', () => {
            const expected = '1';
            const {version} = parse(`@scope/name@${expected}`);

            assert.strictEqual(version!.original, expected);
            assert.strictEqual(version!.basic, expected);
        });

        it('Major version (X-Ranges x)', () => {
            const expected = 'x';
            const {version} = parse(`name@${expected}`);

            assert.strictEqual(version!.original, expected);
            assert.strictEqual(version!.basic, expected);
        });

        it('Major version (@scope) (X-Ranges x)', () => {
            const expected = 'x';
            const {version} = parse(`@scope/name@${expected}`);

            assert.strictEqual(version!.original, expected);
            assert.strictEqual(version!.basic, expected);
        });

        it('Major version (X-Ranges X)', () => {
            const expected = 'X';
            const {version} = parse(`name@${expected}`);

            assert.strictEqual(version!.original, expected);
            assert.strictEqual(version!.basic, expected);
        });

        it('Major version (@scope) (X-Ranges X)', () => {
            const expected = 'X';
            const {version} = parse(`@scope/name@${expected}`);

            assert.strictEqual(version!.original, expected);
            assert.strictEqual(version!.basic, expected);
        });

        it('Major version (X-Ranges *)', () => {
            const expected = '*';
            const {version} = parse(`name@${expected}`);

            assert.strictEqual(version!.original, expected);
            assert.strictEqual(version!.basic, expected);
        });

        it('Major version (@scope) (X-Ranges *)', () => {
            const expected = '*';
            const {version} = parse(`@scope/name@${expected}`);

            assert.strictEqual(version!.original, expected);
            assert.strictEqual(version!.basic, expected);
        });

        it('Major version (X-Ranges x.1.0)', () => {
            const expected = 'x.1.0';
            const {version} = parse(`name@${expected}`);

            assert.strictEqual(version!.original, expected);
            assert.strictEqual(version!.basic, expected);
        });

        it('Major version (@scope) (X-Ranges x.1.0)', () => {
            const expected = 'x.1.0';
            const {version} = parse(`@scope/name@${expected}`);

            assert.strictEqual(version!.original, expected);
            assert.strictEqual(version!.basic, expected);
        });

        it('Major version (X-Ranges X.1.0)', () => {
            const expected = 'X.1.0';
            const {version} = parse(`name@${expected}`);

            assert.strictEqual(version!.original, expected);
            assert.strictEqual(version!.basic, expected);
        });

        it('Major version (@scope) (X-Ranges X.1.0)', () => {
            const expected = 'X.1.0';
            const {version} = parse(`@scope/name@${expected}`);

            assert.strictEqual(version!.original, expected);
            assert.strictEqual(version!.basic, expected);
        });

        it('Major version (X-Ranges *.1.0)', () => {
            const expected = '*.1.0';
            const {version} = parse(`name@${expected}`);

            assert.strictEqual(version!.original, expected);
            assert.strictEqual(version!.basic, expected);
        });

        it('Major version (@scope) (X-Ranges *.1.0)', () => {
            const expected = '*.1.0';
            const {version} = parse(`@scope/name@${expected}`);

            assert.strictEqual(version!.original, expected);
            assert.strictEqual(version!.basic, expected);
        });

        it('Minor version', () => {
            const expected = '1.2';
            const {version} = parse(`name@${expected}`);

            assert.strictEqual(version!.original, expected);
            assert.strictEqual(version!.basic, expected);
        });

        it('Minor version (@scope)', () => {
            const expected = '1.2';
            const {version} = parse(`@scope/name@${expected}`);

            assert.strictEqual(version!.original, expected);
            assert.strictEqual(version!.basic, expected);
        });

        it('Minor version (X-Ranges 1.x)', () => {
            const expected = '1.x';
            const {version} = parse(`name@${expected}`);

            assert.strictEqual(version!.original, expected);
            assert.strictEqual(version!.basic, expected);
        });

        it('Minor version (@scope) (X-Ranges 1.x)', () => {
            const expected = '1.x';
            const {version} = parse(`@scope/name@${expected}`);

            assert.strictEqual(version!.original, expected);
            assert.strictEqual(version!.basic, expected);
        });

        it('Minor version (X-Ranges 1.*)', () => {
            const expected = '1.*';
            const {version} = parse(`name@${expected}`);

            assert.strictEqual(version!.original, expected);
            assert.strictEqual(version!.basic, expected);
        });

        it('Minor version (@scope) (X-Ranges 1.*)', () => {
            const expected = '1.*';
            const {version} = parse(`@scope/name@${expected}`);

            assert.strictEqual(version!.original, expected);
            assert.strictEqual(version!.basic, expected);
        });

        it('Minor version (X-Ranges 1.X)', () => {
            const expected = '1.x';
            const {version} = parse(`name@${expected}`);

            assert.strictEqual(version!.original, expected);
            assert.strictEqual(version!.basic, expected);
        });

        it('Minor version (@scope) (X-Ranges 1.X)', () => {
            const expected = '1.x';
            const {version} = parse(`@scope/name@${expected}`);

            assert.strictEqual(version!.original, expected);
            assert.strictEqual(version!.basic, expected);
        });

        it('Minor version (X-Ranges 1.x.0)', () => {
            const expected = '1.x.0';
            const {version} = parse(`name@${expected}`);

            assert.strictEqual(version!.original, expected);
            assert.strictEqual(version!.basic, expected);
        });

        it('Minor version (@scope) (X-Ranges 1.x.0)', () => {
            const expected = '1.x.0';
            const {version} = parse(`@scope/name@${expected}`);

            assert.strictEqual(version!.original, expected);
            assert.strictEqual(version!.basic, expected);
        });

        it('Minor version (X-Ranges 1.X.0)', () => {
            const expected = '1.x.0';
            const {version} = parse(`name@${expected}`);

            assert.strictEqual(version!.original, expected);
            assert.strictEqual(version!.basic, expected);
        });

        it('Minor version (@scope) (X-Ranges 1.X.0)', () => {
            const expected = '1.x.0';
            const {version} = parse(`@scope/name@${expected}`);

            assert.strictEqual(version!.original, expected);
            assert.strictEqual(version!.basic, expected);
        });

        it('Minor version (X-Ranges 1.*.0)', () => {
            const expected = '1.*.0';
            const {version} = parse(`name@${expected}`);

            assert.strictEqual(version!.original, expected);
            assert.strictEqual(version!.basic, expected);
        });

        it('Minor version (@scope) (X-Ranges 1.*.0)', () => {
            const expected = '1.*.0';
            const {version} = parse(`@scope/name@${expected}`);

            assert.strictEqual(version!.original, expected);
            assert.strictEqual(version!.basic, expected);
        });

        it('Minor version (X-Ranges x.*.X)', () => {
            const expected = 'x.*.X';
            const {version} = parse(`name@${expected}`);

            assert.strictEqual(version!.original, expected);
            assert.strictEqual(version!.basic, expected);
        });

        it('Minor version (@scope) (X-Ranges x.*.X)', () => {
            const expected = 'x.*.X';
            const {version} = parse(`@scope/name@${expected}`);

            assert.strictEqual(version!.original, expected);
            assert.strictEqual(version!.basic, expected);
        });

        it('Patch version', () => {
            const expected = '1.2.0';
            const {version} = parse(`name@${expected}`);

            assert.strictEqual(version!.original, expected);
            assert.strictEqual(version!.basic, expected);
        });

        it('Minor version (@scope)', () => {
            const expected = '1.2.0';
            const {version} = parse(`@scope/name@${expected}`);

            assert.strictEqual(version!.original, expected);
            assert.strictEqual(version!.basic, expected);
        });

        it('Minor version (X-Ranges 1.0.x)', () => {
            const expected = '1.0.x';
            const {version} = parse(`name@${expected}`);

            assert.strictEqual(version!.original, expected);
            assert.strictEqual(version!.basic, expected);
        });

        it('Minor version (@scope) (X-Ranges 1.0.x)', () => {
            const expected = '1.0.x';
            const {version} = parse(`@scope/name@${expected}`);

            assert.strictEqual(version!.original, expected);
            assert.strictEqual(version!.basic, expected);
        });

        it('Minor version (X-Ranges 1.0.*)', () => {
            const expected = '1.0.*';
            const {version} = parse(`name@${expected}`);

            assert.strictEqual(version!.original, expected);
            assert.strictEqual(version!.basic, expected);
        });

        it('Minor version (@scope) (X-Ranges 1.0.*)', () => {
            const expected = '1.0.*';
            const {version} = parse(`@scope/name@${expected}`);

            assert.strictEqual(version!.original, expected);
            assert.strictEqual(version!.basic, expected);
        });

        it('Minor version (X-Ranges 1.0.X)', () => {
            const expected = '1.0.X';
            const {version} = parse(`name@${expected}`);

            assert.strictEqual(version!.original, expected);
            assert.strictEqual(version!.basic, expected);
        });

        it('Minor version (@scope) (X-Ranges 1.0.X)', () => {
            const expected = '1.0.X';
            const {version} = parse(`@scope/name@${expected}`);

            assert.strictEqual(version!.original, expected);
            assert.strictEqual(version!.basic, expected);
        });

        it('Empty version', () => {
            const actual = () => parse('@scope/name@');

            assert.throws(actual, {
                message: 'Expected "*", "0", "<", "<=", ">", ">=", "X", "^", "x", "~", or [1-9] but end of input found.'
            });
        });
    });

    describe('Semver version', () => {
        it('Basic version', () => {
            const expected = '1.0.0';
            const {version} = parse(`name@${expected}`);

            assert.strictEqual(version!.original, expected);
            assert.strictEqual(version!.basic, expected);
        });

        it('Basic version (@scope)', () => {
            const expected = '1.0.0';
            const {version} = parse(`@scope/name@${expected}`);

            assert.strictEqual(version!.original, expected);
            assert.strictEqual(version!.basic, expected);
        });

        it('Pre-release version (1.0.0-alpha)', () => {
            const expected = '1.0.0-alpha';
            const {version} = parse(`name@${expected}`);

            assert.strictEqual(version!.original, expected);
            assert.strictEqual(version!.basic, '1.0.0');
            assert.strictEqual(version!.preRelease, 'alpha');
        });

        it('Pre-release version (1.0.0-alpha.1)', () => {
            const expected = '1.0.0-alpha.1';
            const {version} = parse(`name@${expected}`);

            assert.strictEqual(version!.original, expected);
            assert.strictEqual(version!.basic, '1.0.0');
            assert.strictEqual(version!.preRelease, 'alpha.1');
        });

        it('Pre-release version (1.0.0-0.3.7)', () => {
            const expected = '1.0.0-0.3.7';
            const {version} = parse(`name@${expected}`);

            assert.strictEqual(version!.original, expected);
            assert.strictEqual(version!.basic, '1.0.0');
            assert.strictEqual(version!.preRelease, '0.3.7');
        });

        it('Pre-release version (1.0.0-x.7.z.92)', () => {
            const expected = '1.0.0-x.7.z.92';
            const {version} = parse(`name@${expected}`);

            assert.strictEqual(version!.original, expected);
            assert.strictEqual(version!.basic, '1.0.0');
            assert.strictEqual(version!.preRelease, 'x.7.z.92');
        });

        it('Pre-release version (1.0.0-x-y-z.-)', () => {
            const expected = '1.0.0-x-y-z.-';
            const {version} = parse(`name@${expected}`);

            assert.strictEqual(version!.original, expected);
            assert.strictEqual(version!.basic, '1.0.0');
            assert.strictEqual(version!.preRelease, 'x-y-z.-');
        });

        it('Pre-release version (@scope) (1.0.0-alpha)', () => {
            const expected = '1.0.0-alpha';
            const {version} = parse(`@scope/name@${expected}`);

            assert.strictEqual(version!.original, expected);
            assert.strictEqual(version!.basic, '1.0.0');
            assert.strictEqual(version!.preRelease, 'alpha');
        });

        it('Build metadata (1.0.0-alpha+001)', () => {
            const expected = '1.0.0-alpha+001';
            const {version} = parse(`name@${expected}`);

            assert.strictEqual(version!.original, expected);
            assert.strictEqual(version!.basic, '1.0.0');
            assert.strictEqual(version!.preRelease, 'alpha');
            assert.strictEqual(version!.buildMetadata, '001');
        });

        it('Build metadata (1.0.0+20130313144700)', () => {
            const expected = '1.0.0+20130313144700';
            const {version} = parse(`name@${expected}`);

            assert.strictEqual(version!.original, expected);
            assert.strictEqual(version!.basic, '1.0.0');
            assert.strictEqual(version!.buildMetadata, '20130313144700');
        });

        it('Build metadata (1.0.0-beta+exp.sha.5114f85)', () => {
            const expected = '1.0.0-beta+exp.sha.5114f85';
            const {version} = parse(`name@${expected}`);

            assert.strictEqual(version!.original, expected);
            assert.strictEqual(version!.basic, '1.0.0');
            assert.strictEqual(version!.preRelease, 'beta');
            assert.strictEqual(version!.buildMetadata, 'exp.sha.5114f85');
        });

        it('Build metadata (1.0.0+21AF26D3--117B344092BD)', () => {
            const expected = '1.0.0+21AF26D3--117B344092BD';
            const {version} = parse(`name@${expected}`);

            assert.strictEqual(version!.original, expected);
            assert.strictEqual(version!.basic, '1.0.0');
            assert.strictEqual(version!.buildMetadata, '21AF26D3--117B344092BD');
        });

        it('Build metadata (@scope) (1.0.0+21AF26D3--117B344092BD)', () => {
            const expected = '1.0.0+21AF26D3--117B344092BD';
            const {version} = parse(`@scope/name@${expected}`);

            assert.strictEqual(version!.original, expected);
            assert.strictEqual(version!.basic, '1.0.0');
            assert.strictEqual(version!.buildMetadata, '21AF26D3--117B344092BD');
        });

        it('Build metadata (@scope) (comparator) (1.0.0+21AF26D3--117B344092BD)', () => {
            const expected = '^1.0.0+21AF26D3--117B344092BD';
            const {version} = parse(`@scope/name@${expected}`);

            assert.strictEqual(version!.original, expected);
            assert.strictEqual(version!.basic, '1.0.0');
            assert.strictEqual(version!.buildMetadata, '21AF26D3--117B344092BD');
            assert.strictEqual(version!.comparator, '^');
        });
    });

    it('Mixed semver and npm (1.x-alpha)', () => {
        const actual = () => parse('name@1.x-alpha');

        assert.throws(actual, {
            message: 'Expected "." or end of input but "-" found.'
        });
    });
});
