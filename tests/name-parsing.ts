import * as assert from 'assert';
import {parse} from '..';

describe('Basic validation', () => {
    it('Typical name', () => {
        const expected = 'name';
        const {name} = parse(expected);

        assert.strictEqual(name, expected);
    });

    it('Typical name (@scope)', () => {
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

    it('Empty value (@scope)', () => {
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

    it('One character (@scope)', () => {
        const {scope, name} = parse('@scope/p');

        assert.strictEqual(name, 'p');
    });

    it('Leading space', () => {
        const actual = () => parse(' package');

        assert.throws(actual, {
            message: 'Expected "@" or [a-z0-9_.\\-] but " " found.'
        });
    });

    it('Leading space (@scope)', () => {
        const actual = () => parse(' @scope/package');

        assert.throws(actual, {
            message: 'Expected "@" or [a-z0-9_.\\-] but " " found.'
        });
    });

    it('Trailing space', () => {
        const actual = () => parse('package ');

        assert.throws(actual, {
            message: 'Expected "@", [a-z0-9_.\\-], or end of input but " " found.'
        });
    });

    it('Trailing space (@scope)', () => {
        const actual = () => parse('@scope/package ');

        assert.throws(actual, {
            message: 'Expected "@", [a-z0-9_.\\-], or end of input but " " found.'
        });
    });

    it('Mixed case', () => {
        const actual = () => parse('Package ');

        assert.throws(actual, {
            message: 'Expected "@" or [a-z0-9_.\\-] but "P" found.'
        });
    });

    it('Mixed case (@scope)', () => {
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
