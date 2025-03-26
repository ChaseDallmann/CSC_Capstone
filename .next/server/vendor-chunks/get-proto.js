"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/get-proto";
exports.ids = ["vendor-chunks/get-proto"];
exports.modules = {

/***/ "(ssr)/./node_modules/get-proto/Object.getPrototypeOf.js":
/*!*********************************************************!*\
  !*** ./node_modules/get-proto/Object.getPrototypeOf.js ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\r\n\r\nvar $Object = __webpack_require__(/*! es-object-atoms */ \"(ssr)/./node_modules/es-object-atoms/index.js\");\r\n\r\n/** @type {import('./Object.getPrototypeOf')} */\r\nmodule.exports = $Object.getPrototypeOf || null;\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvZ2V0LXByb3RvL09iamVjdC5nZXRQcm90b3R5cGVPZi5qcyIsIm1hcHBpbmdzIjoiQUFBYTtBQUNiO0FBQ0EsY0FBYyxtQkFBTyxDQUFDLHNFQUFpQjtBQUN2QztBQUNBLFdBQVcsbUNBQW1DO0FBQzlDIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXG5hdGFzXFxEb2N1bWVudHNcXEdpdEh1YlxcQ1NDX0NhcHN0b25lLUNoYXNlLUNoYW5nZXNcXG5vZGVfbW9kdWxlc1xcZ2V0LXByb3RvXFxPYmplY3QuZ2V0UHJvdG90eXBlT2YuanMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xyXG5cclxudmFyICRPYmplY3QgPSByZXF1aXJlKCdlcy1vYmplY3QtYXRvbXMnKTtcclxuXHJcbi8qKiBAdHlwZSB7aW1wb3J0KCcuL09iamVjdC5nZXRQcm90b3R5cGVPZicpfSAqL1xyXG5tb2R1bGUuZXhwb3J0cyA9ICRPYmplY3QuZ2V0UHJvdG90eXBlT2YgfHwgbnVsbDtcclxuIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6WzBdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/get-proto/Object.getPrototypeOf.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/get-proto/Reflect.getPrototypeOf.js":
/*!**********************************************************!*\
  !*** ./node_modules/get-proto/Reflect.getPrototypeOf.js ***!
  \**********************************************************/
/***/ ((module) => {

eval("\r\n\r\n/** @type {import('./Reflect.getPrototypeOf')} */\r\nmodule.exports = (typeof Reflect !== 'undefined' && Reflect.getPrototypeOf) || null;\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvZ2V0LXByb3RvL1JlZmxlY3QuZ2V0UHJvdG90eXBlT2YuanMiLCJtYXBwaW5ncyI6IkFBQWE7QUFDYjtBQUNBLFdBQVcsb0NBQW9DO0FBQy9DIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXG5hdGFzXFxEb2N1bWVudHNcXEdpdEh1YlxcQ1NDX0NhcHN0b25lLUNoYXNlLUNoYW5nZXNcXG5vZGVfbW9kdWxlc1xcZ2V0LXByb3RvXFxSZWZsZWN0LmdldFByb3RvdHlwZU9mLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcclxuXHJcbi8qKiBAdHlwZSB7aW1wb3J0KCcuL1JlZmxlY3QuZ2V0UHJvdG90eXBlT2YnKX0gKi9cclxubW9kdWxlLmV4cG9ydHMgPSAodHlwZW9mIFJlZmxlY3QgIT09ICd1bmRlZmluZWQnICYmIFJlZmxlY3QuZ2V0UHJvdG90eXBlT2YpIHx8IG51bGw7XHJcbiJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOlswXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/get-proto/Reflect.getPrototypeOf.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/get-proto/index.js":
/*!*****************************************!*\
  !*** ./node_modules/get-proto/index.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\r\n\r\nvar reflectGetProto = __webpack_require__(/*! ./Reflect.getPrototypeOf */ \"(ssr)/./node_modules/get-proto/Reflect.getPrototypeOf.js\");\r\nvar originalGetProto = __webpack_require__(/*! ./Object.getPrototypeOf */ \"(ssr)/./node_modules/get-proto/Object.getPrototypeOf.js\");\r\n\r\nvar getDunderProto = __webpack_require__(/*! dunder-proto/get */ \"(ssr)/./node_modules/dunder-proto/get.js\");\r\n\r\n/** @type {import('.')} */\r\nmodule.exports = reflectGetProto\r\n\t? function getProto(O) {\r\n\t\t// @ts-expect-error TS can't narrow inside a closure, for some reason\r\n\t\treturn reflectGetProto(O);\r\n\t}\r\n\t: originalGetProto\r\n\t\t? function getProto(O) {\r\n\t\t\tif (!O || (typeof O !== 'object' && typeof O !== 'function')) {\r\n\t\t\t\tthrow new TypeError('getProto: not an object');\r\n\t\t\t}\r\n\t\t\t// @ts-expect-error TS can't narrow inside a closure, for some reason\r\n\t\t\treturn originalGetProto(O);\r\n\t\t}\r\n\t\t: getDunderProto\r\n\t\t\t? function getProto(O) {\r\n\t\t\t\t// @ts-expect-error TS can't narrow inside a closure, for some reason\r\n\t\t\t\treturn getDunderProto(O);\r\n\t\t\t}\r\n\t\t\t: null;\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvZ2V0LXByb3RvL2luZGV4LmpzIiwibWFwcGluZ3MiOiJBQUFhO0FBQ2I7QUFDQSxzQkFBc0IsbUJBQU8sQ0FBQywwRkFBMEI7QUFDeEQsdUJBQXVCLG1CQUFPLENBQUMsd0ZBQXlCO0FBQ3hEO0FBQ0EscUJBQXFCLG1CQUFPLENBQUMsa0VBQWtCO0FBQy9DO0FBQ0EsV0FBVyxhQUFhO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXG5hdGFzXFxEb2N1bWVudHNcXEdpdEh1YlxcQ1NDX0NhcHN0b25lLUNoYXNlLUNoYW5nZXNcXG5vZGVfbW9kdWxlc1xcZ2V0LXByb3RvXFxpbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XHJcblxyXG52YXIgcmVmbGVjdEdldFByb3RvID0gcmVxdWlyZSgnLi9SZWZsZWN0LmdldFByb3RvdHlwZU9mJyk7XHJcbnZhciBvcmlnaW5hbEdldFByb3RvID0gcmVxdWlyZSgnLi9PYmplY3QuZ2V0UHJvdG90eXBlT2YnKTtcclxuXHJcbnZhciBnZXREdW5kZXJQcm90byA9IHJlcXVpcmUoJ2R1bmRlci1wcm90by9nZXQnKTtcclxuXHJcbi8qKiBAdHlwZSB7aW1wb3J0KCcuJyl9ICovXHJcbm1vZHVsZS5leHBvcnRzID0gcmVmbGVjdEdldFByb3RvXHJcblx0PyBmdW5jdGlvbiBnZXRQcm90byhPKSB7XHJcblx0XHQvLyBAdHMtZXhwZWN0LWVycm9yIFRTIGNhbid0IG5hcnJvdyBpbnNpZGUgYSBjbG9zdXJlLCBmb3Igc29tZSByZWFzb25cclxuXHRcdHJldHVybiByZWZsZWN0R2V0UHJvdG8oTyk7XHJcblx0fVxyXG5cdDogb3JpZ2luYWxHZXRQcm90b1xyXG5cdFx0PyBmdW5jdGlvbiBnZXRQcm90byhPKSB7XHJcblx0XHRcdGlmICghTyB8fCAodHlwZW9mIE8gIT09ICdvYmplY3QnICYmIHR5cGVvZiBPICE9PSAnZnVuY3Rpb24nKSkge1xyXG5cdFx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ2dldFByb3RvOiBub3QgYW4gb2JqZWN0Jyk7XHJcblx0XHRcdH1cclxuXHRcdFx0Ly8gQHRzLWV4cGVjdC1lcnJvciBUUyBjYW4ndCBuYXJyb3cgaW5zaWRlIGEgY2xvc3VyZSwgZm9yIHNvbWUgcmVhc29uXHJcblx0XHRcdHJldHVybiBvcmlnaW5hbEdldFByb3RvKE8pO1xyXG5cdFx0fVxyXG5cdFx0OiBnZXREdW5kZXJQcm90b1xyXG5cdFx0XHQ/IGZ1bmN0aW9uIGdldFByb3RvKE8pIHtcclxuXHRcdFx0XHQvLyBAdHMtZXhwZWN0LWVycm9yIFRTIGNhbid0IG5hcnJvdyBpbnNpZGUgYSBjbG9zdXJlLCBmb3Igc29tZSByZWFzb25cclxuXHRcdFx0XHRyZXR1cm4gZ2V0RHVuZGVyUHJvdG8oTyk7XHJcblx0XHRcdH1cclxuXHRcdFx0OiBudWxsO1xyXG4iXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbMF0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/get-proto/index.js\n");

/***/ })

};
;