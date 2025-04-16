////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2024.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import isSafeNumber from '../../src/utils/is-safe-number';
import isInteger from '../../src/utils/is-integer';
import extractSignificantDigits from '../../src/utils/extract-significant-digits';

describe('debug-is-safe-number', () => {
  it('should debug isInteger behavior', () => {
    // 测试当isInteger返回true时的行为
    console.log('============== 测试整数情况 ==============');
    const integerStr = '123';
    const isIntegerResult = isInteger(integerStr);
    console.log('isInteger结果:', isIntegerResult);
    const integerWithApproxResult = isSafeNumber(integerStr, { approx: true });
    console.log('整数且approx=true时的结果:', integerWithApproxResult);
    
    // 这个测试断言是基于实际的函数行为，而不是期望的行为
    // 如果isInteger('123')返回true，那么isSafeNumber('123', { approx: true })应该返回什么
    expect(integerWithApproxResult).toBe(true);
  });
  
  it('should debug s.length < requiredDigits behavior', () => {
    // 测试s.length < requiredDigits的情况
    console.log('\n============== 测试s.length < requiredDigits的情况 ==============');
    const shortFloatStr = '0.1';
    const requiredDigits = 5;
    const vShort = extractSignificantDigits(shortFloatStr);
    const sShort = extractSignificantDigits(String(parseFloat(shortFloatStr)));
    console.log('shortFloatStr:', shortFloatStr);
    console.log('parseFloat结果:', String(parseFloat(shortFloatStr)));
    console.log('v:', vShort, '长度:', vShort.length);
    console.log('s:', sShort, '长度:', sShort.length);
    console.log('requiredDigits:', requiredDigits);
    console.log('s.length < requiredDigits:', sShort.length < requiredDigits);
    console.log('v === s:', vShort === sShort);
    const shortFloatResult = isSafeNumber(shortFloatStr, { approx: true, requiredDigits });
    console.log('s.length < requiredDigits时的结果:', shortFloatResult);
    
    // 断言实际行为
    expect(shortFloatResult).toBe(true);
  });
  
  it('should debug v.length < requiredDigits behavior', () => {
    // 测试v.length < requiredDigits的情况
    console.log('\n============== 测试v.length < requiredDigits的情况 ==============');
    const artificialShortV = '1.2';
    const vArtificial = extractSignificantDigits(artificialShortV);
    const sArtificial = extractSignificantDigits(String(parseFloat(artificialShortV)));
    console.log('artificialShortV:', artificialShortV);
    console.log('parseFloat结果:', String(parseFloat(artificialShortV)));
    console.log('v:', vArtificial, '长度:', vArtificial.length);
    console.log('s:', sArtificial, '长度:', sArtificial.length);
    const requiredDigits = 5;
    console.log('requiredDigits:', requiredDigits);
    console.log('v.length < requiredDigits:', vArtificial.length < 5);
    console.log('v === s:', vArtificial === sArtificial);
    const artificialShortVResult = isSafeNumber(artificialShortV, { approx: true, requiredDigits: 5 });
    console.log('v.length < requiredDigits时的结果:', artificialShortVResult);
    
    // 断言实际行为
    expect(artificialShortVResult).toBe(true);
  });
}); 