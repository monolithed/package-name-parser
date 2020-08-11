# @pobedit/package-name-parser

[![Build Status](https://travis-ci.org/pobedit-instruments/package-name-parser.png)](https://travis-ci.org/pobedit-instruments/package-name-parser)
[![License](https://img.shields.io/badge/license-MIT-brightgreen.svg)](LICENSE.txt)


A [package name](https://docs.npmjs.com/files/package.json?#name) parser and [the semantic versioner](https://docs.npmjs.com/misc/semver) for npm packages.

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

## Synopsis

```typescript
type Package = {
    scope?: string;
    name: string;
    version?: {
        basic: string;
        comparator?: string;
        preRelease?: string;
        buildMetadata?: string;
        original: string;
    }
};
```

parse(input: string): Package | never;

## Basic usage

```typescript
import {parse} from '@pobedit/package-name-parser';

try {
    const {scope, name, version} = parse('@foo/bar@^1.0.0-alpha+0.0.1f');

    console.log(scope, name, version);
    /*
    {
        scope: 'foo',
        name: 'bar',
        version: {
            basic: '1.0.0',
            comparator: '^',
            preRelease: 'alpha',
            buildMetadata: '0.0.1f',
            original: '^1.0.0-alpha+0.0.1f'
        }
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
parse('@foo/bar@0.0.1-alpha');
parse('@foo/bar@0.0.1+beta');
parse('@foo/bar@0.0.1-alpha+beta');
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

## Useful links

[npm semver calculator](https://semver.npmjs.com)
[The semantic versioner for npm](https://docs.npmjs.com/misc/semver)
[Scoped packages](https://docs.npmjs.com/misc/scope)
[Specifics of npm's package.json handling](https://docs.npmjs.com/files/package.json)
[Semantic Versioning 2.0.0](https://semver.org)

