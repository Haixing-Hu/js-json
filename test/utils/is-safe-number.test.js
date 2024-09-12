////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2024.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { isSafeNumber } from '../../src';

describe('isSafeNumber', () => {
  it('returns true for a safe integer', () => {
    expect(isSafeNumber('123')).toBe(true);
  });

  it('returns true for a safe float', () => {
    expect(isSafeNumber('123.45')).toBe(true);
  });

  it('returns false for an unsafe integer', () => {
    expect(isSafeNumber('12345678901234567890')).toBe(false);
  });

  it('returns false for an unsafe float', () => {
    expect(isSafeNumber('12345678901234567890.123')).toBe(false);
  });

  it('returns true for an approximately safe float with default options', () => {
    expect(isSafeNumber('123.45678901234567')).toBe(true);
  });

  it('returns false for an approximately unsafe float with default options', () => {
    expect(isSafeNumber('123.45678901234567890')).toBe(false);
  });

  it('returns true for an approximately safe float with custom required digits', () => {
    expect(isSafeNumber('123.45678901234567890', { approx: true, requiredDigits: 16 })).toBe(true);
  });

  it('returns false for a float with fewer significant digits than required', () => {
    expect(isSafeNumber('123.45678901234567890', { approx: true, requiredDigits: 18 })).toBe(false);
  });

  it('returns true for a number in scientific notation that is safe', () => {
    expect(isSafeNumber('1.23e4')).toBe(true);
  });

  it('returns false for a number in scientific notation that is unsafe', () => {
    expect(isSafeNumber('1.234567890123456789e+30')).toBe(false);
  });

  it('returns true for a negative safe integer', () => {
    expect(isSafeNumber('-123')).toBe(true);
  });

  it('returns true for a negative safe float', () => {
    expect(isSafeNumber('-123.45')).toBe(true);
  });

  it('returns false for a negative unsafe integer', () => {
    expect(isSafeNumber('-12345678901234567890')).toBe(false);
  });

  it('returns false for a negative unsafe float', () => {
    expect(isSafeNumber('-12345678901234567890.123')).toBe(false);
  });

  it('returns true for a negative approximately safe float with default options', () => {
    expect(isSafeNumber('-123.45678901234567', { approx: true })).toBe(true);
  });

  it('returns false for a negative approximately unsafe float with default options', () => {
    expect(isSafeNumber('-123.45678901234567890')).toBe(false);
  });

  it('returns true for a negative approximately safe float with custom required digits', () => {
    expect(isSafeNumber('-123.45678901234567890', { approx: true, requiredDigits: 16 })).toBe(true);
  });

  it('returns false for a negative float with fewer significant digits than required', () => {
    expect(isSafeNumber('-123.45678901234567890', { approx: true, requiredDigits: 18 })).toBe(false);
  });

  it('returns true for a negative number in scientific notation that is safe', () => {
    expect(isSafeNumber('-1.23e4')).toBe(true);
  });

  it('returns false for a negative number in scientific notation that is unsafe', () => {
    expect(isSafeNumber('-1.234567890123456789e+30')).toBe(false);
  });
});
