# Enhanced JSON Parsing and Stringification for Large Numbers and Collections

[![npm package](https://img.shields.io/npm/v/@qubit-ltd/json.svg)](https://npmjs.com/package/@qubit-ltd/json)
[![License](https://img.shields.io/badge/License-Apache-blue.svg)](https://www.apache.org/licenses/LICENSE-2.0)
[![中文文档](https://img.shields.io/badge/文档-中文版-blue.svg)](README.zh_CN.md)
[![CircleCI](https://dl.circleci.com/status-badge/img/gh/Haixing-Hu/js-json/tree/master.svg?style=shield)](https://dl.circleci.com/status-badge/redirect/gh/Haixing-Hu/js-json/tree/master)
[![Coverage Status](https://coveralls.io/repos/github/Haixing-Hu/js-json/badge.svg?branch=master)](https://coveralls.io/github/Haixing-Hu/js-json?branch=master)

[@qubit-ltd/json]  is a JavaScript library that extends the functionality of the
standard JSON object, providing robust support for working with numbers that 
exceed JavaScript’s safe range. It offers enhanced parsing and stringifying 
capabilities, making it ideal for handling large datasets and complex numerical 
operations while adhering to JSON’s structure.

## Key Features

- `BigInt` Support: When parsing JSON strings, numbers outside JavaScript’s safe 
  integer range are automatically converted to the native `BigInt`, ensuring 
  precision is maintained.
- `LosslessNumber` Handling: For floating-point numbers that cannot be accurately
  represented in JavaScript, this library introduces the `LosslessNumber` object. 
  This lightweight object preserves the full precision of the number as a string,
  allowing flexible conversion to number or `BigInt` for mathematical operations.
- Accurate Stringification: During the stringify process, `BigInt` values are
  serialized as strings without the “n” suffix, maintaining compatibility with 
  the standard JSON format. Similarly, `LosslessNumber` objects are serialized
  using their internal string representation.
- Collection Serialization: JavaScript’s native collections like `Set` and `Map`
  are seamlessly serialized as arrays, allowing for better compatibility with
  JSON structures.

For more details on why JSON parsing can corrupt large numbers and how this 
library helps resolve the issue, refer to 
[Why does JSON.parse corrupt large numbers and how to solve this?].

## Installation

To install the library, use either npm or yarn:
```sh
npm install @qubit-ltd/json
```
or
```sh
yarn add @qubit-ltd/json
```

## Core Functionality

### JSON-like Object

The library provides an object similar to the standard JSON object, but with
enhanced capabilities for handling large integers, floating-point numbers, and 
collections like Set and Map.

```javascript
import Json from '@qubit-ltd/json';

// parse numbers outside the safe range
const str1 = '{"decimal":2.370,"big_int":9123372036854000123,"big_float":2.3e+500}';
const obj1 = Json.parse(text);
console.log(obj1.decimal);   // 2.37
console.log(obj1.big_int);   // 9123372036854000123n
console.log(obj1.big_float); // LosslessNumber { value: '2.3e+500', isLosslessNumber: true }
console.log(String(obj1.big_float)); // '2.3e+500'

// stringify numbers outside the safe range
const json1 = Json.stringify(obj1);
console.log(json1); // '{"decimal":2.37,"big_int":9123372036854000123,"big_float":"2.3e+500"}'

// stringify collections
const obj2 = { 
  x: new Set([{ a: 1 }, { b: 2 }, { c: 3 }]),
  y: new Map([[1, { a: 2 }], [2, { b: 4 }]]),
};
const json2 = Json.stringify(obj);
console.log(json2); // '{"x":[{"a":1},{"b":2},{"c":3}],"y":[[1,{"a":2}],[2,{"b":4}]]}'

const json3 = Json.stringify(obj, null, 2);
console.log(json3); // 
```

### LosslessNumber Class

The LosslessNumber class is used to handle floating-point numbers with full
precision, avoiding truncation or rounding issues.

```javascript
import Json from '@qubit-ltd/json';
const parsed = Json.parse('{"float": 1.234567891234567891234}');
console.log(parsed.float);  // LosslessNumber { value: '1.234567891234567891234' }

// Convert LosslessNumber to standard number
console.log(parsed.float.valueOf());  // 1.2345678912345679 (standard JS number)
```

### Utility Functions

This library provides a set of utility functions to aid in the handling of large 
numbers and ensure safe conversions.

#### `isBigInt(value)`

Checks if a string represents a `BigInt` (i.e., ends with an “n” suffix).

```javascript
import { isBigInt } from '@qubit-ltd/json';

console.log(isBigInt('12345n'));  // true
console.log(isBigInt('12345'));   // false
```

#### `isInteger(value)`

Checks if a string represents an integer.

```javascript
import { isInteger } from '@qubit-ltd/json';

console.log(isInteger('12345'));  // true
console.log(isInteger('123.45')); // false
```

#### `isNumber(value)`

Checks if a string represents a number.

```javascript
import { isNumber } from '@qubit-ltd/json';

console.log(isNumber('12345'));     // true
console.log(isNumber('-123.45'));   // true
console.log(isNumber('1.23e-11'));  // true
console.log(isNumber('abc'));       // false
```

#### `isSafeNumber(value, options)`

Checks if a string represents a number within JavaScript’s safe range.

```javascript
import { isSafeNumber } from '@qubit-ltd/json';

console.log(isSafeNumber('12345'));     // true
console.log(isSafeNumber('12345678901234567890')); // false
console.log(isSafeNumber('123.45678901234567890')); // false
console.log(isSafeNumber('123.45678901234567890', { approx: true, requiredDigits: 16 })); // true
``` 

#### `getUnsafeReason(value)`

Explains why a number represented by a string is unsafe, returning one of the 
following reasons:

- `'overflow'`
- `'underflow'`
- `'truncate_integer'`
- `'truncate_float'`
- `'none'`: when the value is safe

```javascript
import { getUnsafeReason } from '@qubit-ltd/json';

console.log(getUnsafeReason('12345'));     // Output: 'none'
console.log(getUnsafeReason('12345678901234567890')); // Output: 'truncate_integer'
console.log(getUnsafeReason('-12345678901234567890.123'));  //  Output: 'truncate_float'
console.log(getUnsafeReason('-1e+1000'));   // Output: 'overflow'
console.log(getUnsafeReason('1e-324'));     // Output: 'underflow'
```

#### `toSafeNumberOrThrow(value, options)`

Converts a string into a number if it is safe to do so. Throws an error if the 
number is unsafe, explaining the reason.

```javascript
import { toSafeNumberOrThrow } from '@qubit-ltd/json';

try {
  console.log(toSafeNumberOrThrow('-12345678901234567890'));
} catch (e) {
  console.error(e.message);  // Output: 'Cannot safely convert to number: the value '-12345678901234567890' would truncate integer and become -12345678901234567000'
}

console.log(toSafeNumberOrThrow('9007199254740991'));  // Output: 9007199254740991
```

## <span id="contributing">Contributing</span>

If you find any issues or have suggestions for improvements, please feel free
to open an issue or submit a pull request to the [GitHub repository].

## <span id="license">License</span>

[@qubit-ltd/json] is distributed under the Apache 2.0 license.
See the [LICENSE](LICENSE) file for more details.

## <span id="acknowledgements">Acknowledgements</span>

This project builds upon and incorporates code from several open-source libraries
that have made significant contributions to handling large numbers and custom 
parsing in JSON. We would like to acknowledge and thank the authors of the
following projects:

- [json-bigint]: Provides support for parsing and stringifying JSON with BigInt, 
  allowing for precise handling of large numbers.
- [lossless-json]: A library that offers lossless handling of numbers in JSON, 
  ensuring full precision when dealing with floating-point values.
- [json-custom-numbers]: Allows for custom handling of numbers in JSON parsing
  and stringifying, offering flexibility in numerical representation.

We are grateful for the work of these contributors, which has been instrumental 
in shaping the functionality of this library.

[@qubit-ltd/json]: https://npmjs.com/package/@qubit-ltd/json
[GitHub repository]: https://github.com/Haixing-Hu/js-json
[Why does JSON.parse corrupt large numbers and how to solve this?]: https://jsoneditoronline.org/indepth/parse/why-does-json-parse-corrupt-large-numbers/
[json-bigint]: https://github.com/sidorares/json-bigint
[lossless-json]: https://github.com/josdejong/lossless-json
[json-custom-numbers]: https://github.com/jawj/json-custom-numbers
