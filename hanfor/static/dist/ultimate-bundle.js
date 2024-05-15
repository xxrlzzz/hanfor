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

/***/ "../ultimate/static/ultimate.js":
/*!**************************************!*\
  !*** ../ultimate/static/ultimate.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("/* provided dependency */ var $ = __webpack_require__(/*! jquery */ \"./node_modules/jquery/dist/jquery.js\");\n__webpack_require__(/*! gasparesganga-jquery-loading-overlay */ \"./node_modules/gasparesganga-jquery-loading-overlay/src/loadingoverlay.js\")\n__webpack_require__(/*! bootstrap */ \"./node_modules/bootstrap/dist/js/bootstrap.esm.js\")\n__webpack_require__(/*! datatables.net-bs5 */ \"./node_modules/datatables.net-bs5/js/dataTables.bootstrap5.mjs\")\n__webpack_require__(/*! jquery-ui/ui/effects/effect-highlight */ \"./node_modules/jquery-ui/ui/effects/effect-highlight.js\")\n__webpack_require__(/*! ../../static/js/bootstrap-tokenfield.js */ \"./js/bootstrap-tokenfield.js\")\n__webpack_require__(/*! ../../static/js/bootstrap-confirm-button */ \"./js/bootstrap-confirm-button.js\")\n__webpack_require__(/*! datatables.net-colreorder-bs5 */ \"./node_modules/datatables.net-colreorder-bs5/js/colReorder.bootstrap5.mjs\")\n\nconst {SearchNode} = __webpack_require__(/*! ../../static/js/datatables-advanced-search */ \"./js/datatables-advanced-search.js\");\nconst ultimateSearchString = sessionStorage.getItem('ultimateSearchString')\nconst {Modal} = __webpack_require__(/*! bootstrap */ \"./node_modules/bootstrap/dist/js/bootstrap.esm.js\")\n\nlet search_tree\n\n$(document).ready(function () {\n    const searchInput = $('#search_bar')\n    const ultimateJobsTable = $('#ultimate-jobs-tbl')\n    const ultimateJobsDataTable = ultimateJobsTable.DataTable({\n        paging: true,\n        stateSave: true,\n        pageLength: 50,\n        responsive: true,\n        lengthMenu: [[10, 50, 100, 500, -1], [10, 50, 100, 500, 'All']],\n        dom: 'rt<\"container\"<\"row\"<\"col-md-6\"li><\"col-md-6\"p>>>',\n        ajax: {\n            url: '../api/ultimate/jobs'\n        },\n        deferRender: true,\n        columns: dataTableColumns,\n        initComplete: function () {\n            searchInput.val(ultimateSearchString);\n            update_search(searchInput.val().trim());\n\n            // Enable Hanfor specific table filtering.\n            $.fn.dataTable.ext.search.push(function (settings, data) {\n                // data contains the row. data[0] is the content of the first column in the actual row.\n                // Return true to include the row into the data. false to exclude.\n                return evaluate_search(data);\n            })\n            this.api().draw();\n        }\n    });\n\n    // Bind big custom searchbar to search the table.\n    searchInput.keypress(function (e) {\n        if (e.which === 13) { // Search on enter.\n            update_search(searchInput.val().trim());\n            ultimateJobsDataTable.draw();\n        }\n    });\n\n    $('.clear-all-filters').click(function () {\n        searchInput.val('').effect('highlight', {color: 'green'}, 500);\n        update_search(searchInput.val().trim());\n        ultimateJobsDataTable.draw();\n    });\n\n    const ultimateResultTable = $('#ultimate-job-modal-result-tbl')\n    const ultimateResultDataTable = ultimateResultTable.DataTable({\n        paging: true,\n        stateSave: true,\n        pageLength: 50,\n        responsive: true,\n        lengthMenu: [[10, 50, 100, 500, -1], [10, 50, 100, 500, 'All']],\n        dom: 'rt<\"container\"<\"row\"<\"col-md-6\"li><\"col-md-6\"p>>>',\n        deferRender: true,\n        columns: resultDataTableColumns,\n        initComplete: function () {\n            this.api().draw()\n        }\n    });\n\n    // Add listener for job_link link to modal.\n    ultimateJobsTable.find('tbody').on('click', 'a.modal-opener', function (event) {\n        // prevent body to be scrolled to the top.\n        event.preventDefault();\n\n        // Get row data\n        let data = ultimateJobsDataTable.row($(event.target).parent()).data();\n\n        Modal.getOrCreateInstance($('#ultimate-job-modal')).show();\n        $('#ultimate-job-modal-title').html('Job ID: ' + data['requestId']);\n\n        $('#ultimate-job-modal-request-time').text(data['request_time']);\n        $('#ultimate-job-modal-last-update').text(data['last_update']);\n        $('#ultimate-job-modal-request-status').text(data['status']);\n        ultimateResultDataTable.clear();\n        ultimateResultDataTable.rows.add(data['result']);\n        ultimateResultDataTable.draw();\n\n        $('#ultimate-tag-modal-download-btn').click(function () {\n            download_req(data['requestId']);\n        });\n\n    })\n});\n\nconst dataTableColumns = [\n    {\n        data: 'requestId',\n        render: function (data) {\n            return `<a class=\"modal-opener\" href=\"#\">${data}</a>`\n        }\n    }, {\n        data: 'request_time',\n        order: 'asc',\n        render: function (data) {\n            return `<div class=\"white-space-pre\">${data}</div>`\n        }\n    }, {\n        data: 'last_update',\n        render: function (data) {\n            return `<div class=\"white-space-pre\">${data}</div>`\n        }\n    }, {\n        data: 'status',\n        render: function (data) {\n            return `<div class=\"white-space-pre\">${data}</div>`\n        }\n    }, {\n        data: 'selected_requirements',\n        render: function (data) {\n            let result = ''\n            for (let i = 0; i < data.length; i++) {\n                let name = data[i][0]\n                let count = data[i][1]\n                if (display_req_without_formalisation !== \"True\" && count === 0) continue;\n                const searchQuery = `?command=search&col=2&q=%5C%22${name}%5C%22`\n                const color = count === 0 ? 'bg-light' : 'bg-info'\n                result += `<span class=\"badge ${color}\"><a href=\"${base_url}${searchQuery}\" target=\"_blank\" class=\"link-light text-muted\">${name} (${count})</a></span> `\n            }\n            return result;\n        }\n    }, {\n        data: 'result_requirements',\n        render: function (data) {\n            let result = ''\n            for (let i = 0; i < data.length; i++) {\n                let name = data[i][0]\n                let count = data[i][1]\n                const searchQuery = `?command=search&col=2&q=%5C%22${name}%5C%22`\n                const color = count === 0 ? 'bg-light' : 'bg-info'\n                result += `<span class=\"badge ${color}\"><a href=\"${base_url}${searchQuery}\" target=\"_blank\" class=\"link-light text-muted\">${name} (${count})</a></span> `\n            }\n            return result;\n        }\n    }\n]\n\nconst resultDataTableColumns = [\n    {\n        data: 'logLvl'\n    }, {\n        data: 'type'\n    }, {\n        data: 'shortDesc',\n        render: function (data) {\n            return `${data.replaceAll(\"\\n\", \"<br/>\")}`\n        }\n    }, {\n        data: 'longDesc',\n        render: function (data) {\n            return `${data.replaceAll(\"\\n\", \"<br/>\")}`\n        }\n    }\n]\n\nfunction update_search(string) {\n    sessionStorage.setItem('ultimateSearchString', string)\n    search_tree = SearchNode.fromQuery(string)\n}\n\nfunction evaluate_search(data) {\n    return search_tree.evaluate(data, [true, true, true])\n}\n\nfunction download_req(req_id) {\n    $.ajax({\n        type: 'GET',\n        url: '../api/ultimate/job/' + req_id + '?download=true',\n    }).done(function (data) {\n        download(data['job_id'] + '.json', JSON.stringify(data, null, 4));\n    }).fail(function (jqXHR, textStatus, errorThrown) {\n        alert(errorThrown + '\\n\\n' + jqXHR['responseText']);\n    })\n}\n\nfunction download(filename, text) {\n    let element = document.createElement('a');\n    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));\n    element.setAttribute('download', filename);\n\n    element.style.display = 'none';\n    document.body.appendChild(element);\n\n    element.click();\n\n    document.body.removeChild(element);\n}\n\n//# sourceURL=webpack://hanfor/../ultimate/static/ultimate.js?");

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
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"ultimate": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkhanfor"] = self["webpackChunkhanfor"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["commons"], () => (__webpack_require__("../ultimate/static/ultimate.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;