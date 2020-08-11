import * as assert from 'assert';
import {parse} from '..';

describe('Special characters', () => {
    it('Unexpected special characters', () => {
        const actual = () => parse('package!');

        assert.throws(actual, {
            message: 'Expected "@", [a-z0-9_.\\-], or end of input but "!" found.'
        });
    });

    it('Expected special characters', () => {
        const expected = 'some-_.package';
        const {scope, name} = parse(expected);

        assert.strictEqual(name, expected);
    });

    it('Expected special characters (@scope)', () => {
        const expected = 'some-_.package';
        const {scope, name} = parse(`@scope/${expected}`);

        assert.strictEqual(name, expected);
    });

    it('Leading special characters', () => {
        const actual = () => parse('.package!');

        assert.throws(actual, {
            message: 'Unexpected character "." at position 1.'
        });
    });

    it('Leading special characters (@scope)', () => {
        const actual = () => parse('@scope/.package');

        assert.throws(actual, {
            message: 'Unexpected character "." at position 8.'
        });
    });

    it('One special characters', () => {
        const actual = () => parse('.');

        assert.throws(actual, {
            message: 'Unexpected character "." at position 1.'
        });
    });

    it('One special characters (@scope)', () => {
        const actual = () => parse('@scope/.');

        assert.throws(actual, {
            message: 'Unexpected character "." at position 8.'
        });
    });

    it('Leading scope special characters', () => {
        const actual = () => parse('@./.');

        assert.throws(actual, {
            message: 'Unexpected character "." at position 2.'
        });
    });

    it('Trailing special characters', () => {
        const expected = 'package.';
        const {scope, name} = parse(expected);

        assert.strictEqual(name, expected);
    });
});
