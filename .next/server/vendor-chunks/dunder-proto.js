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

eval("\r\n\r\nvar callBind = __webpack_require__(/*! call-bind-apply-helpers */ \"(ssr)/./node_modules/call-bind-apply-helpers/index.js\");\r\nvar gOPD = __webpack_require__(/*! gopd */ \"(ssr)/./node_modules/gopd/index.js\");\r\n\r\nvar hasProtoAccessor;\r\ntry {\r\n\t// eslint-disable-next-line no-extra-parens, no-proto\r\n\thasProtoAccessor = /** @type {{ __proto__?: typeof Array.prototype }} */ ([]).__proto__ === Array.prototype;\r\n} catch (e) {\r\n\tif (!e || typeof e !== 'object' || !('code' in e) || e.code !== 'ERR_PROTO_ACCESS') {\r\n\t\tthrow e;\r\n\t}\r\n}\r\n\r\n// eslint-disable-next-line no-extra-parens\r\nvar desc = !!hasProtoAccessor && gOPD && gOPD(Object.prototype, /** @type {keyof typeof Object.prototype} */ ('__proto__'));\r\n\r\nvar $Object = Object;\r\nvar $getPrototypeOf = $Object.getPrototypeOf;\r\n\r\n/** @type {import('./get')} */\r\nmodule.exports = desc && typeof desc.get === 'function'\r\n\t? callBind([desc.get])\r\n\t: typeof $getPrototypeOf === 'function'\r\n\t\t? /** @type {import('./get')} */ function getDunder(value) {\r\n\t\t\t// eslint-disable-next-line eqeqeq\r\n\t\t\treturn $getPrototypeOf(value == null ? value : $Object(value));\r\n\t\t}\r\n\t\t: false;\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvZHVuZGVyLXByb3RvL2dldC5qcyIsIm1hcHBpbmdzIjoiQUFBYTtBQUNiO0FBQ0EsZUFBZSxtQkFBTyxDQUFDLHNGQUF5QjtBQUNoRCxXQUFXLG1CQUFPLENBQUMsZ0RBQU07QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMsc0NBQXNDO0FBQ3ZFLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyRUFBMkUsK0JBQStCO0FBQzFHO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxpQkFBaUI7QUFDNUI7QUFDQTtBQUNBO0FBQ0EsZUFBZSxpQkFBaUI7QUFDaEM7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcbmF0YXNcXERvY3VtZW50c1xcR2l0SHViXFxDU0NfQ2Fwc3RvbmUtQ2hhc2UtQ2hhbmdlc1xcbm9kZV9tb2R1bGVzXFxkdW5kZXItcHJvdG9cXGdldC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XHJcblxyXG52YXIgY2FsbEJpbmQgPSByZXF1aXJlKCdjYWxsLWJpbmQtYXBwbHktaGVscGVycycpO1xyXG52YXIgZ09QRCA9IHJlcXVpcmUoJ2dvcGQnKTtcclxuXHJcbnZhciBoYXNQcm90b0FjY2Vzc29yO1xyXG50cnkge1xyXG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1leHRyYS1wYXJlbnMsIG5vLXByb3RvXHJcblx0aGFzUHJvdG9BY2Nlc3NvciA9IC8qKiBAdHlwZSB7eyBfX3Byb3RvX18/OiB0eXBlb2YgQXJyYXkucHJvdG90eXBlIH19ICovIChbXSkuX19wcm90b19fID09PSBBcnJheS5wcm90b3R5cGU7XHJcbn0gY2F0Y2ggKGUpIHtcclxuXHRpZiAoIWUgfHwgdHlwZW9mIGUgIT09ICdvYmplY3QnIHx8ICEoJ2NvZGUnIGluIGUpIHx8IGUuY29kZSAhPT0gJ0VSUl9QUk9UT19BQ0NFU1MnKSB7XHJcblx0XHR0aHJvdyBlO1xyXG5cdH1cclxufVxyXG5cclxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWV4dHJhLXBhcmVuc1xyXG52YXIgZGVzYyA9ICEhaGFzUHJvdG9BY2Nlc3NvciAmJiBnT1BEICYmIGdPUEQoT2JqZWN0LnByb3RvdHlwZSwgLyoqIEB0eXBlIHtrZXlvZiB0eXBlb2YgT2JqZWN0LnByb3RvdHlwZX0gKi8gKCdfX3Byb3RvX18nKSk7XHJcblxyXG52YXIgJE9iamVjdCA9IE9iamVjdDtcclxudmFyICRnZXRQcm90b3R5cGVPZiA9ICRPYmplY3QuZ2V0UHJvdG90eXBlT2Y7XHJcblxyXG4vKiogQHR5cGUge2ltcG9ydCgnLi9nZXQnKX0gKi9cclxubW9kdWxlLmV4cG9ydHMgPSBkZXNjICYmIHR5cGVvZiBkZXNjLmdldCA9PT0gJ2Z1bmN0aW9uJ1xyXG5cdD8gY2FsbEJpbmQoW2Rlc2MuZ2V0XSlcclxuXHQ6IHR5cGVvZiAkZ2V0UHJvdG90eXBlT2YgPT09ICdmdW5jdGlvbidcclxuXHRcdD8gLyoqIEB0eXBlIHtpbXBvcnQoJy4vZ2V0Jyl9ICovIGZ1bmN0aW9uIGdldER1bmRlcih2YWx1ZSkge1xyXG5cdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXFlcWVxXHJcblx0XHRcdHJldHVybiAkZ2V0UHJvdG90eXBlT2YodmFsdWUgPT0gbnVsbCA/IHZhbHVlIDogJE9iamVjdCh2YWx1ZSkpO1xyXG5cdFx0fVxyXG5cdFx0OiBmYWxzZTtcclxuIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6WzBdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/dunder-proto/get.js\n");

/***/ })

};
;