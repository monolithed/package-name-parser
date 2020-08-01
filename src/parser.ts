import builtins = require('builtin-modules');
const grammar = require('./grammar');

import {blacklist} from './blacklist';

type Package = {
    scope?: string;
    name: string;
    version?: string;
}

function parse(input: string): Package | never {
    if (!input) {
        throw Error('Name cannot be an empty value');
    }

    const {scope, name, version}: Package = grammar.parse(input);

    if (!scope) {
        if (blacklist.includes(name)) {
            throw Error('Name cannot contain blacklisted names');
        }

        if (builtins.includes(name)) {
            throw Error('Name cannot contain builtin names');
        }
    }

    return {scope, name, version};
}

export {parse};
