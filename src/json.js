////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2024.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { parse, stringify } from 'json-custom-numbers';
import parseNumber from './parse-number';
import formatNumber from './format-number';
import collectionReplacer from './collection-replacer';

/**
 * A customized JSON object which supports lossless number parsing and stringifying.
 *
 * This object provides two methods: `parse` and `stringify`, which are the same as the
 * `JSON.parse` and `JSON.stringify` methods, except that they support lossless number
 * parsing and stringifying.
 *
 * @type {object}
 */
const json = {
  parse: (text, reviver) => parse(text, reviver, parseNumber),
  stringify: (value, replacer, space) => stringify(value,
    (k, v) => collectionReplacer(k, v, replacer),
    space,
    formatNumber),
};

json[Symbol.toStringTag] = 'JSON';

export default json;
