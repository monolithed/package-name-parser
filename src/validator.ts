import builtins = require('builtin-modules');
const grammar = require('./grammar');

import {ErrorMessage} from './messages';
import {Status} from './status';
import {blacklist} from './blacklist';

type Response = {
    scope?: string;
    name: string;
}

const getErrorMessage = (input: string): string | void => {
    if (!input) {
        return ErrorMessage.EMPTY;
    }

    try {
        const {scope, name}: Response = grammar.parse(input);

        if (scope) {
            return void 0;
        }

        if (blacklist.includes(name)) {
            return ErrorMessage.BLACKLIST;
        }

        if (builtins.includes(name)) {
            return ErrorMessage.BUILTINS;
        }
    }
    catch ({message}) {
        return message;
    }
};

const validatePackageName = (input: string) => {
    const message = getErrorMessage(input);
    let status = Status.OK;

    if (message) {
        status = Status.ERROR;
    }

    return {status, message};
};

export {validatePackageName, Status, ErrorMessage};
