"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/dunder-proto";
exports.ids = ["vendor-chunks/dunder-proto"];
exports.modules = {

/***/ "(ssr)/./node_modules/dunder-proto/get.js":
/*!******************************************!*\
  !*** ./node_modules/dunder-proto/get.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\r\n\r\nvar callBind = __webpack_require__(/*! call-bind-apply-helpers */ \"(ssr)/./node_modules/call-bind-apply-helpers/index.js\");\r\nvar gOPD = __webpack_require__(/*! gopd */ \"(ssr)/./node_modules/gopd/index.js\");\r\n\r\nvar hasProtoAccessor;\r\ntry {\r\n\t// eslint-disable-next-line no-extra-parens, no-proto\r\n\thasProtoAccessor = /** @type {{ __proto__?: typeof Array.prototype }} */ ([]).__proto__ === Array.prototype;\r\n} catch (e) {\r\n\tif (!e || typeof e !== 'object' || !('code' in e) || e.code !== 'ERR_PROTO_ACCESS') {\r\n\t\tthrow e;\r\n\t}\r\n}\r\n\r\n// eslint-disable-next-line no-extra-parens\r\nvar desc = !!hasProtoAccessor && gOPD && gOPD(Object.prototype, /** @type {keyof typeof Object.prototype} */ ('__proto__'));\r\n\r\nvar $Object = Object;\r\nvar $getPrototypeOf = $Object.getPrototypeOf;\r\n\r\n/** @type {import('./get')} */\r\nmodule.exports = desc && typeof desc.get === 'function'\r\n\t? callBind([desc.get])\r\n\t: typeof $getPrototypeOf === 'function'\r\n\t\t? /** @type {import('./get')} */ function getDunder(value) {\r\n\t\t\t// eslint-disable-next-line eqeqeq\r\n\t\t\treturn $getPrototypeOf(value == null ? value : $Object(value));\r\n\t\t}\r\n\t\t: false;\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvZHVuZGVyLXByb3RvL2dldC5qcyIsIm1hcHBpbmdzIjoiQUFBYTtBQUNiO0FBQ0EsZUFBZSxtQkFBTyxDQUFDLHNGQUF5QjtBQUNoRCxXQUFXLG1CQUFPLENBQUMsZ0RBQU07QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMsc0NBQXNDO0FBQ3ZFLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyRUFBMkUsK0JBQStCO0FBQzFHO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxpQkFBaUI7QUFDNUI7QUFDQTtBQUNBO0FBQ0EsZUFBZSxpQkFBaUI7QUFDaEM7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcR3JhY2UgTmFpcm5cXE9uZURyaXZlXFxEb2N1bWVudHNcXEdpdEh1YlxcQ1NDX0NhcHN0b25lXFxub2RlX21vZHVsZXNcXGR1bmRlci1wcm90b1xcZ2V0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciBjYWxsQmluZCA9IHJlcXVpcmUoJ2NhbGwtYmluZC1hcHBseS1oZWxwZXJzJyk7XHJcbnZhciBnT1BEID0gcmVxdWlyZSgnZ29wZCcpO1xyXG5cclxudmFyIGhhc1Byb3RvQWNjZXNzb3I7XHJcbnRyeSB7XHJcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWV4dHJhLXBhcmVucywgbm8tcHJvdG9cclxuXHRoYXNQcm90b0FjY2Vzc29yID0gLyoqIEB0eXBlIHt7IF9fcHJvdG9fXz86IHR5cGVvZiBBcnJheS5wcm90b3R5cGUgfX0gKi8gKFtdKS5fX3Byb3RvX18gPT09IEFycmF5LnByb3RvdHlwZTtcclxufSBjYXRjaCAoZSkge1xyXG5cdGlmICghZSB8fCB0eXBlb2YgZSAhPT0gJ29iamVjdCcgfHwgISgnY29kZScgaW4gZSkgfHwgZS5jb2RlICE9PSAnRVJSX1BST1RPX0FDQ0VTUycpIHtcclxuXHRcdHRocm93IGU7XHJcblx0fVxyXG59XHJcblxyXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tZXh0cmEtcGFyZW5zXHJcbnZhciBkZXNjID0gISFoYXNQcm90b0FjY2Vzc29yICYmIGdPUEQgJiYgZ09QRChPYmplY3QucHJvdG90eXBlLCAvKiogQHR5cGUge2tleW9mIHR5cGVvZiBPYmplY3QucHJvdG90eXBlfSAqLyAoJ19fcHJvdG9fXycpKTtcclxuXHJcbnZhciAkT2JqZWN0ID0gT2JqZWN0O1xyXG52YXIgJGdldFByb3RvdHlwZU9mID0gJE9iamVjdC5nZXRQcm90b3R5cGVPZjtcclxuXHJcbi8qKiBAdHlwZSB7aW1wb3J0KCcuL2dldCcpfSAqL1xyXG5tb2R1bGUuZXhwb3J0cyA9IGRlc2MgJiYgdHlwZW9mIGRlc2MuZ2V0ID09PSAnZnVuY3Rpb24nXHJcblx0PyBjYWxsQmluZChbZGVzYy5nZXRdKVxyXG5cdDogdHlwZW9mICRnZXRQcm90b3R5cGVPZiA9PT0gJ2Z1bmN0aW9uJ1xyXG5cdFx0PyAvKiogQHR5cGUge2ltcG9ydCgnLi9nZXQnKX0gKi8gZnVuY3Rpb24gZ2V0RHVuZGVyKHZhbHVlKSB7XHJcblx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcWVxZXFcclxuXHRcdFx0cmV0dXJuICRnZXRQcm90b3R5cGVPZih2YWx1ZSA9PSBudWxsID8gdmFsdWUgOiAkT2JqZWN0KHZhbHVlKSk7XHJcblx0XHR9XHJcblx0XHQ6IGZhbHNlO1xyXG4iXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbMF0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/dunder-proto/get.js\n");

/***/ })

};
;