/**
 * Module description goes here
 *
 * @module prop-ops
 * @typicalname prop
 */

const PKG_NAME = 'prop-ops'

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
export function get(obj, propString, fallBack = null) {
  if (!isStr(propString)) {
    throwErr('get', 'propString')
  }

  const path = propString.split('.')
  const len = path.length

  let nextObj = obj

  for (let i = 0; i < len; i++) {
    const nextPath = stripBrackets(path[i])

    if (!isNull(nextObj) && !isUndefined(nextObj[nextPath])) {
      nextObj = nextObj[nextPath]
      continue
    }

    return fallBack
  }

  return !isUndefined(nextObj) && !isNull(nextObj) ? nextObj : fallBack
}

/**
 * Sets deeply nested object properties. `set` will generate objects (or arrays)
 * to reach the final destination of the input path
 *
 * @param  {Object|Array} obj        the object or array to traverse
 * @param  {String}       propString the path to the desired property
 * @param  {Any}          value      the value to set
 *
 * @example
 * import * as prop from 'prop-ops'
 *
 * const objA = { a: { b: 'c' } }
 * prop.set(objA, 'a.c', 'd')
 * // > objA == { a: { b: 'c', c: 'd' } }
 *
 * const emptyObj = {}
 * prop.set(emptyObj, 'a.[0].b.c', 12)
 * // > emptyObj == { a: [{ b: { c: 12 } }] }
 *
 */
export function set(obj, propString, value) {
  if (!isUndefined(obj) && typeof obj !== 'object') {
    throwErr('set', 'obj')
  }

  if (!isArrayOrStr(propString)) {
    throwErr('set', 'propString')
  }

  if (isUndefined(value)) {
    throwErr('set', 'value')
  }

  const path = Array.isArray(propString) ? propString : propString.split('.')

  const isArray = isArrayAccessor(path[0])
  const nextObj = isUndefined(obj) ? generateObjOrArr(isArray) : obj

  const nextPath = stripBrackets(path.shift())

  if (path.length === 0) {
    if (!isArray) {
      nextObj[nextPath] = value
    } else if (isValidArrayIndex(nextPath)) {
      nextObj.splice(nextPath, 1, value)
    }

    return nextObj
  }

  nextObj[nextPath] = set(nextObj[nextPath], path, value)

  return nextObj
}

/**
 * Like `set`, but will not modify the original object
 *
 * @param  {Object|Array} obj        the object or array to traverse
 * @param  {String}       propString the path to the desired property
 * @param  {Any}          value      the value to set
 * @return {Object|Array}            an updated version of the `obj`
 *
 * @example
 * import * as prop from 'prop-ops'
 *
 * const objA = { a: { b: 'c' } }
 * const updatedA = prop.setImmutable(objA, 'a.c', 'd')
 * // Also: prop.set.immutable(objA, 'a.c', 'd')
 * // > objA     == { a: { b: 'c' } }
 * // > updatedA == { a: { b: 'c', c: 'd' } }
 *
 */
export function setImmutable(obj, propString, value) {
  if (!isUndefined(obj) && typeof obj !== 'object') {
    throwErr('setImmutable', 'obj')
  }

  if (!isArrayOrStr(propString)) {
    throwErr('setImmutable', 'propString')
  }

  if (isUndefined(value)) {
    throwErr('setImmutable', 'value')
  }

  const path = Array.isArray(propString) ? propString : propString.split('.')

  const isArray = isArrayAccessor(path[0])
  const clone = cloneObjOrArr(obj, isArray)

  const nextPath = stripBrackets(path.shift())

  if (path.length === 0) {
    if (!isArray) {
      clone[nextPath] = value
    } else if (isValidArrayIndex(nextPath)) {
      clone.splice(nextPath, 1, value)
    }

    return clone
  }

  clone[nextPath] = setImmutable(clone[nextPath], path, value)

  return clone
}

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
export function has(obj, propString) {
  if (!isStr(propString)) {
    throwErr('has', 'propString')
  }

  const path = propString.split('.')
  const len = path.length

  let nextObj = obj

  for (let i = 0; i < len; i++) {
    const nextPath = stripBrackets(path[i])

    if (!isNull(nextObj) && !isUndefined(nextObj[nextPath])) {
      nextObj = nextObj[nextPath]
      continue
    }

    return false
  }

  return !isUndefined(nextObj) && !isNull(nextObj)
}

/**
 * Deletes deeply nested object properties
 *
 * @param  {Object} obj        object to traverse
 * @param  {String} propString the path to the desired property
 *
 * @example
 * import * as prop from 'prop-ops'
 *
 * const objA = { a: [{ b: { c: 'd' } }] }
 * prop.del(objA, 'a.b')
 * // noop
 * prop.del(objA, 'a.[0].b')
 * // objA == { a: [{}] }
 *
 */
export function del(obj, propString) {
  if (!isUndefined(obj) && typeof obj !== 'object') {
    throwErr('del', 'obj')
  }

  if (!isArrayOrStr(propString)) {
    throwErr('del', 'propString')
  }

  const path = Array.isArray(propString) ? propString : propString.split('.')

  const isArray = isArrayAccessor(path[0])
  const nextPath = stripBrackets(path.shift())

  if (path.length === 0) {
    if (!isArray) {
      delete obj[nextPath]
    } else if (isValidArrayIndex(nextPath)) {
      obj.splice(nextPath, 1)
    }

    return obj
  }

  if (!isUndefined(obj[nextPath])) {
    obj[nextPath] = del(obj[nextPath], path)
  }

  return obj
}

/**
 * Like `del` but will not modify the original object
 *
 * @param  {Object} obj        object to traverse
 * @param  {String} propString the path to the desired property
 * @return {Object}            updated object
 *
 * @example
 * import * as prop from 'prop-ops'
 *
 * const objA = { a: { b: { c: 'd' } } }
 * const updatedA = prop.del(objA, 'a.b')
 * // Also: prop.del.immutable(objA, 'a.b')
 * // > objA == { a: { b: { c: 'd' } } }
 * // > updatedA == { a: {} }
 *
 */
export function delImmutable(obj, propString) {
  if (!isUndefined(obj) && typeof obj !== 'object') {
    throwErr('delImmutable', 'obj')
  }

  if (!isArrayOrStr(propString)) {
    throwErr('delImmutable', 'propString')
  }

  const path = Array.isArray(propString) ? propString : propString.split('.')

  const isArray = isArrayAccessor(path[0])
  const clone = cloneObjOrArr(obj, isArray)
  const nextPath = stripBrackets(path.shift())

  if (path.length === 0) {
    if (!isArray) {
      delete clone[nextPath]
    } else if (isValidArrayIndex(nextPath)) {
      clone.splice(nextPath, 1)
    }

    return clone
  }

  if (!isUndefined(clone[nextPath])) {
    clone[nextPath] = delImmutable(clone[nextPath], path)
  }

  return clone
}

/**
 * @see {@link setImmutable}
 */
set.immutable = setImmutable

/**
 * @see {@link delImmutable}
 */
del.immutable = delImmutable

// Helpers
function throwErr(fnName, paramName) {
  throw new Error(`${PKG_NAME} - ${fnName}: invalid parameter: ${paramName}`)
}

function isStr(val) {
  return typeof val === 'string'
}

function isArrayOrStr(val) {
  return isStr(val) || Array.isArray(val)
}

function isUndefined(val) {
  return val === undefined
}

function isNull(val) {
  return val === null
}

function isValidArrayIndex(val) {
  return !Number.isNaN(parseInt(val, 10))
}

function isArrayAccessor(val) {
  return isStr(val) && val[0] === '['
}

function stripBrackets(val) {
  return isArrayAccessor(val) ? val.slice(1, val.length - 1) : val
}

function generateObjOrArr(shouldBeArray) {
  return shouldBeArray ? [] : {}
}

function cloneObjOrArr(obj, shouldBeArray) {
  if (isUndefined(obj)) {
    return generateObjOrArr(shouldBeArray)
  }

  return shouldBeArray ? obj.slice() : Object.assign({}, obj)
}
