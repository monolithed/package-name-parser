import * as assert from 'assert';
import {parse} from '..';

describe('Blacklisted characters', () => {
    it('node_modules', () => {
        const actual = () => parse('node_modules');

        assert.throws(actual, {
            message: 'Name cannot contain blacklisted names'
        });
    });

    it('node_modules (@scope)', () => {
        const expected = 'node_modules';
        const {scope, name} = parse(`@scope/${expected}`);

        assert.strictEqual(name, expected);
    });

    it('favicon.ico', () => {
        const actual = () => parse('favicon.ico');

        assert.throws(actual, {
            message: 'Name cannot contain blacklisted names'
        });
    });

    it('favicon.ico (@scope)', () => {
        const expected = 'node_modules';
        const {scope, name} = parse(`@scope/${expected}`);

        assert.strictEqual(name, expected);
    });
});
