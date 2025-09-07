/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./interop.js":
/*!********************!*\
  !*** ./interop.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"renderComponent\": () => (/* binding */ renderComponent)\n/* harmony export */ });\nconst filewatcher = __webpack_require__(/*! filewatcher */ \"./node_modules/filewatcher/index.js\");\r\n\r\nconst requireFiles = process.env.NODEREACT_REQUIREFILES.split(\",\").map((t) =>\r\n  t.replace(/\\\\/g, \"/\")\r\n);\r\nconst fileWatcherDebounce = parseInt(process.env.NODEREACT_FILEWATCHERDEBOUNCE);\r\n\r\nconst watcher = filewatcher({\r\n  debounce: fileWatcherDebounce, // debounce events in non-polling mode by 10ms\r\n});\r\n\r\nrequireFiles.map((t) => watcher.add(t));\r\n\r\nwatcher.on(\"change\", () => {\r\n  process.exit(0);\r\n});\r\n\r\nrequireFiles.map(require);\r\n\r\nconst renderComponent = (callback, componentId, options, props) => {\r\n  try {\r\n    const component = resolveComponent(global, options.componentName);\r\n\r\n    if (options.serverOnly) {\r\n      const res = ReactDOMServer.renderToStaticNodeStream(\r\n        React.createElement(\r\n          component,\r\n          Object.assign(props, {\r\n            location: options.location || \"\",\r\n            context: {},\r\n          })\r\n        )\r\n      );\r\n\r\n      callback(null, res);\r\n    } else {\r\n      let context = {};\r\n      let error;\r\n      let bootstrapScriptContent = \"\";\r\n\r\n      if (!options.disableBootstrapPropsInPlace) {\r\n        if (options.bootstrapScriptContent) {\r\n          bootstrapScriptContent = `(window.__nrp = window.__nrp || {})['${componentId}'] = ${JSON.stringify(\r\n            props\r\n          )}; ${options.bootstrapScriptContent}`;\r\n        } else {\r\n          bootstrapScriptContent = `(window.__nrp = window.__nrp || {})['${componentId}'] = ${JSON.stringify(\r\n            props\r\n          )};`;\r\n        }\r\n      } else {\r\n        bootstrapScriptContent = options.bootstrapScriptContent;\r\n      }\r\n\r\n      const { pipe } = ReactDOMServer.renderToPipeableStream(\r\n        React.createElement(\r\n          component,\r\n          Object.assign(props, {\r\n            location: options.location || \"\",\r\n            context: context,\r\n          })\r\n        ),\r\n        {\r\n          bootstrapScriptContent: bootstrapScriptContent,\r\n          onShellReady() {\r\n            if (!options.disableStreaming) {\r\n              callbackPipe(callback, pipe, error, context);\r\n            }\r\n          },\r\n          onShellError(error) {\r\n            callback(error, null);\r\n          },\r\n          onAllReady() {\r\n            if (options.disableStreaming) {\r\n              callbackPipe(callback, pipe, error, context);\r\n            }\r\n          },\r\n          onError(err) {\r\n            error = err;\r\n            console.error(err);\r\n          },\r\n        }\r\n      );\r\n    }\r\n  } catch (err) {\r\n    callback(err, null);\r\n  }\r\n};\r\n\r\nconst callbackPipe = (callback, pipe, error, context) => {\r\n  callback(error, null, (res) => {\r\n    if (context.url) {\r\n      res.setHeader(\"RspUrl\", context.url);\r\n    }\r\n\r\n    if (context.status) {\r\n      res.setHeader(\"RspCode\", context.status);\r\n    }\r\n\r\n    pipe(res);\r\n\r\n    return true;\r\n  });\r\n};\r\n\r\nconst resolveComponent = (object, path, defaultValue) => {\r\n  let current = object;\r\n  const pathArray = typeof path === \"string\" ? path.split(\".\") : path;\r\n\r\n  for (const prop of pathArray) {\r\n    if (current == null) {\r\n      return defaultValue;\r\n    }\r\n\r\n    current = current[prop];\r\n  }\r\n\r\n  return current == null ? defaultValue : current;\r\n};\r\n\r\n\r\n\n\n//# sourceURL=webpack://NodeReact/./interop.js?");

/***/ }),

/***/ "./node_modules/debounce/index.js":
/*!****************************************!*\
  !*** ./node_modules/debounce/index.js ***!
  \****************************************/
/***/ ((module) => {

eval("/**\n * Returns a function, that, as long as it continues to be invoked, will not\n * be triggered. The function will be called after it stops being called for\n * N milliseconds. If `immediate` is passed, trigger the function on the\n * leading edge, instead of the trailing. The function also has a property 'clear' \n * that is a function which will clear the timer to prevent previously scheduled executions. \n *\n * @source underscore.js\n * @see http://unscriptable.com/2009/03/20/debouncing-javascript-methods/\n * @param {Function} function to wrap\n * @param {Number} timeout in ms (`100`)\n * @param {Boolean} whether to execute at the beginning (`false`)\n * @api public\n */\nfunction debounce(func, wait, immediate){\n  var timeout, args, context, timestamp, result;\n  if (null == wait) wait = 100;\n\n  function later() {\n    var last = Date.now() - timestamp;\n\n    if (last < wait && last >= 0) {\n      timeout = setTimeout(later, wait - last);\n    } else {\n      timeout = null;\n      if (!immediate) {\n        result = func.apply(context, args);\n        context = args = null;\n      }\n    }\n  };\n\n  var debounced = function(){\n    context = this;\n    args = arguments;\n    timestamp = Date.now();\n    var callNow = immediate && !timeout;\n    if (!timeout) timeout = setTimeout(later, wait);\n    if (callNow) {\n      result = func.apply(context, args);\n      context = args = null;\n    }\n\n    return result;\n  };\n\n  debounced.clear = function() {\n    if (timeout) {\n      clearTimeout(timeout);\n      timeout = null;\n    }\n  };\n  \n  debounced.flush = function() {\n    if (timeout) {\n      result = func.apply(context, args);\n      context = args = null;\n      \n      clearTimeout(timeout);\n      timeout = null;\n    }\n  };\n\n  return debounced;\n};\n\n// Adds compatibility for ES modules\ndebounce.debounce = debounce;\n\nmodule.exports = debounce;\n\n\n//# sourceURL=webpack://NodeReact/./node_modules/debounce/index.js?");

/***/ }),

/***/ "./node_modules/filewatcher/index.js":
/*!*******************************************!*\
  !*** ./node_modules/filewatcher/index.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var fs = __webpack_require__(/*! fs */ \"fs\")\nvar util = __webpack_require__(/*! util */ \"util\")\nvar debounce = __webpack_require__(/*! debounce */ \"./node_modules/debounce/index.js\")\nvar events = __webpack_require__(/*! events */ \"events\")\nvar EventEmitter = events.EventEmitter\n\nvar outOfFileHandles = false\n\nmodule.exports = function(opts) {\n  return new FileWatcher(opts)\n}\n\nfunction FileWatcher(opts) {\n  if (!opts) opts = {}\n  if (opts.debounce === undefined) opts.debounce = 10\n  if (opts.persistent === undefined) opts.persistent = true\n  if (!opts.interval) opts.interval = 1000\n  this.polling = opts.forcePolling\n  this.opts = opts\n  this.watchers = {}\n}\n\nutil.inherits(FileWatcher, EventEmitter)\n\n/**\n * Start watching the given file.\n */\nFileWatcher.prototype.add = function(file) {\n  var self = this\n\n  // don't add files after we ran out of file handles\n  if (outOfFileHandles && !this.polling) return\n\n  // ignore files that don't exist or are already watched\n  if (this.watchers[file]) return\n  fs.stat(file, function (e, stat) {\n    if (e) return\n\n    // remember the current mtime\n    var mtime = stat.mtime\n\n    // callback for both fs.watch and fs.watchFile\n    function check() {\n      fs.stat(file, function(e, stat) {\n\n        if (!self.watchers[file]) return\n\n        // close watcher and create a new one to work around fs.watch() bug\n        // see https://github.com/joyent/node/issues/3172\n        if (!self.polling) {\n          self.remove(file)\n          add(true)\n        }\n\n        if (!stat) {\n          self.emit('change', file, { deleted: true })\n        }\n        else if (stat.isDirectory() || stat.mtime > mtime) {\n          mtime = stat.mtime\n          self.emit('change', file, stat)\n        }\n      })\n    }\n\n    function add(silent) {\n      if (self.polling) {\n        self.watchers[file] = { close: function() { fs.unwatchFile(file) }}\n        fs.watchFile(file, self.opts, check)\n        return\n      }\n\n      try {\n        // try using fs.watch ...\n        self.watchers[file] = fs.watch(file, self.opts,\n          debounce(check, self.opts.debounce)\n        )\n      }\n      catch (err) {\n        if (err.code == 'EMFILE') {\n          if (self.opts.fallback !== false) {\n            // emit fallback event if we ran out of file handles\n            var count = self.poll()\n            add()\n            self.emit('fallback', count)\n            return\n          }\n          outOfFileHandles = true\n        }\n        if (!silent) self.emit('error', err)\n      }\n    }\n\n    add()\n  })\n}\n\n/**\n * Switch to polling mode. This method is invoked internally if the system\n * runs out of file handles.\n */\nFileWatcher.prototype.poll = function() {\n  if (this.polling) return 0\n  this.polling = true\n  var watched = Object.keys(this.watchers)\n  this.removeAll()\n  watched.forEach(this.add, this)\n  return watched.length\n}\n\n/**\n * Lists all watched files.\n */\nFileWatcher.prototype.list = function() {\n  return Object.keys(this.watchers)\n}\n\n/**\n * Stop watching the given file.\n */\nFileWatcher.prototype.remove = function(file) {\n  var watcher = this.watchers[file]\n  if (!watcher) return\n  delete this.watchers[file]\n  watcher.close()\n}\n\n/**\n * Stop watching all currently watched files.\n */\nFileWatcher.prototype.removeAll = function() {\n  this.list().forEach(this.remove, this)\n}\n\n\n//# sourceURL=webpack://NodeReact/./node_modules/filewatcher/index.js?");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("events");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./interop.js");
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;
