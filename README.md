# Enhanced JSON Parsing and Stringification for Large Numbers and Collections

[![npm package](https://img.shields.io/npm/v/@haixing_hu/json.svg)](https://npmjs.com/package/@haixing_hu/json)
[![License](https://img.shields.io/badge/License-Apache-blue.svg)](https://www.apache.org/licenses/LICENSE-2.0)
[![中文文档](https://img.shields.io/badge/文档-中文版-blue.svg)](README.zh_CN.md)
[![CircleCI](https://dl.circleci.com/status-badge/img/gh/Haixing-Hu/js-json/tree/master.svg?style=shield)](https://dl.circleci.com/status-badge/redirect/gh/Haixing-Hu/js-json/tree/master)
[![Coverage Status](https://coveralls.io/repos/github/Haixing-Hu/js-json/badge.svg?branch=master)](https://coveralls.io/github/Haixing-Hu/js-json?branch=master)

[@haixing_hu/json]  is a JavaScript library that extends the functionality of the
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
npm install @haixing_hu/json
```
or
```sh
yarn add @haixing_hu/json
```

## <span id="contributing">Contributing</span>

If you find any issues or have suggestions for improvements, please feel free
to open an issue or submit a pull request to the [GitHub repository].

## <span id="license">License</span>

[@haixing_hu/json] is distributed under the Apache 2.0 license.
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

[@haixing_hu/json]: https://npmjs.com/package/@haixing_hu/json
[GitHub repository]: https://github.com/Haixing-Hu/js-json
[Why does JSON.parse corrupt large numbers and how to solve this?]: https://jsoneditoronline.org/indepth/parse/why-does-json-parse-corrupt-large-numbers/
[json-bigint]: https://github.com/sidorares/json-bigint
[lossless-json]: https://github.com/josdejong/lossless-json
[json-custom-numbers]: https://github.com/jawj/json-custom-numbers
