////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2024.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { toSafeNumberOrThrow } from '../../src';

/* eslint-disable no-magic-numbers */

describe('toSafeNumberOrThrow', () => {
  it('converts a safe integer string to a number', () => {
    expect(toSafeNumberOrThrow('123')).toBe(123);
  });

  it('converts a safe float string to a number', () => {
    expect(toSafeNumberOrThrow('123.45')).toBe(123.45);
  });

  it('throws an error for an unsafe integer string', () => {
    expect(() => toSafeNumberOrThrow('12345678901234567890'))
      .toThrow('Cannot safely convert to number: the value \'12345678901234567890\' '
        + 'would truncate integer and become 12345678901234567000');
  });

  it('throws an error for an unsafe float string', () => {
    expect(() => toSafeNumberOrThrow('12345678901234567890.123'))
      .toThrow('Cannot safely convert to number: the value \'12345678901234567890.123\' '
        + 'would truncate float and become 12345678901234567000');
  });

  it('converts an approximately safe float string to a number when approx is true', () => {
    expect(toSafeNumberOrThrow('123.45678901234567', { approx: true })).toBe(123.45678901234567);
  });

  it('throws an error for an approximately unsafe float string when approx is true', () => {
    expect(toSafeNumberOrThrow('123.45678901234567890', { approx: true })).toBe(123.45678901234568);
  });

  it('converts a safe number in scientific notation to a number', () => {
    expect(toSafeNumberOrThrow('1.23e4')).toBe(12300);
  });

  it('throws an error for an unsafe number in scientific notation', () => {
    expect(toSafeNumberOrThrow('1.23e20')).toBe(1.23e+20);
  });

  it('converts a negative safe integer string to a number', () => {
    expect(toSafeNumberOrThrow('-123')).toBe(-123);
  });

  it('converts a negative safe float string to a number', () => {
    expect(toSafeNumberOrThrow('-123.45')).toBe(-123.45);
  });

  it('throws an error for a negative unsafe integer string', () => {
    expect(() => toSafeNumberOrThrow('-12345678901234567890'))
      .toThrow('Cannot safely convert to number: the value \'-12345678901234567890\' '
        + 'would truncate integer and become -12345678901234567000');
  });

  it('throws an error for a negative unsafe float string', () => {
    expect(() => toSafeNumberOrThrow('-12345678901234567890.123'))
      .toThrow('Cannot safely convert to number: the value \'-12345678901234567890.123\' '
        + 'would truncate float and become -12345678901234567000');
  });

  it('converts a negative approximately safe float string to a number when approx is true', () => {
    expect(toSafeNumberOrThrow('-123.45678901234567', { approx: true }))
      .toBe(-123.45678901234567);
  });

  it('throws an error for a negative approximately unsafe float string when approx is true', () => {
    expect(toSafeNumberOrThrow('-123.45678901234567890', { approx: true })).toBe(-123.45678901234568);
  });
});
