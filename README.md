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
    const {scope, name} = parse('@foo/bar');

    console.log(scope, name) // -> {scope: 'foo', name: 'bar'}
}
catch ({message}) {
    console.error(message);
}
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
