/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/helpers.js":
/*!************************!*\
  !*** ./src/helpers.js ***!
  \************************/
/*! exports provided: isStr, isArrayOrStr, isUndefined, isNull, isValidArrayIndex, isArrayAccessor, stripBrackets, generateObjOrArr, cloneObjOrArr */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"isStr\", function() { return isStr; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"isArrayOrStr\", function() { return isArrayOrStr; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"isUndefined\", function() { return isUndefined; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"isNull\", function() { return isNull; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"isValidArrayIndex\", function() { return isValidArrayIndex; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"isArrayAccessor\", function() { return isArrayAccessor; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"stripBrackets\", function() { return stripBrackets; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"generateObjOrArr\", function() { return generateObjOrArr; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"cloneObjOrArr\", function() { return cloneObjOrArr; });\nfunction isStr(val) {\n  return typeof val === 'string'\n}\n\nfunction isArrayOrStr(val) {\n  return isStr(val) || Array.isArray(val)\n}\n\nfunction isUndefined(val) {\n  return val === undefined\n}\n\nfunction isNull(val) {\n  return val === null\n}\n\nfunction isValidArrayIndex(val) {\n  return !Number.isNaN(parseInt(val, 10))\n}\n\nfunction isArrayAccessor(val) {\n  return isStr(val) && val[0] === '['\n}\n\nfunction stripBrackets(val) {\n  return isArrayAccessor(val) ? val.slice(1, val.length - 1) : val\n}\n\nfunction generateObjOrArr(shouldBeArray) {\n  return shouldBeArray ? [] : {}\n}\n\nfunction cloneObjOrArr(obj, shouldBeArray) {\n  if (isUndefined(obj)) {\n    return generateObjOrArr(shouldBeArray)\n  }\n\n  return shouldBeArray ? obj.slice() : Object.assign({}, obj)\n}\n\n\n//# sourceURL=webpack:///./src/helpers.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: get, set, setImmutable, has, del, delImmutable */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"get\", function() { return get; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"set\", function() { return set; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"setImmutable\", function() { return setImmutable; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"has\", function() { return has; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"del\", function() { return del; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"delImmutable\", function() { return delImmutable; });\n/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers */ \"./src/helpers.js\");\n\n\nconst PKG_NAME = 'props-ops'\n\n/**\n * Safely accesses deeply nested object properties\n * @param  {Object} obj        object to traverse\n * @param  {String} propString ie. 'report.properties.is_big_box'\n * @param  {Any}    def        default value\n * @return {Any}\n */\nfunction get(obj, propString, def = null) {\n  if (!Object(_helpers__WEBPACK_IMPORTED_MODULE_0__[\"isStr\"])(propString)) {\n    throw new Error(PKG_NAME + ' get: invalid `propString` parameter')\n  }\n\n  const path = propString.split('.')\n  const len = path.length\n\n  let nextObj = obj\n\n  for (let i = 0; i < len; i++) {\n    const nextPath = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__[\"stripBrackets\"])(path[i])\n\n    if (!Object(_helpers__WEBPACK_IMPORTED_MODULE_0__[\"isNull\"])(nextObj) && !Object(_helpers__WEBPACK_IMPORTED_MODULE_0__[\"isUndefined\"])(nextObj[nextPath])) {\n      nextObj = nextObj[nextPath]\n      continue\n    }\n\n    return def\n  }\n\n  return !Object(_helpers__WEBPACK_IMPORTED_MODULE_0__[\"isUndefined\"])(nextObj) && !Object(_helpers__WEBPACK_IMPORTED_MODULE_0__[\"isNull\"])(nextObj) ? nextObj : def\n}\n\n/**\n * Safely sets deeply nested object properties\n * @param  {Object} obj        object to traverse\n * @param  {String} propString ie. 'report.properties.is_big_box'\n * @return {Object}            updated object\n */\nfunction set(obj, propString, value) {\n  if (!Object(_helpers__WEBPACK_IMPORTED_MODULE_0__[\"isArrayOrStr\"])(propString) || Object(_helpers__WEBPACK_IMPORTED_MODULE_0__[\"isUndefined\"])(value)) {\n    throw new Error(\n      PKG_NAME + ' set: invalid `propString` or `value` parameter'\n    )\n  }\n\n  const path = Array.isArray(propString) ? propString : propString.split('.')\n\n  const isArray = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__[\"isArrayAccessor\"])(path[0])\n  const nextObj = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__[\"isUndefined\"])(obj) ? Object(_helpers__WEBPACK_IMPORTED_MODULE_0__[\"generateObjOrArr\"])(isArray) : obj\n\n  const nextPath = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__[\"stripBrackets\"])(path.shift())\n\n  if (path.length === 0) {\n    if (!isArray) {\n      nextObj[nextPath] = value\n    } else if (Object(_helpers__WEBPACK_IMPORTED_MODULE_0__[\"isValidArrayIndex\"])(nextPath)) {\n      nextObj.splice(nextPath, 1, value)\n    }\n\n    return nextObj\n  }\n\n  nextObj[nextPath] = set(nextObj[nextPath], path, value)\n\n  return nextObj\n}\n\n/**\n * Safely sets deeply nested object properties and returns a new object\n * @param  {Object} obj        object to traverse\n * @param  {String} propString ie. 'report.properties.is_big_box'\n * @return {Object}            updated object\n */\nfunction setImmutable(obj, propString, value) {\n  if (!Object(_helpers__WEBPACK_IMPORTED_MODULE_0__[\"isArrayOrStr\"])(propString) || Object(_helpers__WEBPACK_IMPORTED_MODULE_0__[\"isUndefined\"])(value)) {\n    throw new Error(\n      PKG_NAME + ' set: invalid `propString` or `value` parameter'\n    )\n  }\n\n  const path = Array.isArray(propString) ? propString : propString.split('.')\n\n  const isArray = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__[\"isArrayAccessor\"])(path[0])\n  const clone = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__[\"cloneObjOrArr\"])(obj, isArray)\n\n  const nextPath = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__[\"stripBrackets\"])(path.shift())\n\n  if (path.length === 0) {\n    if (!isArray) {\n      clone[nextPath] = value\n    } else if (Object(_helpers__WEBPACK_IMPORTED_MODULE_0__[\"isValidArrayIndex\"])(nextPath)) {\n      clone.splice(nextPath, 1, value)\n    }\n\n    return clone\n  }\n\n  clone[nextPath] = setImmutable(clone[nextPath], path, value)\n\n  return clone\n}\n\nset.immutable = setImmutable\n\n/**\n * Safely check if passed object has deeply nested property\n * @param  {Object} obj        object to traverse\n * @param  {String} propString ie. 'report.properties.is_big_box'\n * @return {Boolean}           if obj has value under passed propString or not\n */\nfunction has(obj, propString) {\n  if (!Object(_helpers__WEBPACK_IMPORTED_MODULE_0__[\"isStr\"])(propString)) {\n    throw new Error(PKG_NAME + ' get: invalid `propString` parameter')\n  }\n\n  const path = propString.split('.')\n  const len = path.length\n\n  let nextObj = obj\n\n  for (let i = 0; i < len; i++) {\n    const nextPath = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__[\"stripBrackets\"])(path[i])\n\n    if (!Object(_helpers__WEBPACK_IMPORTED_MODULE_0__[\"isNull\"])(nextObj) && !Object(_helpers__WEBPACK_IMPORTED_MODULE_0__[\"isUndefined\"])(nextObj[nextPath])) {\n      nextObj = nextObj[nextPath]\n      continue\n    }\n\n    return false\n  }\n\n  return !Object(_helpers__WEBPACK_IMPORTED_MODULE_0__[\"isUndefined\"])(nextObj) && !Object(_helpers__WEBPACK_IMPORTED_MODULE_0__[\"isNull\"])(nextObj)\n}\n\n/**\n * Safely delete deeply nested object properties\n * @param  {Object} obj        object to traverse\n * @param  {String} propString ie. 'report.properties.is_big_box'\n * @return {Object}            updated object\n */\nfunction del(obj, propString) {\n  if (!Object(_helpers__WEBPACK_IMPORTED_MODULE_0__[\"isArrayOrStr\"])(propString)) {\n    throw new Error(PKG_NAME + ' del: invalid `propString` parameter')\n  }\n\n  const path = Array.isArray(propString) ? propString : propString.split('.')\n\n  const isArray = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__[\"isArrayAccessor\"])(path[0])\n  const nextPath = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__[\"stripBrackets\"])(path.shift())\n\n  if (path.length === 0) {\n    if (!isArray) {\n      delete obj[nextPath]\n    } else if (Object(_helpers__WEBPACK_IMPORTED_MODULE_0__[\"isValidArrayIndex\"])(nextPath)) {\n      obj.splice(nextPath, 1)\n    }\n\n    return obj\n  }\n\n  if (!Object(_helpers__WEBPACK_IMPORTED_MODULE_0__[\"isUndefined\"])(obj[nextPath])) {\n    obj[nextPath] = del(obj[nextPath], path)\n  }\n\n  return obj\n}\n\n/**\n * Safely delete deeply nested object properties\n * @param  {Object} obj        object to traverse\n * @param  {String} propString ie. 'report.properties.is_big_box'\n * @return {Object}            updated object\n */\nfunction delImmutable(obj, propString) {\n  if (!Object(_helpers__WEBPACK_IMPORTED_MODULE_0__[\"isArrayOrStr\"])(propString)) {\n    throw new Error(PKG_NAME + ' del: invalid `propString` parameter')\n  }\n\n  const path = Array.isArray(propString) ? propString : propString.split('.')\n\n  const isArray = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__[\"isArrayAccessor\"])(path[0])\n  const clone = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__[\"cloneObjOrArr\"])(obj, isArray)\n  const nextPath = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__[\"stripBrackets\"])(path.shift())\n\n  if (path.length === 0) {\n    if (!isArray) {\n      delete clone[nextPath]\n    } else if (Object(_helpers__WEBPACK_IMPORTED_MODULE_0__[\"isValidArrayIndex\"])(nextPath)) {\n      clone.splice(nextPath, 1)\n    }\n\n    return clone\n  }\n\n  if (!Object(_helpers__WEBPACK_IMPORTED_MODULE_0__[\"isUndefined\"])(clone[nextPath])) {\n    clone[nextPath] = delImmutable(clone[nextPath], path)\n  }\n\n  return clone\n}\n\ndel.immutable = delImmutable\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });