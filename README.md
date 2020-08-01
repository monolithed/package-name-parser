# @pobedit/package-name-parser

[![Build Status](https://travis-ci.org/pobedit-instruments/package-name-parser.png)](https://travis-ci.org/pobedit-instruments/package-name-parser)
[![License](https://img.shields.io/badge/license-MIT-brightgreen.svg)](LICENSE.txt)


A [package name](https://docs.npmjs.com/files/package.json?#name) parser.

## Installation

Install with npm or Yarn:

**npm**:

```
npm install @pobedit/package-name-parser --save
```

**Yarn**:

```
yarn add @pobedit/package-name
```

## Basic usage

```typescript
import {parse} from '@pobedit/package-name-parser';

try {
    const {scope, name, version} = parse('@foo/bar@0.0.1');

    console.log(scope, name, version);
    /*
    {
        scope: 'foo',
        name: 'bar',
        version: '0.0.1'
    }
    */
}
catch ({message}) {
    console.error(message);
}
```

`scope` and `version` are optional:

```typescript
parse('foo');
parse('@foo/bar');
parse('@foo/bar@0.0.1');
```

## Contributing
   
Feel free to submit a pull request if you find any bugs. 
Please make sure all commits are properly documented.

## Tests

```
npm test
```

## Publishing

```
npm publish --access public --verbose
```

## License

MIT
