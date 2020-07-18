import * as assert from 'assert';
import {parse} from '..';

describe('Basic validation', () => {
    it('Typical name', () => {
        const expected = 'name';
        const {name} = parse(expected);

        assert.strictEqual(name, expected);
    });

    it('Typical name (scope)', () => {
        const {scope, name} = parse('@scope/name');

        assert.deepStrictEqual({scope, name}, {
            scope: 'scope',
            name: 'name'
        });
    });

    it('Empty value', () => {
        const actual = () => parse('');

        assert.throws(actual, {
            message: 'Name cannot be an empty value'
        });
    });

    it('Empty value (scope)', () => {
        const actual = () => parse('@scope/');

        assert.throws(actual, {
            message: 'Expected [a-z0-9_.\\-] but end of input found.'
        });
    });

    it('One character', () => {
        const expected = 'p';
        const {scope, name} = parse(expected);

        assert.strictEqual(name, expected);
    });

    it('One character (scope)', () => {
        const {scope, name} = parse('@scope/p');

        assert.strictEqual(name, 'p');
    });

    it('Leading space', () => {
        const actual = () => parse(' package');

        assert.throws(actual, {
            message: 'Expected "@" or [a-z0-9_.\\-] but " " found.'
        });
    });

    it('Leading space (scope)', () => {
        const actual = () => parse(' @scope/package');

        assert.throws(actual, {
            message: 'Expected "@" or [a-z0-9_.\\-] but " " found.'
        });
    });

    it('Trailing space', () => {
        const actual = () => parse('package ');

        assert.throws(actual, {
            message: 'Expected [a-z0-9_.\\-] or end of input but " " found.'
        });
    });

    it('Trailing space (scope)', () => {
        const actual = () => parse('@scope/package ');

        assert.throws(actual, {
            message: 'Expected [a-z0-9_.\\-] or end of input but " " found.'
        });
    });

    it('Mixed case', () => {
        const actual = () => parse('Package ');

        assert.throws(actual, {
            message: 'Expected "@" or [a-z0-9_.\\-] but "P" found.'
        });
    });

    it('Mixed case (scope)', () => {
        const actual = () => parse('@scope/Package ');

        assert.throws(actual, {
            message: 'Expected [a-z0-9_.\\-] but "P" found.'
        });
    });

    it('Long package name', () => {
        const actual = () => parse('ifyouwanttogetthesumoftwonumberswherethosetwonumbersarechosenbyfindingthelargestoftwooutofthreenumbersandsquaringthemwhichismultiplyingthembyitselfthenyoushouldinputthreenumbersintothisfunctionanditwilldothatforyou- ');

        assert.throws(actual, {
            message: 'The name must be less than or equal to 214 characters'
        });
    });
});

describe('Special characters', () => {
    it('Unexpected special characters', () => {
        const actual = () => parse('package!');

        assert.throws(actual, {
            message: 'Expected [a-z0-9_.\\-] or end of input but "!" found.'
        });
    });

    it('Expected special characters', () => {
        const expected = 'some-_.package';
        const {scope, name} = parse(expected);

        assert.strictEqual(name, expected);
    });

    it('Expected special characters (scope)', () => {
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

    it('Leading special characters (scope)', () => {
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

    it('One special characters (scope)', () => {
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

describe('Numeric characters', () => {
    it('Numeric name only', () => {
        const expected = '123';
        const {scope, name} = parse(expected);

        assert.strictEqual(name, expected);
    });

    it('Numeric name only (scope)', () => {
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

    it('Leading numeric (scope)', () => {
        const expected = '123package';
        const {scope, name} = parse(`@scope/${expected}`);

        assert.strictEqual(name, expected);
    });

    it('Trailing numeric', () => {
        const expected = 'package123';
        const {scope, name} = parse(expected);

        assert.strictEqual(name, expected);
    });

    it('Trailing numeric (scope)', () => {
        const expected = 'package123';
        const {scope, name} = parse(`@scope/${expected}`);

        assert.strictEqual(name, expected);
    });
});

describe('Blacklisted characters', () => {
    it('node_modules', () => {
        const actual = () => parse('node_modules');

        assert.throws(actual, {
            message: 'Name cannot contain blacklisted names'
        });
    });

    it('node_modules (scope)', () => {
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

    it('favicon.ico (scope)', () => {
        const expected = 'node_modules';
        const {scope, name} = parse(`@scope/${expected}`);

        assert.strictEqual(name, expected);
    });
});

describe('Builtin characters', () => {
    it('http', () => {
        const actual = () => parse('http');

        assert.throws(actual, {
            message: 'Name cannot contain builtin names'
        });
    });

    it('http (scope)', () => {
        const expected = 'http';
        const {scope, name} = parse(`@scope/${expected}`);

        assert.strictEqual(name, expected);
    });
});
