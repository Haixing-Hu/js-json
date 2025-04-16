////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2024.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
const isSafeNumber = require('../../src/utils/is-safe-number').default;
const isInteger = require('../../src/utils/is-integer').default;
const extractSignificantDigits = require('../../src/utils/extract-significant-digits').default;

// 测试当isInteger返回true时的行为
console.log('============== 测试整数情况 ==============');
const integerStr = '123';
const isIntegerResult = isInteger(integerStr);
console.log('isInteger结果:', isIntegerResult);
const integerWithApproxResult = isSafeNumber(integerStr, { approx: true });
console.log('整数且approx=true时的结果:', integerWithApproxResult);

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
const shortFloatResult = isSafeNumber(shortFloatStr, { approx: true, requiredDigits });
console.log('s.length < requiredDigits时的结果:', shortFloatResult);

// 测试v.length < requiredDigits的情况
console.log('\n============== 测试v.length < requiredDigits的情况 ==============');
const artificialShortV = '1.2';
const vArtificial = extractSignificantDigits(artificialShortV);
const sArtificial = extractSignificantDigits(String(parseFloat(artificialShortV)));
console.log('artificialShortV:', artificialShortV);
console.log('parseFloat结果:', String(parseFloat(artificialShortV)));
console.log('v:', vArtificial, '长度:', vArtificial.length);
console.log('s:', sArtificial, '长度:', sArtificial.length);
console.log('requiredDigits:', requiredDigits);
console.log('v.length < requiredDigits:', vArtificial.length < requiredDigits);
const artificialShortVResult = isSafeNumber(artificialShortV, { approx: true, requiredDigits });
console.log('v.length < requiredDigits时的结果:', artificialShortVResult);

// 测试前缀不匹配的情况
console.log('\n============== 测试前缀不匹配的情况 ==============');
// 这种情况需要手动构造一个例子，因为实际中很难找到一个在前requiredDigits位不匹配的例子
console.log('我们不能直接测试这种情况，因为需要手动构造不匹配的前缀');
console.log('真实的isSafeNumber函数逻辑是：');
console.log('1. 如果前缀匹配，返回true');
console.log('2. 如果前缀不匹配，返回false'); 