import * as assert from 'assert';
import {parse} from '..';

describe('Numeric characters', () => {
    it('Numeric name only', () => {
        const expected = '123';
        const {scope, name} = parse(expected);

        assert.strictEqual(name, expected);
    });

    it('Numeric name only (@scope)', () => {
        const expected = '123';
        const {scope, name} = parse(`@scope/${expected}`);

        assert.strictEqual(name, expected);
    });

    it('Numeric scope name', () => {
        const expected = '123';
        const {scope, name} = parse(`@123/${expected}`);

        assert.strictEqual(name, expected);
    });

    it('Leading numeric', () => {
        const expected = '123package';
        const {scope, name} = parse(expected);

        assert.strictEqual(name, expected);
    });

    it('Leading numeric (@scope)', () => {
        const expected = '123package';
        const {scope, name} = parse(`@scope/${expected}`);

        assert.strictEqual(name, expected);
    });

    it('Trailing numeric', () => {
        const expected = 'package123';
        const {scope, name} = parse(expected);

        assert.strictEqual(name, expected);
    });

    it('Trailing numeric (@scope)', () => {
        const expected = 'package123';
        const {scope, name} = parse(`@scope/${expected}`);

        assert.strictEqual(name, expected);
    });
});
