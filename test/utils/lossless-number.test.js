////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2024.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { LosslessNumber } from '../../src';

describe('LosslessNumber', () => {
  it('constructs a LosslessNumber with a valid number string', () => {
    const num = new LosslessNumber('123.45');
    expect(num.value).toBe('123.45');
    expect(num.isLosslessNumber).toBe(true);
  });

  it('throws an error when constructed with an invalid number string', () => {
    expect(() => new LosslessNumber('abc')).toThrow('Invalid number (value: "abc")');
  });

  it('returns a safe integer as a number', () => {
    const num = new LosslessNumber('123');
    expect(num.valueOf()).toBe(123);
  });

  it('returns a safe float as a number', () => {
    const num = new LosslessNumber('123.45');
    expect(num.valueOf()).toBe(123.45);
  });

  it('returns a big integer as a bigint', () => {
    const num = new LosslessNumber('12345678901234567890');
    expect(num.valueOf()).toBe(BigInt('12345678901234567890'));
  });

  it('returns the truncated float for a float number that cannot be safe represented', () => {
    const number = new LosslessNumber('-12345678901234567890.123');
    expect(number.valueOf()).toBe(-12345678901234567000);
  });

  it('throws an error for a number that overflows', () => {
    const num = new LosslessNumber('1e+1000');
    expect(() => num.valueOf()).toThrow('Cannot safely CONVERT TO NUMBER: '
      + 'the value \'1e+1000\' would overflow and become Infinity');
  });

  it('throws an error for a number that underflows', () => {
    const num = new LosslessNumber('1e-324');
    expect(() => num.valueOf()).toThrow('Cannot safely CONVERT TO NUMBER: '
      + 'the value \'1e-324\' would underflow and become 0');
  });

  it('returns the string representation of the LosslessNumber', () => {
    const num = new LosslessNumber('123.45');
    expect(num.toString()).toBe('123.45');
  });
});
