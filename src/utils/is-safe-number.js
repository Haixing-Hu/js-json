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
    // 2. it has at least requiredDigits digits
    // 3. the first requiredDigits digits are equal
    const requiredDigits = options?.requiredDigits ?? DEFAULT_REQUIRED_DIGITS;
    if (!isInteger(value)
        && (s.length >= requiredDigits)
        && v.startsWith(s.substring(0, requiredDigits))) {
      return true;
    }
  }
  return false;
}

export {
  DEFAULT_APPROX,
  DEFAULT_REQUIRED_DIGITS,
  isSafeNumber,
};

export default isSafeNumber;
