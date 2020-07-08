import * as assert from 'assert';
import {validatePackageName, Status} from '..';

describe('Basic validation', () => {
    it('Typical name', () => {
        const {status} = validatePackageName('package');

        assert.equal(status, Status.OK);
    });

    it('Typical name (scope)', () => {
        const {status} = validatePackageName('@scope/package');

        assert.equal(status, Status.OK);
    });

    it('Empty value', () => {
        const {status} = validatePackageName('');

        assert.equal(status, Status.ERROR);
    });

    it('Empty value (scope)', () => {
        const {status} = validatePackageName('@scope/');

        assert.equal(status, Status.ERROR);
    });

    it('One character', () => {
        const {status} = validatePackageName('p');

        assert.equal(status, Status.OK);
    });

    it('One character (scope)', () => {
        const {status} = validatePackageName('@scope/p');

        assert.equal(status, Status.OK);
    });

    it('Leading space', () => {
        const {status} = validatePackageName(' package');

        assert.equal(status, Status.ERROR);
    });

    it('Leading space (scope)', () => {
        const {status} = validatePackageName(' @scope/package');

        assert.equal(status, Status.ERROR);
    });

    it('Trailing space', () => {
        const {status} = validatePackageName('package ');

        assert.equal(status, Status.ERROR);
    });

    it('Trailing space (scope)', () => {
        const {status} = validatePackageName('@scope/package ');

        assert.equal(status, Status.ERROR);
    });

    it('Mixed case', () => {
        const {status} = validatePackageName('Package ');

        assert.equal(status, Status.ERROR);
    });

    it('Mixed case (scope)', () => {
        const {status} = validatePackageName('@scope/Package ');

        assert.equal(status, Status.ERROR);
    });

    it('Long package name', () => {
        const {status} = validatePackageName('ifyouwanttogetthesumoftwonumberswherethosetwonumbersarechosenbyfindingthelargestoftwooutofthreenumbersandsquaringthemwhichismultiplyingthembyitselfthenyoushouldinputthreenumbersintothisfunctionanditwilldothatforyou- ');

        assert.equal(status, Status.ERROR);
    });
});

describe('Special characters', () => {
    it('Unexpected special characters', () => {
        const {status} = validatePackageName('package!');

        assert.equal(status, Status.ERROR);
    });

    it('Expected special characters', () => {
        const {status} = validatePackageName('some-_.package');

        assert.equal(status, Status.OK);
    });

    it('Expected special characters (scope)', () => {
        const {status} = validatePackageName('@scope/some-_.package');

        assert.equal(status, Status.OK);
    });

    it('Leading special characters', () => {
        const {status} = validatePackageName('.package');

        assert.equal(status, Status.ERROR);
    });

    it('Leading special characters (scope)', () => {
        const {status} = validatePackageName('@scope/.package');

        assert.equal(status, Status.ERROR);
    });

    it('One special characters', () => {
        const {status} = validatePackageName('.');

        assert.equal(status, Status.ERROR);
    });

    it('One special characters (scope)', () => {
        const {status} = validatePackageName('@scope/.');

        assert.equal(status, Status.ERROR);
    });

    it('Leading scope special characters', () => {
        const {status} = validatePackageName('@./.');

        assert.equal(status, Status.ERROR);
    });

    it('Trailing special characters', () => {
        const {status} = validatePackageName('package.');

        assert.equal(status, Status.OK);
    });
});

describe('Numeric characters', () => {
    it('Numeric name only', () => {
        const {status} = validatePackageName('123');

        assert.equal(status, Status.OK);
    });

    it('Numeric name only (scope)', () => {
        const {status} = validatePackageName('@scope/123');

        assert.equal(status, Status.OK);
    });

    it('Numeric scope name', () => {
        const {status} = validatePackageName('@123/123');

        assert.equal(status, Status.OK);
    });

    it('Leading numeric', () => {
        const {status} = validatePackageName('123package');

        assert.equal(status, Status.OK);
    });

    it('Leading numeric (scope)', () => {
        const {status} = validatePackageName('@scope/123package');

        assert.equal(status, Status.OK);
    });

    it('Trailing numeric', () => {
        const {status} = validatePackageName('package123');

        assert.equal(status, Status.OK);
    });

    it('Trailing numeric (scope)', () => {
        const {status} = validatePackageName('@scope/package123');

        assert.equal(status, Status.OK);
    });
});

describe('Blacklisted characters', () => {
    it('node_modules', () => {
        const {status} = validatePackageName('node_modules');

        assert.equal(status, Status.ERROR);
    });

    it('node_modules (scope)', () => {
        const {status} = validatePackageName('@scope/node_modules');

        assert.equal(status, Status.OK);
    });

    it('favicon.ico', () => {
        const {status} = validatePackageName('favicon.ico');

        assert.equal(status, Status.ERROR);
    });

    it('favicon.ico (scope)', () => {
        const {status} = validatePackageName('@scope/favicon.ico');

        assert.equal(status, Status.OK);
    });
});

describe('Builtin characters', () => {
    it('http', () => {
        const {status} = validatePackageName('http');

        assert.equal(status, Status.ERROR);
    });

    it('http (scope)', () => {
        const {status} = validatePackageName('@scope/http');

        assert.equal(status, Status.OK);
    });
});
