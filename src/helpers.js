export function isStr(val) {
  return typeof val === 'string'
}

export function isArrayOrStr(val) {
  return isStr(val) || Array.isArray(val)
}

export function isUndefined(val) {
  return val === undefined
}

export function isNull(val) {
  return val === null
}

export function isValidArrayIndex(val) {
  return !Number.isNaN(parseInt(val, 10))
}

export function isArrayAccessor(val) {
  return isStr(val) && val[0] === '['
}

export function stripBrackets(val) {
  return isArrayAccessor(val) ? val.slice(1, val.length - 1) : val
}

export function generateObjOrArr(shouldBeArray) {
  return shouldBeArray ? [] : {}
}

export function cloneObjOrArr(obj, shouldBeArray) {
  if (isUndefined(obj)) {
    return generateObjOrArr(shouldBeArray)
  }

  return shouldBeArray ? obj.slice() : Object.assign({}, obj)
}
