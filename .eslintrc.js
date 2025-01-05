////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
module.exports = {
  root: true,
  parser: '@babel/eslint-parser',
  extends: [
    '@qubit-ltd/eslint-config',
  ],
  globals: {
    'globalThis': 'readonly',
    'BigInt': 'readonly',
  },
};
