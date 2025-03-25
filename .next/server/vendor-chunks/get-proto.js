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

eval("\r\n\r\nvar $Object = __webpack_require__(/*! es-object-atoms */ \"(ssr)/./node_modules/es-object-atoms/index.js\");\r\n\r\n/** @type {import('./Object.getPrototypeOf')} */\r\nmodule.exports = $Object.getPrototypeOf || null;\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvZ2V0LXByb3RvL09iamVjdC5nZXRQcm90b3R5cGVPZi5qcyIsIm1hcHBpbmdzIjoiQUFBYTtBQUNiO0FBQ0EsY0FBYyxtQkFBTyxDQUFDLHNFQUFpQjtBQUN2QztBQUNBLFdBQVcsbUNBQW1DO0FBQzlDIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXEdyYWNlIE5haXJuXFxPbmVEcml2ZVxcRG9jdW1lbnRzXFxHaXRIdWJcXENTQ19DYXBzdG9uZVxcbm9kZV9tb2R1bGVzXFxnZXQtcHJvdG9cXE9iamVjdC5nZXRQcm90b3R5cGVPZi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XHJcblxyXG52YXIgJE9iamVjdCA9IHJlcXVpcmUoJ2VzLW9iamVjdC1hdG9tcycpO1xyXG5cclxuLyoqIEB0eXBlIHtpbXBvcnQoJy4vT2JqZWN0LmdldFByb3RvdHlwZU9mJyl9ICovXHJcbm1vZHVsZS5leHBvcnRzID0gJE9iamVjdC5nZXRQcm90b3R5cGVPZiB8fCBudWxsO1xyXG4iXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbMF0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/get-proto/Object.getPrototypeOf.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/get-proto/Reflect.getPrototypeOf.js":
/*!**********************************************************!*\
  !*** ./node_modules/get-proto/Reflect.getPrototypeOf.js ***!
  \**********************************************************/
/***/ ((module) => {

eval("\r\n\r\n/** @type {import('./Reflect.getPrototypeOf')} */\r\nmodule.exports = (typeof Reflect !== 'undefined' && Reflect.getPrototypeOf) || null;\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvZ2V0LXByb3RvL1JlZmxlY3QuZ2V0UHJvdG90eXBlT2YuanMiLCJtYXBwaW5ncyI6IkFBQWE7QUFDYjtBQUNBLFdBQVcsb0NBQW9DO0FBQy9DIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXEdyYWNlIE5haXJuXFxPbmVEcml2ZVxcRG9jdW1lbnRzXFxHaXRIdWJcXENTQ19DYXBzdG9uZVxcbm9kZV9tb2R1bGVzXFxnZXQtcHJvdG9cXFJlZmxlY3QuZ2V0UHJvdG90eXBlT2YuanMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLyoqIEB0eXBlIHtpbXBvcnQoJy4vUmVmbGVjdC5nZXRQcm90b3R5cGVPZicpfSAqL1xyXG5tb2R1bGUuZXhwb3J0cyA9ICh0eXBlb2YgUmVmbGVjdCAhPT0gJ3VuZGVmaW5lZCcgJiYgUmVmbGVjdC5nZXRQcm90b3R5cGVPZikgfHwgbnVsbDtcclxuIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6WzBdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/get-proto/Reflect.getPrototypeOf.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/get-proto/index.js":
/*!*****************************************!*\
  !*** ./node_modules/get-proto/index.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\r\n\r\nvar reflectGetProto = __webpack_require__(/*! ./Reflect.getPrototypeOf */ \"(ssr)/./node_modules/get-proto/Reflect.getPrototypeOf.js\");\r\nvar originalGetProto = __webpack_require__(/*! ./Object.getPrototypeOf */ \"(ssr)/./node_modules/get-proto/Object.getPrototypeOf.js\");\r\n\r\nvar getDunderProto = __webpack_require__(/*! dunder-proto/get */ \"(ssr)/./node_modules/dunder-proto/get.js\");\r\n\r\n/** @type {import('.')} */\r\nmodule.exports = reflectGetProto\r\n\t? function getProto(O) {\r\n\t\t// @ts-expect-error TS can't narrow inside a closure, for some reason\r\n\t\treturn reflectGetProto(O);\r\n\t}\r\n\t: originalGetProto\r\n\t\t? function getProto(O) {\r\n\t\t\tif (!O || (typeof O !== 'object' && typeof O !== 'function')) {\r\n\t\t\t\tthrow new TypeError('getProto: not an object');\r\n\t\t\t}\r\n\t\t\t// @ts-expect-error TS can't narrow inside a closure, for some reason\r\n\t\t\treturn originalGetProto(O);\r\n\t\t}\r\n\t\t: getDunderProto\r\n\t\t\t? function getProto(O) {\r\n\t\t\t\t// @ts-expect-error TS can't narrow inside a closure, for some reason\r\n\t\t\t\treturn getDunderProto(O);\r\n\t\t\t}\r\n\t\t\t: null;\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvZ2V0LXByb3RvL2luZGV4LmpzIiwibWFwcGluZ3MiOiJBQUFhO0FBQ2I7QUFDQSxzQkFBc0IsbUJBQU8sQ0FBQywwRkFBMEI7QUFDeEQsdUJBQXVCLG1CQUFPLENBQUMsd0ZBQXlCO0FBQ3hEO0FBQ0EscUJBQXFCLG1CQUFPLENBQUMsa0VBQWtCO0FBQy9DO0FBQ0EsV0FBVyxhQUFhO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXEdyYWNlIE5haXJuXFxPbmVEcml2ZVxcRG9jdW1lbnRzXFxHaXRIdWJcXENTQ19DYXBzdG9uZVxcbm9kZV9tb2R1bGVzXFxnZXQtcHJvdG9cXGluZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciByZWZsZWN0R2V0UHJvdG8gPSByZXF1aXJlKCcuL1JlZmxlY3QuZ2V0UHJvdG90eXBlT2YnKTtcclxudmFyIG9yaWdpbmFsR2V0UHJvdG8gPSByZXF1aXJlKCcuL09iamVjdC5nZXRQcm90b3R5cGVPZicpO1xyXG5cclxudmFyIGdldER1bmRlclByb3RvID0gcmVxdWlyZSgnZHVuZGVyLXByb3RvL2dldCcpO1xyXG5cclxuLyoqIEB0eXBlIHtpbXBvcnQoJy4nKX0gKi9cclxubW9kdWxlLmV4cG9ydHMgPSByZWZsZWN0R2V0UHJvdG9cclxuXHQ/IGZ1bmN0aW9uIGdldFByb3RvKE8pIHtcclxuXHRcdC8vIEB0cy1leHBlY3QtZXJyb3IgVFMgY2FuJ3QgbmFycm93IGluc2lkZSBhIGNsb3N1cmUsIGZvciBzb21lIHJlYXNvblxyXG5cdFx0cmV0dXJuIHJlZmxlY3RHZXRQcm90byhPKTtcclxuXHR9XHJcblx0OiBvcmlnaW5hbEdldFByb3RvXHJcblx0XHQ/IGZ1bmN0aW9uIGdldFByb3RvKE8pIHtcclxuXHRcdFx0aWYgKCFPIHx8ICh0eXBlb2YgTyAhPT0gJ29iamVjdCcgJiYgdHlwZW9mIE8gIT09ICdmdW5jdGlvbicpKSB7XHJcblx0XHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignZ2V0UHJvdG86IG5vdCBhbiBvYmplY3QnKTtcclxuXHRcdFx0fVxyXG5cdFx0XHQvLyBAdHMtZXhwZWN0LWVycm9yIFRTIGNhbid0IG5hcnJvdyBpbnNpZGUgYSBjbG9zdXJlLCBmb3Igc29tZSByZWFzb25cclxuXHRcdFx0cmV0dXJuIG9yaWdpbmFsR2V0UHJvdG8oTyk7XHJcblx0XHR9XHJcblx0XHQ6IGdldER1bmRlclByb3RvXHJcblx0XHRcdD8gZnVuY3Rpb24gZ2V0UHJvdG8oTykge1xyXG5cdFx0XHRcdC8vIEB0cy1leHBlY3QtZXJyb3IgVFMgY2FuJ3QgbmFycm93IGluc2lkZSBhIGNsb3N1cmUsIGZvciBzb21lIHJlYXNvblxyXG5cdFx0XHRcdHJldHVybiBnZXREdW5kZXJQcm90byhPKTtcclxuXHRcdFx0fVxyXG5cdFx0XHQ6IG51bGw7XHJcbiJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOlswXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/get-proto/index.js\n");

/***/ })

};
;