"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isStr = isStr;
exports.isArrayOrStr = isArrayOrStr;
exports.isUndefined = isUndefined;
exports.isNull = isNull;
exports.isValidArrayIndex = isValidArrayIndex;
exports.isArrayAccessor = isArrayAccessor;
exports.stripBrackets = stripBrackets;
exports.generateObjOrArr = generateObjOrArr;
exports.cloneObjOrArr = cloneObjOrArr;

function isStr(val) {
  return typeof val === 'string';
}

function isArrayOrStr(val) {
  return isStr(val) || Array.isArray(val);
}

function isUndefined(val) {
  return val === undefined;
}

function isNull(val) {
  return val === null;
}

function isValidArrayIndex(val) {
  return !Number.isNaN(parseInt(val, 10));
}

function isArrayAccessor(val) {
  return isStr(val) && val[0] === '[';
}

function stripBrackets(val) {
  return isArrayAccessor(val) ? val.slice(1, val.length - 1) : val;
}

function generateObjOrArr(shouldBeArray) {
  return shouldBeArray ? [] : {};
}

function cloneObjOrArr(obj, shouldBeArray) {
  if (isUndefined(obj)) {
    return generateObjOrArr(shouldBeArray);
  }

  return shouldBeArray ? obj.slice() : Object.assign({}, obj);
}