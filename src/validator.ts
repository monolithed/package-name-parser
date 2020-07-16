import builtins = require('builtin-modules');
const grammar = require('./grammar');

import {ErrorMessage} from './errors';
import {blacklist} from './blacklist';

type Package = {
    scope?: string;
    name: string;
}

type Result = {
    status: keyof typeof Status;
    message?: string;
}

enum Status {
    OK = 'OK',
    ERROR = 'ERROR'
}

const getErrorMessage = (input: string): string | undefined => {
    if (!input) {
        return ErrorMessage.EMPTY;
    }

    try {
        const {scope, name}: Package = grammar.parse(input);

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

const validatePackageName = (input: string): Result => {
    const message = getErrorMessage(input);
    let status = Status.OK;

    if (message) {
        status = Status.ERROR;
    }

    return {status, message};
};

export {validatePackageName, Status, ErrorMessage};
