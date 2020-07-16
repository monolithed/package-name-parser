import * as assert from 'assert';
import {
    validatePackageName,
    Status,
    ErrorMessage
} from '..';

describe('Basic validation', () => {
    it('Typical name', () => {
        const {status} = validatePackageName('package');

        assert.strictEqual(status, Status.OK);
    });

    it('Typical name (scope)', () => {
        const {status} = validatePackageName('@scope/package');

        assert.strictEqual(status, Status.OK);
    });

    it('Empty value', () => {
        const {status, message} = validatePackageName('');

        assert.strictEqual(status, Status.ERROR);
        assert.strictEqual(message, ErrorMessage.EMPTY);
    });

    it('Empty value (scope)', () => {
        const {status, message} = validatePackageName('@scope/');

        assert.strictEqual(status, Status.ERROR);
        assert.strictEqual(message, 'Expected [a-z0-9_.\\-] but end of input found.');
    });

    it('One character', () => {
        const {status} = validatePackageName('p');

        assert.strictEqual(status, Status.OK);
    });

    it('One character (scope)', () => {
        const {status} = validatePackageName('@scope/p');

        assert.strictEqual(status, Status.OK);
    });

    it('Leading space', () => {
        const {status, message} = validatePackageName(' package');

        assert.strictEqual(status, Status.ERROR);
        assert.strictEqual(message, 'Expected "@" or [a-z0-9_.\\-] but " " found.');
    });

    it('Leading space (scope)', () => {
        const {status, message} = validatePackageName(' @scope/package');

        assert.strictEqual(status, Status.ERROR);
        assert.strictEqual(message, 'Expected "@" or [a-z0-9_.\\-] but " " found.');
    });

    it('Trailing space', () => {
        const {status} = validatePackageName('package ');

        assert.strictEqual(status, Status.ERROR);
    });

    it('Trailing space (scope)', () => {
        const {status, message} = validatePackageName('@scope/package ');

        assert.strictEqual(status, Status.ERROR);
        assert.strictEqual(message, 'Expected [a-z0-9_.\\-] or end of input but " " found.');
    });

    it('Mixed case', () => {
        const {status, message} = validatePackageName('Package ');

        assert.strictEqual(status, Status.ERROR);
        assert.strictEqual(message, 'Expected "@" or [a-z0-9_.\\-] but "P" found.');
    });

    it('Mixed case (scope)', () => {
        const {status, message} = validatePackageName('@scope/Package ');

        assert.strictEqual(status, Status.ERROR);
        assert.strictEqual(message, 'Expected [a-z0-9_.\\-] but "P" found.');
    });

    it('Long package name', () => {
        const {status, message} = validatePackageName('ifyouwanttogetthesumoftwonumberswherethosetwonumbersarechosenbyfindingthelargestoftwooutofthreenumbersandsquaringthemwhichismultiplyingthembyitselfthenyoushouldinputthreenumbersintothisfunctionanditwilldothatforyou- ');

        assert.strictEqual(status, Status.ERROR);
        assert.strictEqual(message, 'The name must be less than or equal to 214 characters');
    });
});

describe('Special characters', () => {
    it('Unexpected special characters', () => {
        const {status, message} = validatePackageName('package!');

        assert.strictEqual(status, Status.ERROR);
        assert.strictEqual(message, 'Expected [a-z0-9_.\\-] or end of input but "!" found.');
    });

    it('Expected special characters', () => {
        const {status} = validatePackageName('some-_.package');

        assert.strictEqual(status, Status.OK);
    });

    it('Expected special characters (scope)', () => {
        const {status} = validatePackageName('@scope/some-_.package');

        assert.strictEqual(status, Status.OK);
    });

    it('Leading special characters', () => {
        const {status, message} = validatePackageName('.package');

        assert.strictEqual(status, Status.ERROR);
        assert.strictEqual(message, 'Unexpected character "." at position 1.');
    });

    it('Leading special characters (scope)', () => {
        const {status, message} = validatePackageName('@scope/.package');

        assert.strictEqual(status, Status.ERROR);
        assert.strictEqual(message, 'Unexpected character "." at position 8.');
    });

    it('One special characters', () => {
        const {status, message} = validatePackageName('.');

        assert.strictEqual(status, Status.ERROR);
        assert.strictEqual(message, 'Unexpected character "." at position 1.');
    });

    it('One special characters (scope)', () => {
        const {status, message} = validatePackageName('@scope/.');

        assert.strictEqual(status, Status.ERROR);
        assert.strictEqual(message, 'Unexpected character "." at position 8.');
    });

    it('Leading scope special characters', () => {
        const {status, message} = validatePackageName('@./.');

        assert.strictEqual(status, Status.ERROR);
        assert.strictEqual(message, 'Unexpected character "." at position 2.');
    });

    it('Trailing special characters', () => {
        const {status} = validatePackageName('package.');

        assert.strictEqual(status, Status.OK);
    });
});

describe('Numeric characters', () => {
    it('Numeric name only', () => {
        const {status} = validatePackageName('123');

        assert.strictEqual(status, Status.OK);
    });

    it('Numeric name only (scope)', () => {
        const {status} = validatePackageName('@scope/123');

        assert.strictEqual(status, Status.OK);
    });

    it('Numeric scope name', () => {
        const {status} = validatePackageName('@123/123');

        assert.strictEqual(status, Status.OK);
    });

    it('Leading numeric', () => {
        const {status} = validatePackageName('123package');

        assert.strictEqual(status, Status.OK);
    });

    it('Leading numeric (scope)', () => {
        const {status} = validatePackageName('@scope/123package');

        assert.strictEqual(status, Status.OK);
    });

    it('Trailing numeric', () => {
        const {status} = validatePackageName('package123');

        assert.strictEqual(status, Status.OK);
    });

    it('Trailing numeric (scope)', () => {
        const {status} = validatePackageName('@scope/package123');

        assert.strictEqual(status, Status.OK);
    });
});

describe('Blacklisted characters', () => {
    it('node_modules', () => {
        const {status, message} = validatePackageName('node_modules');

        assert.strictEqual(status, Status.ERROR);
        assert.strictEqual(message, ErrorMessage.BLACKLIST);
    });

    it('node_modules (scope)', () => {
        const {status} = validatePackageName('@scope/node_modules');

        assert.strictEqual(status, Status.OK);
    });

    it('favicon.ico', () => {
        const {status, message} = validatePackageName('favicon.ico');

        assert.strictEqual(status, Status.ERROR);
        assert.strictEqual(message, ErrorMessage.BLACKLIST);
    });

    it('favicon.ico (scope)', () => {
        const {status} = validatePackageName('@scope/favicon.ico');

        assert.strictEqual(status, Status.OK);
    });
});

describe('Builtin characters', () => {
    it('http', () => {
        const {status, message} = validatePackageName('http');

        assert.strictEqual(status, Status.ERROR);
        assert.strictEqual(message, ErrorMessage.BUILTINS);
    });

    it('http (scope)', () => {
        const {status} = validatePackageName('@scope/http');

        assert.strictEqual(status, Status.OK);
    });
});
