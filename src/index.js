import {
  cloneObjOrArr,
  generateObjOrArr,
  isArrayAccessor,
  isArrayOrStr,
  isNull,
  isStr,
  isUndefined,
  isValidArrayIndex,
  stripBrackets,
} from './helpers'

const PKG_NAME = 'props-ops'

/**
 * Safely accesses deeply nested object properties
 * @param  {Object} obj        object to traverse
 * @param  {String} propString ie. 'report.properties.is_big_box'
 * @param  {Any}    def        default value
 * @return {Any}
 */
export function get(obj, propString, def = null) {
  if (!isStr(propString)) {
    throw new Error(PKG_NAME + ' get: invalid `propString` parameter')
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

    return def
  }

  return !isUndefined(nextObj) && !isNull(nextObj) ? nextObj : def
}

/**
 * Safely sets deeply nested object properties
 * @param  {Object} obj        object to traverse
 * @param  {String} propString ie. 'report.properties.is_big_box'
 * @return {Object}            updated object
 */
export function set(obj, propString, value) {
  if (!isArrayOrStr(propString) || isUndefined(value)) {
    throw new Error(
      PKG_NAME + ' set: invalid `propString` or `value` parameter'
    )
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
 * Safely sets deeply nested object properties and returns a new object
 * @param  {Object} obj        object to traverse
 * @param  {String} propString ie. 'report.properties.is_big_box'
 * @return {Object}            updated object
 */
export function setImmutable(obj, propString, value) {
  if (!isArrayOrStr(propString) || isUndefined(value)) {
    throw new Error(
      PKG_NAME + ' set: invalid `propString` or `value` parameter'
    )
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

set.immutable = setImmutable

/**
 * Safely check if passed object has deeply nested property
 * @param  {Object} obj        object to traverse
 * @param  {String} propString ie. 'report.properties.is_big_box'
 * @return {Boolean}           if obj has value under passed propString or not
 */
export function has(obj, propString) {
  if (!isStr(propString)) {
    throw new Error(PKG_NAME + ' get: invalid `propString` parameter')
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
 * Safely delete deeply nested object properties
 * @param  {Object} obj        object to traverse
 * @param  {String} propString ie. 'report.properties.is_big_box'
 * @return {Object}            updated object
 */
export function del(obj, propString) {
  if (!isArrayOrStr(propString)) {
    throw new Error(PKG_NAME + ' del: invalid `propString` parameter')
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
 * Safely delete deeply nested object properties
 * @param  {Object} obj        object to traverse
 * @param  {String} propString ie. 'report.properties.is_big_box'
 * @return {Object}            updated object
 */
export function delImmutable(obj, propString) {
  if (!isArrayOrStr(propString)) {
    throw new Error(PKG_NAME + ' del: invalid `propString` parameter')
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

del.immutable = delImmutable
