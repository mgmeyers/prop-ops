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
 * Safely sets deeply nested object properties and returns a new object
 * @param  {Object} obj        object to traverse
 * @param  {String} propString ie. 'report.properties.is_big_box'
 * @return {Object}            updated object
 */
export function setImmutable(obj, propString, value) {
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
 * Safely check if passed object has deeply nested property
 * @param  {Object} obj        object to traverse
 * @param  {String} propString ie. 'report.properties.is_big_box'
 * @return {Boolean}           if obj has value under passed propString or not
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
 * Safely delete deeply nested object properties
 * @param  {Object} obj        object to traverse
 * @param  {String} propString ie. 'report.properties.is_big_box'
 * @return {Object}            updated object
 */
export function del(obj, propString) {
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
 * Safely delete deeply nested object properties
 * @param  {Object} obj        object to traverse
 * @param  {String} propString ie. 'report.properties.is_big_box'
 * @return {Object}            updated object
 */
export function delImmutable(obj, propString) {
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
 * Stylistic alternatives
 */
set.immutable = setImmutable
del.immutable = delImmutable

/**
 * Helpers
 */

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
