"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.get = get;
exports.set = set;
exports.setImmutable = setImmutable;
exports.has = has;
exports.del = del;
exports.delImmutable = delImmutable;

var _helpers = require("./helpers");

var PKG_NAME = 'props-ops';
/**
 * Safely accesses deeply nested object properties
 * @param  {Object} obj        object to traverse
 * @param  {String} propString ie. 'report.properties.is_big_box'
 * @param  {Any}    def        default value
 * @return {Any}
 */

function get(obj, propString) {
  var def = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  if (!(0, _helpers.isStr)(propString)) {
    throw new Error(PKG_NAME + ' get: invalid `propString` parameter');
  }

  var path = propString.split('.');
  var len = path.length;
  var nextObj = obj;

  for (var i = 0; i < len; i++) {
    var nextPath = (0, _helpers.stripBrackets)(path[i]);

    if (!(0, _helpers.isNull)(nextObj) && !(0, _helpers.isUndefined)(nextObj[nextPath])) {
      nextObj = nextObj[nextPath];
      continue;
    }

    return def;
  }

  return !(0, _helpers.isUndefined)(nextObj) && !(0, _helpers.isNull)(nextObj) ? nextObj : def;
}
/**
 * Safely sets deeply nested object properties
 * @param  {Object} obj        object to traverse
 * @param  {String} propString ie. 'report.properties.is_big_box'
 * @return {Object}            updated object
 */


function set(obj, propString, value) {
  if (!(0, _helpers.isArrayOrStr)(propString) || (0, _helpers.isUndefined)(value)) {
    throw new Error(PKG_NAME + ' set: invalid `propString` or `value` parameter');
  }

  var path = Array.isArray(propString) ? propString : propString.split('.');
  var isArray = (0, _helpers.isArrayAccessor)(path[0]);
  var nextObj = (0, _helpers.isUndefined)(obj) ? (0, _helpers.generateObjOrArr)(isArray) : obj;
  var nextPath = (0, _helpers.stripBrackets)(path.shift());

  if (path.length === 0) {
    if (!isArray) {
      nextObj[nextPath] = value;
    } else if ((0, _helpers.isValidArrayIndex)(nextPath)) {
      nextObj.splice(nextPath, 1, value);
    }

    return nextObj;
  }

  nextObj[nextPath] = set(nextObj[nextPath], path, value);
  return nextObj;
}
/**
 * Safely sets deeply nested object properties and returns a new object
 * @param  {Object} obj        object to traverse
 * @param  {String} propString ie. 'report.properties.is_big_box'
 * @return {Object}            updated object
 */


function setImmutable(obj, propString, value) {
  if (!(0, _helpers.isArrayOrStr)(propString) || (0, _helpers.isUndefined)(value)) {
    throw new Error(PKG_NAME + ' set: invalid `propString` or `value` parameter');
  }

  var path = Array.isArray(propString) ? propString : propString.split('.');
  var isArray = (0, _helpers.isArrayAccessor)(path[0]);
  var clone = (0, _helpers.cloneObjOrArr)(obj, isArray);
  var nextPath = (0, _helpers.stripBrackets)(path.shift());

  if (path.length === 0) {
    if (!isArray) {
      clone[nextPath] = value;
    } else if ((0, _helpers.isValidArrayIndex)(nextPath)) {
      clone.splice(nextPath, 1, value);
    }

    return clone;
  }

  clone[nextPath] = setImmutable(clone[nextPath], path, value);
  return clone;
}

set.immutable = setImmutable;
/**
 * Safely check if passed object has deeply nested property
 * @param  {Object} obj        object to traverse
 * @param  {String} propString ie. 'report.properties.is_big_box'
 * @return {Boolean}           if obj has value under passed propString or not
 */

function has(obj, propString) {
  if (!(0, _helpers.isStr)(propString)) {
    throw new Error(PKG_NAME + ' get: invalid `propString` parameter');
  }

  var path = propString.split('.');
  var len = path.length;
  var nextObj = obj;

  for (var i = 0; i < len; i++) {
    var nextPath = (0, _helpers.stripBrackets)(path[i]);

    if (!(0, _helpers.isNull)(nextObj) && !(0, _helpers.isUndefined)(nextObj[nextPath])) {
      nextObj = nextObj[nextPath];
      continue;
    }

    return false;
  }

  return !(0, _helpers.isUndefined)(nextObj) && !(0, _helpers.isNull)(nextObj);
}
/**
 * Safely delete deeply nested object properties
 * @param  {Object} obj        object to traverse
 * @param  {String} propString ie. 'report.properties.is_big_box'
 * @return {Object}            updated object
 */


function del(obj, propString) {
  if (!(0, _helpers.isArrayOrStr)(propString)) {
    throw new Error(PKG_NAME + ' del: invalid `propString` parameter');
  }

  var path = Array.isArray(propString) ? propString : propString.split('.');
  var isArray = (0, _helpers.isArrayAccessor)(path[0]);
  var nextPath = (0, _helpers.stripBrackets)(path.shift());

  if (path.length === 0) {
    if (!isArray) {
      delete obj[nextPath];
    } else if ((0, _helpers.isValidArrayIndex)(nextPath)) {
      obj.splice(nextPath, 1);
    }

    return obj;
  }

  if (!(0, _helpers.isUndefined)(obj[nextPath])) {
    obj[nextPath] = del(obj[nextPath], path);
  }

  return obj;
}
/**
 * Safely delete deeply nested object properties
 * @param  {Object} obj        object to traverse
 * @param  {String} propString ie. 'report.properties.is_big_box'
 * @return {Object}            updated object
 */


function delImmutable(obj, propString) {
  if (!(0, _helpers.isArrayOrStr)(propString)) {
    throw new Error(PKG_NAME + ' del: invalid `propString` parameter');
  }

  var path = Array.isArray(propString) ? propString : propString.split('.');
  var isArray = (0, _helpers.isArrayAccessor)(path[0]);
  var clone = (0, _helpers.cloneObjOrArr)(obj, isArray);
  var nextPath = (0, _helpers.stripBrackets)(path.shift());

  if (path.length === 0) {
    if (!isArray) {
      delete clone[nextPath];
    } else if ((0, _helpers.isValidArrayIndex)(nextPath)) {
      clone.splice(nextPath, 1);
    }

    return clone;
  }

  if (!(0, _helpers.isUndefined)(clone[nextPath])) {
    clone[nextPath] = delImmutable(clone[nextPath], path);
  }

  return clone;
}