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

/**
 * When the provided value is an unsafe number, describe what the reason is
 * - `'overflow'`
 * - `'underflow'`
 * - `'truncate_integer'`
 * - `'truncate_float'`
 * - `'none'` (when the value is safe)
 *
 * @param {string} value
 *     The string represents a number to test.
 * @return {string}
 *     The reason why the value is unsafe. Returns `'none'` when the value is safe.
 */
function getUnsafeReason(value) {
  const num = parseFloat(value);
  const str = String(num);
  if (value === str) {
    return 'none';
  }
  const v = extractSignificantDigits(value);
  const s = extractSignificantDigits(str);
  if (v === s) {
    return 'none';
  }
  if (isInteger(value)) {
    return 'truncate_integer';
  }
  if (!Number.isFinite(num)) {
    return 'overflow';
  }
  if (num === 0) {
    return 'underflow';
  }
  return 'truncate_float';
}

export default getUnsafeReason;
