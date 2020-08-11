import * as assert from 'assert';
import {parse} from '..';

describe('Builtin characters', () => {
    it('http', () => {
        const actual = () => parse('http');

        assert.throws(actual, {
            message: 'Name cannot contain builtin names'
        });
    });

    it('http (@scope)', () => {
        const expected = 'http';
        const {scope, name} = parse(`@scope/${expected}`);

        assert.strictEqual(name, expected);
    });
});
