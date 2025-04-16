////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2024.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import isSafeNumber from '../../src/utils/is-safe-number';
import * as isIntegerModule from '../../src/utils/is-integer';
import * as extractSignificantDigitsModule from '../../src/utils/extract-significant-digits';
import * as isNumberModule from '../../src/utils/is-number';

// 这个测试文件完全专注于测试is-safe-number.js第81行的条件分支
describe('is-safe-number.js - v.length < requiredDigits测试', () => {
  // 不使用mock，直接测试实际行为
  
  test('测试v.length < requiredDigits时的行为', () => {
    // 创建一个短的浮点数，确保其有效数字少于所需数字
    const shortValue = '0.1'; // 提取有效数字后为 "1"
    
    // 设置较大的requiredDigits确保v.length < requiredDigits
    const requiredDigits = 10;
    
    // 调用函数
    const result = isSafeNumber(shortValue, { approx: true, requiredDigits });
    
    // 验证结果 - 函数应该返回true
    expect(result).toBe(true);
  });

  test('测试更复杂的v.length < requiredDigits场景', () => {
    // 创建另一个短浮点数
    const value = '0.123'; // 提取有效数字后为 "123"
    
    // 设置较大的requiredDigits
    const requiredDigits = 8;
    
    // 调用函数
    const result = isSafeNumber(value, { approx: true, requiredDigits });
    
    // 验证结果
    expect(result).toBe(true);
  });

  test('测试临界情况：v.length刚好小于requiredDigits', () => {
    // 创建一个浮点数，其有效数字长度刚好小于requiredDigits
    const value = '0.12345'; // 提取有效数字后为 "12345"
    
    // 设置requiredDigits为比v.length大1
    const requiredDigits = 6;
    
    // 调用函数
    const result = isSafeNumber(value, { approx: true, requiredDigits });
    
    // 验证结果
    expect(result).toBe(true);
  });
  
  test('比较v.length < requiredDigits和v.length >= requiredDigits的行为', () => {
    // 创建一个短浮点数
    const shortValue = '0.1'; // v.length = 1
    
    // 创建一个长浮点数
    const longValue = '0.123456789012345'; // v.length = 15
    
    // 使用中间值的requiredDigits
    const requiredDigits = 10;
    
    // 测试短值 (v.length < requiredDigits)
    const resultShort = isSafeNumber(shortValue, { approx: true, requiredDigits });
    expect(resultShort).toBe(true);
    
    // 测试长值 (v.length >= requiredDigits)
    const resultLong = isSafeNumber(longValue, { approx: true, requiredDigits });
    expect(resultLong).toBe(true); // 假设前缀匹配，结果也应为true
  });
}); 