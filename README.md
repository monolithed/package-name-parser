# @pobedit/validate-package-name

[![Build Status](https://travis-ci.org/pobedit-instruments/validate-package-name.png)](https://travis-ci.org/pobedit-instruments/validate-package-name)
[![License](https://img.shields.io/badge/license-MIT-brightgreen.svg)](LICENSE.txt)


A [package name](https://docs.npmjs.com/files/package.json?#name) validator.

## Installation

Install with npm or Yarn:

**npm**:

```
npm install @pobedit/validate-package-name --save
```

**Yarn**:

```
yarn add @pobedit/validate-package-name
```

## Basic usage

```typescript
import {validatePackageName, Status} from '@pobedit/validate-package-name';


const {status, message} = validatePackageName('@scope/package');

assert.equal(status, Status.OK); // true
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
