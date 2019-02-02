"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.get = get;
exports.set = set;
exports.merge = merge;
exports.has = has;
exports.del = del;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * `npm install prop-ops`
 *
 * `prop-ops` assists in performing CRUD operations on javascript objects and arrays.
 * By default, `prop-ops` does not mutate objects, but offers the option of doing so.
 *
 * @module prop
 * @authors [Matthew Meyers](https://github.com/mgmeyers), [Sunyoung Kim](https://github.com/SunyoungKim508)
 * @license MIT
 */
var PKG_NAME = 'prop-ops';
/**
 * Safely access deeply nested properties of unstructured objects
 *
 * @param  {Object|Array} obj             the object or array to traverse
 * @param  {String}       propString      the path to the desired property
 * @param  {Any}          [fallBack=null] a fall back value to return if the property is not found
 * @return {Any}
 *
 * @example
 * import * as prop from 'prop-ops'
 *
 * const objA = { a: { b: 'c' } }
 * prop.get(objA, 'a.b')
 * // > 'c'
 *
 * // Specify a value to return if a property is not found
 * prop.get(objA, 'a.nope')
 * // > null
 * prop.get(objA, 'a.nope', 24)
 * // > 24
 *
 * // Traverse an array
 * const objB = { a: [{ b: 'c' }] }
 * prop.get(objB, 'a.[0].b')
 * // > 'c'
 */

function get(obj, propString) {
  var fallBack = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  if (!isStr(propString)) {
    throwErr('get', 'propString');
  }

  var path = propString.split('.');
  var len = path.length;
  var nextObj = obj;

  for (var i = 0; i < len; i++) {
    var nextPath = stripBrackets(path[i]);

    if (!isNull(nextObj) && !isUndefined(nextObj[nextPath])) {
      nextObj = nextObj[nextPath];
      continue;
    }

    return fallBack;
  }

  return !isUndefined(nextObj) && !isNull(nextObj) ? nextObj : fallBack;
}
/**
 * Sets deeply nested object properties. `set` will generate objects (or arrays)
 * to reach the final destination of the input path
 *
 * @param  {Object|Array} obj        the object or array to traverse
 * @param  {String}       propString the path to the desired property
 * @param  {Any}          value      the value to set
 * @return {Object|Array}            an updated version of `obj`
 *
 * @example
 * import * as prop from 'prop-ops'
 *
 * const objA = { a: { b: 'c' } }
 * const updatedA = prop.set(objA, 'a.c', 'd')
 * // > objA     == { a: { b: 'c' } }
 * // > updatedA == { a: { b: 'c', c: 'd' } }
 *
 */


function set(obj, propString, value) {
  if (!isUndefined(obj) && _typeof(obj) !== 'object') {
    throwErr('set', 'obj');
  }

  if (!isArrayOrStr(propString)) {
    throwErr('set', 'propString');
  }

  if (isUndefined(value)) {
    throwErr('set', 'value');
  }

  var path = Array.isArray(propString) ? propString : propString.split('.');
  var isArray = isArrayAccessor(path[0]);
  var clone = cloneObjOrArr(obj, isArray);
  var nextPath = stripBrackets(path.shift());

  if (path.length === 0) {
    if (!isArray) {
      clone[nextPath] = value;
    } else if (isValidArrayIndex(nextPath)) {
      clone.splice(nextPath, 1, value);
    }

    return clone;
  }

  clone[nextPath] = set(clone[nextPath], path, value);
  return clone;
}
/**
 * Like `set`, but will modify the original object
 *
 * @param  {Object|Array} obj        the object or array to traverse
 * @param  {String}       propString the path to the desired property
 * @param  {Any}          value      the value to set
 *
 * @example
 * import * as prop from 'prop-ops'
 *
 * const objA = { a: { b: 'c' } }
 * prop.set.mutate(objA, 'a.c', 'd')
 * // > objA == { a: { b: 'c', c: 'd' } }
 *
 * const emptyObj = {}
 * prop.set.mutate(emptyObj, 'a.[0].b.c', 12)
 * // > emptyObj == { a: [{ b: { c: 12 } }] }
 *
 */


set.mutate = function setMutable(obj, propString, value) {
  if (!isUndefined(obj) && _typeof(obj) !== 'object') {
    throwErr('set.mutate', 'obj');
  }

  if (!isArrayOrStr(propString)) {
    throwErr('set.mutate', 'propString');
  }

  if (isUndefined(value)) {
    throwErr('set.mutate', 'value');
  }

  var path = Array.isArray(propString) ? propString : propString.split('.');
  var isArray = isArrayAccessor(path[0]);
  var nextObj = isUndefined(obj) ? generateObjOrArr(isArray) : obj;
  var nextPath = stripBrackets(path.shift());

  if (path.length === 0) {
    if (!isArray) {
      nextObj[nextPath] = value;
    } else if (isValidArrayIndex(nextPath)) {
      nextObj.splice(nextPath, 1, value);
    }

    return nextObj;
  }

  nextObj[nextPath] = set.mutate(nextObj[nextPath], path, value);
  return nextObj;
};
/**
 * Merge deeply nested objects or arrays. `merge` will generate objects (or arrays)
 * to reach the final destination of the input path
 *
 * @param  {Object|Array} obj        the object or array to traverse
 * @param  {String}       propString the path to the desired property
 * @param  {Object|Array} value      the value to set
 * @return {Object|Array}            an updated version of `obj`
 *
 * @example
 * import * as prop from 'prop-ops'
 *
 * const objA = { a: { b: 'c' } }
 * const updatedA = prop.merge(objA, 'a', { d: 'e', f: 'g' })
 * // > objA     == { a: { b: 'c' } }
 * // > updatedA == { a: { b: 'c', d: 'e', f: 'g' } }
 *
 * const objB = { a: [0, 1, 2] }
 * const updatedB = prop.merge(objB, 'a', [, , 3, 4])
 * // > objB     == { a: [0, 1, 2] }
 * // > updatedB == { a: [0, 1, 3, 4] }
 *
 */


function merge(obj, propString, value) {
  if (!isUndefined(obj) && _typeof(obj) !== 'object') {
    throwErr('merge', 'obj');
  }

  if (!isArrayOrStr(propString)) {
    throwErr('merge', 'propString');
  }

  if (isUndefined(value) || _typeof(value) !== 'object') {
    throwErr('merge', 'value');
  }

  var path = Array.isArray(propString) ? propString : propString.split('.');
  var isArray = isArrayAccessor(path[0]);
  var clone = cloneObjOrArr(obj, isArray);
  var nextPath = stripBrackets(path.shift());

  if (path.length === 0) {
    if (isArray !== Array.isArray(value)) {
      throw new Error("".concat(PKG_NAME, " - merge: attempted to merge an array with an object"));
    }

    clone[nextPath] = Object.assign(isArray ? [] : {}, clone[nextPath], value);
    return clone;
  }

  clone[nextPath] = merge(clone[nextPath], path, value);
  return clone;
}
/**
 * Like `merge`, but will modify the original object
 *
 * @param  {Object|Array} obj        the object or array to traverse
 * @param  {String}       propString the path to the desired property
 * @param  {Object|Array} value      the value to set
 *
 * @example
 * import * as prop from 'prop-ops'
 *
 * const objA = { a: { b: 'c' } }
 * prop.merge.mutate(objA, 'a', { d: 'e', f: 'g' })
 * // > objA == { a: { b: 'c', d: 'e', f: 'g' } }
 *
 * const objB = { a: [0, 1, 2] }
 * prop.merge.mutate(objB, 'a', [, , 3, 4])
 * // > objB == { a: [0, 1, 3, 4] }
 *
 */


merge.mutate = function mergeMutable(obj, propString, value) {
  if (!isUndefined(obj) && _typeof(obj) !== 'object') {
    throwErr('merge.mutate', 'obj');
  }

  if (!isArrayOrStr(propString)) {
    throwErr('merge.mutate', 'propString');
  }

  if (isUndefined(value) || _typeof(value) !== 'object') {
    throwErr('merge.mutate', 'value');
  }

  var path = Array.isArray(propString) ? propString : propString.split('.');
  var isArray = isArrayAccessor(path[0]);
  var nextObj = isUndefined(obj) ? generateObjOrArr(isArray) : obj;
  var nextPath = stripBrackets(path.shift());

  if (path.length === 0) {
    if (isArray !== Array.isArray(value)) {
      throw new Error("".concat(PKG_NAME, " - merge.mutate: attempted to merge an array with an object"));
    }

    nextObj[nextPath] = Object.assign(isArray ? [] : {}, nextObj[nextPath], value);
    return nextObj;
  }

  nextObj[nextPath] = merge.mutate(nextObj[nextPath], path, value);
  return nextObj;
};
/**
 * Check if an object or array has a property
 *
 * @param  {Object} obj        object to traverse
 * @param  {String} propString the path to the desired property
 * @return {Boolean}
 *
 * @example
 * import * as prop from 'prop-ops'
 *
 * const objA = { a: [{ b: { c: 'd' } }] }
 * prop.has(objA, 'a.b')
 * // > false
 * prop.has(objA, 'a.[0].b.c')
 * // > true
 *
 */


function has(obj, propString) {
  if (!isStr(propString)) {
    throwErr('has', 'propString');
  }

  var path = propString.split('.');
  var len = path.length;
  var nextObj = obj;

  for (var i = 0; i < len; i++) {
    var nextPath = stripBrackets(path[i]);

    if (!isNull(nextObj) && !isUndefined(nextObj[nextPath])) {
      nextObj = nextObj[nextPath];
      continue;
    }

    return false;
  }

  return !isUndefined(nextObj) && !isNull(nextObj);
}
/**
 * Deletes deeply nested object properties
 *
 * @param  {Object} obj        object to traverse
 * @param  {String} propString the path to the desired property
 * @return {Object}
 *
 * @example
 * import * as prop from 'prop-ops'
 *
 * const objA = { a: { b: { c: 'd' } } }
 * const updatedA = prop.del(objA, 'a.b')
 * // > objA     == { a: { b: { c: 'd' } } }
 * // > updatedA == { a: {} }
 *
 */


function del(obj, propString) {
  if (!isUndefined(obj) && _typeof(obj) !== 'object') {
    throwErr('del', 'obj');
  }

  if (!isArrayOrStr(propString)) {
    throwErr('del', 'propString');
  }

  var path = Array.isArray(propString) ? propString : propString.split('.');
  var isArray = isArrayAccessor(path[0]);
  var clone = cloneObjOrArr(obj, isArray);
  var nextPath = stripBrackets(path.shift());

  if (path.length === 0) {
    if (!isArray) {
      delete clone[nextPath];
    } else if (isValidArrayIndex(nextPath)) {
      clone.splice(nextPath, 1);
    }

    return clone;
  }

  if (!isUndefined(clone[nextPath])) {
    clone[nextPath] = del(clone[nextPath], path);
  }

  return clone;
}
/**
 * Like `del`, but will modify the original object
 *
 * @param  {Object} obj        object to traverse
 * @param  {String} propString the path to the desired property
 *
 * @example
 * import * as prop from 'prop-ops'
 *
 * const objA = { a: [{ b: { c: 'd' } }] }
 * prop.del.mutate(objA, 'a.b')
 * // noop
 * prop.del.mutate(objA, 'a.[0].b')
 * // objA == { a: [{}] }
 *
 */


del.mutate = function delMutable(obj, propString) {
  if (!isUndefined(obj) && _typeof(obj) !== 'object') {
    throwErr('del.mutate', 'obj');
  }

  if (!isArrayOrStr(propString)) {
    throwErr('del.mutate', 'propString');
  }

  var path = Array.isArray(propString) ? propString : propString.split('.');
  var isArray = isArrayAccessor(path[0]);
  var nextPath = stripBrackets(path.shift());

  if (path.length === 0) {
    if (!isArray) {
      delete obj[nextPath];
    } else if (isValidArrayIndex(nextPath)) {
      obj.splice(nextPath, 1);
    }

    return obj;
  }

  if (!isUndefined(obj[nextPath])) {
    obj[nextPath] = del.mutate(obj[nextPath], path);
  }

  return obj;
}; // Helpers


function throwErr(fnName, paramName) {
  throw new Error("".concat(PKG_NAME, " - ").concat(fnName, ": invalid parameter: ").concat(paramName));
}

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