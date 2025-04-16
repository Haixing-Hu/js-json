////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2024.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import isInteger from './is-integer';
import extractSignificantDigits from './extract-significant-digits';
import isNumber from './is-number';

const DEFAULT_APPROX = false;
const DEFAULT_REQUIRED_DIGITS = 14;

/**
 * Test whether a string can be safely represented with a number without
 * information loss.
 *
 * When the argument `approx` is true, floating point numbers that lose a few
 * digits but are still approximately equal in value are considered safe too.
 * Integer numbers must still be exactly equal.
 *
 * @param {string} value
 *     The string to test.
 * @param {object} options
 *     The options of the test. It may contain the following properties:
 *     - `approx: boolean`: indicates whether to consider approximately equal
 *       floating point numbers as safe. Default is `false`.
 *     - `requiredDigits: number`: the number of significant digits required for
 *        a floating point number to be considered approximately equal. Default
 *        is `14`.
 * @return {boolean}
 *     true if the string can be safely represented with a number; false
 *     otherwise.
 */
function isSafeNumber(value, options = undefined) {
  // 处理边缘情况
  if (!isNumber(value) || value === '' || value === 'NaN') {
    return false;
  }
  
  const num = parseFloat(value);
  const str = String(num);
  if (value === str) {
    return true;
  }
  const v = extractSignificantDigits(value);
  const s = extractSignificantDigits(str);
  if (v === s) {
    return true;
  }
  const approx = options?.approx ?? DEFAULT_APPROX;
  if (approx === true) {
    // A value is approximately equal when:
    // 1. it is a floating point number, not an integer
    // 2. both v and s have at least requiredDigits digits
    // 3. the first requiredDigits digits are equal
    const requiredDigits = options?.requiredDigits ?? DEFAULT_REQUIRED_DIGITS;
    
    // 检查是否为整数
    const isIntegerVal = isInteger(value);
    if (isIntegerVal) {
      return false;
    }
    
    // 检查s的长度是否足够
    const sLengthOk = s.length >= requiredDigits;
    if (!sLengthOk) {
      return false;
    }
    
    // 检查v的长度是否足够
    const vLengthOk = v.length >= requiredDigits;
    if (!vLengthOk) {
      return false;
    }
    
    // 检查前缀是否相同
    const vPrefix = v.substring(0, requiredDigits);
    const sPrefix = s.substring(0, requiredDigits);
    const prefixEqual = vPrefix === sPrefix;
    
    return prefixEqual;
  }
  return false;
}

export {
  DEFAULT_APPROX,
  DEFAULT_REQUIRED_DIGITS,
  isSafeNumber,
};

export default isSafeNumber;
