# 增强的 JSON 解析器，支持大整数和集合

[![npm package](https://img.shields.io/npm/v/@qubit-ltd/json.svg)](https://npmjs.com/package/@qubit-ltd/json)
[![License](https://img.shields.io/badge/License-Apache-blue.svg)](https://www.apache.org/licenses/LICENSE-2.0)
[![English Document](https://img.shields.io/badge/Document-English-blue.svg)](README.md)
[![CircleCI](https://dl.circleci.com/status-badge/img/gh/Haixing-Hu/js-json/tree/master.svg?style=shield)](https://dl.circleci.com/status-badge/redirect/gh/Haixing-Hu/js-json/tree/master)
[![Coverage Status](https://coveralls.io/repos/github/Haixing-Hu/js-json/badge.svg?branch=master)](https://coveralls.io/github/Haixing-Hu/js-json?branch=master)

[@qubit-ltd/json] 是一个 JavaScript 库，它扩展了标准 JSON 对象的功能，提供了对超出 JavaScript 
安全范围的大数字的强大支持。该库增强了解析和字符串化能力，使其非常适合处理大型数据集和复杂的数值操作，
同时保持 JSON 的结构。

## 主要功能

- **`BigInt` 支持**：在解析 JSON 字符串时，超出 JavaScript 安全整数范围的数字会自动转换为原生 `BigInt`，
  确保精度不丢失。
- **`LosslessNumber` 处理**：对于无法在 JavaScript 中准确表示的浮点数，该库引入了 `LosslessNumber` 对象。
  这个轻量级对象以字符串形式保存完整的数值精度，允许灵活地转换为数字或 `BigInt` 进行数学运算。
- **精确的字符串化**：在字符串化过程中，`BigInt` 值会作为字符串序列化，不带 “n” 后缀，以保持与标准 JSON 格式的兼容性。
  同样，`LosslessNumber` 对象使用其内部字符串表示进行序列化。
- **集合序列化**：JavaScript 原生的集合类型如 `Set` 和 `Map` 会无缝地序列化为数组，以便更好地与 JSON 结构兼容。

有关为什么 JSON 解析可能会破坏大数字以及该库如何帮助解决该问题的更多详细信息，请参阅
[Why does JSON.parse corrupt large numbers and how to solve this?]。

## 安装

使用 npm 或 yarn 安装该库：
```sh
npm install @qubit-ltd/json
```
或
```sh
yarn add @qubit-ltd/json
```

## 核心功能

### 类似 JSON 的对象

该库提供了一个类似于标准 JSON 对象的对象，但具有增强的功能，用于处理大整数、浮点数以及集合类型如 Set 和 Map。

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

### LosslessNumber 类

`LosslessNumber` 类用于处理具有完整精度的浮点数，避免截断或舍入问题。

```javascript
import Json from '@qubit-ltd/json';
const parsed = Json.parse('{"float": 1.234567891234567891234}');
console.log(parsed.float);  // LosslessNumber { value: '1.234567891234567891234' }

// Convert LosslessNumber to standard number
console.log(parsed.float.valueOf());  // 1.2345678912345679 (standard JS number)
```

### 实用函数

该库提供了一组实用函数，用于处理大数字并确保安全转换。

#### `isBigInt(value)`

检查一个字符串是否表示 `BigInt`（即是否以 "n" 结尾）。

```javascript
import { isBigInt } from '@qubit-ltd/json';

console.log(isBigInt('12345n'));  // true
console.log(isBigInt('12345'));   // false
```

#### `isInteger(value)`

检查一个字符串是否表示整数。

```javascript
import { isInteger } from '@qubit-ltd/json';

console.log(isInteger('12345'));  // true
console.log(isInteger('123.45')); // false
```

#### `isNumber(value)`

检查一个字符串是否表示数字。

```javascript
import { isNumber } from '@qubit-ltd/json';

console.log(isNumber('12345'));     // true
console.log(isNumber('-123.45'));   // true
console.log(isNumber('1.23e-11'));  // true
console.log(isNumber('abc'));       // false
```

#### `isSafeNumber(value, options)`

检查一个字符串是否表示在 JavaScript 安全范围内的数字。

```javascript
import { isSafeNumber } from '@qubit-ltd/json';

console.log(isSafeNumber('12345'));     // true
console.log(isSafeNumber('12345678901234567890')); // false
console.log(isSafeNumber('123.45678901234567890')); // false
console.log(isSafeNumber('123.45678901234567890', { approx: true, requiredDigits: 16 })); // true
``` 

#### `getUnsafeReason(value)`

解释为什么由字符串表示的数字不安全，返回以下原因之一：

- `'overflow'`（溢出）
- `'underflow'`（下溢）
- `'truncate_integer'`（整数截断）
- `'truncate_float'`（浮点数截断）
- `'none'`：当值是安全时

```javascript
import { getUnsafeReason } from '@qubit-ltd/json';

console.log(getUnsafeReason('12345'));     // Output: 'none'
console.log(getUnsafeReason('12345678901234567890')); // Output: 'truncate_integer'
console.log(getUnsafeReason('-12345678901234567890.123'));  //  Output: 'truncate_float'
console.log(getUnsafeReason('-1e+1000'));   // Output: 'overflow'
console.log(getUnsafeReason('1e-324'));     // Output: 'underflow'
```

#### `toSafeNumberOrThrow(value, options)`

如果可以安全转换，将字符串转换为数字。如果数字不安全，则抛出错误并解释原因。

```javascript
import { toSafeNumberOrThrow } from '@qubit-ltd/json';

try {
  console.log(toSafeNumberOrThrow('-12345678901234567890'));
} catch (e) {
  console.error(e.message);  // Output: 'Cannot safely convert to number: the value '-12345678901234567890' would truncate integer and become -12345678901234567000'
}

console.log(toSafeNumberOrThrow('9007199254740991'));  // Output: 9007199254740991
```

## <span id="contributing">贡献</span>

如果您发现任何问题或有改进建议，请随时在 [GitHub 仓库] 上提交 issue 或 pull request。

## <span id="license">许可证</span>

[@qubit-ltd/json] 根据 Apache 2.0 许可证分发。详情请参阅 [LICENSE](LICENSE) 文件。

## <span id="acknowledgements">致谢</span>

该项目基于并集成了多个开源库的代码，这些库在处理大数字和自定义 JSON 解析方面做出了重要贡献。我们想特别感谢以下项目的作者：

- [json-bigint]：提供对使用 BigInt 解析和字符串化 JSON 的支持，使得可以精确处理大数字。
- [lossless-json]：一个确保在处理浮点数时保持完全精度的库，提供无损的 JSON 数字处理。
- [json-custom-numbers]：允许在 JSON 解析和字符串化过程中自定义数字处理，提供灵活的数值表示。

我们对这些贡献者的工作表示感谢，这些工作对本库功能的实现起到了至关重要的作用。

[@qubit-ltd/json]: https://npmjs.com/package/@qubit-ltd/json
[GitHub repository]: https://github.com/Haixing-Hu/js-json
[Why does JSON.parse corrupt large numbers and how to solve this?]: https://jsoneditoronline.org/indepth/parse/why-does-json-parse-corrupt-large-numbers/
[json-bigint]: https://github.com/sidorares/json-bigint
[lossless-json]: https://github.com/josdejong/lossless-json
[json-custom-numbers]: https://github.com/jawj/json-custom-numbers
