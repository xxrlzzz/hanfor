<<<<<<< HEAD
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

/***/ "./js/tags.js":
/*!********************!*\
  !*** ./js/tags.js ***!
  \********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("/* provided dependency */ var $ = __webpack_require__(/*! jquery */ \"./node_modules/jquery/dist/jquery.js\");\n__webpack_require__(/*! gasparesganga-jquery-loading-overlay */ \"./node_modules/gasparesganga-jquery-loading-overlay/src/loadingoverlay.js\");\n__webpack_require__(/*! bootstrap */ \"./node_modules/bootstrap/dist/js/bootstrap.esm.js\");\n__webpack_require__(/*! datatables.net-bs5 */ \"./node_modules/datatables.net-bs5/js/dataTables.bootstrap5.js\");\n__webpack_require__(/*! jquery-ui/ui/widgets/autocomplete */ \"./node_modules/jquery-ui/ui/widgets/autocomplete.js\");\n__webpack_require__(/*! jquery-ui/ui/effects/effect-highlight */ \"./node_modules/jquery-ui/ui/effects/effect-highlight.js\");\n__webpack_require__(/*! ./bootstrap-tokenfield.js */ \"./js/bootstrap-tokenfield.js\");\n__webpack_require__(/*! awesomplete */ \"./node_modules/awesomplete/awesomplete.js\");\n__webpack_require__(/*! awesomplete/awesomplete.css */ \"./node_modules/awesomplete/awesomplete.css\");\n__webpack_require__(/*! datatables.net-colreorder-bs5 */ \"./node_modules/datatables.net-colreorder-bs5/js/colReorder.bootstrap5.js\");\n__webpack_require__(/*! ./bootstrap-confirm-button */ \"./js/bootstrap-confirm-button.js\");\n\nconst autosize = __webpack_require__(/*! autosize */ \"./node_modules/autosize/dist/autosize.js\");\nconst {SearchNode} = __webpack_require__(/*! ./datatables-advanced-search.js */ \"./js/datatables-advanced-search.js\");\nconst {Modal} = __webpack_require__(/*! bootstrap */ \"./node_modules/bootstrap/dist/js/bootstrap.esm.js\");\nlet tag_search_string = sessionStorage.getItem('tag_search_string');\nlet search_autocomplete = [\":AND:\", \":OR:\", \":NOT:\", \":COL_INDEX_00:\", \":COL_INDEX_01:\", \":COL_INDEX_02:\",];\n\n$(document).ready(function () {\n    // Prepare and load the tags table.\n    let tagsTable = $('#tags-table');\n    let tagsDataTable = tagsTable.DataTable({\n        \"paging\": true,\n        \"stateSave\": true,\n        \"pageLength\": 50,\n        \"responsive\": true,\n        \"lengthMenu\": [[10, 50, 100, 500, -1], [10, 50, 100, 500, \"All\"]],\n        \"dom\": 'rt<\"container\"<\"row\"<\"col-md-6\"li><\"col-md-6\"p>>>',\n        \"ajax\": \"api/tag/gets\",\n        \"deferRender\": true,\n        \"columns\": [{\n            \"data\": \"name\",\n            \"render\": function (data, type, row, meta) {\n                result = '<a class=\"modal-opener\" href=\"#\">' + data + '</span></br>';\n                return result;\n            }\n        }, {\n            \"data\": \"description\",\n            \"render\": function (data, type, row, meta) {\n                result = '<div class=\"white-space-pre\">' + data + '</div>';\n                return result;\n            }\n\n        }, {\n            \"data\": \"used_by\",\n            \"render\": function (data, type, row, meta) {\n                let result = '';\n                $(data).each(function (id, name) {\n                    if (name.length > 0) {\n                        search_query = '?command=search&col=2&q=%5C%22' + name + '%5C%22';\n                        result += '<span class=\"badge bg-info\" style=\"background-color: ' + row.color + '\">' + '<a href=\"' + base_url + search_query + '\" target=\"_blank\">' + name + '</a>' + '</span> ';\n                    }\n                });\n                if (data.length > 1 && result.length > 0) {\n                    const search_all = '?command=search&col=5&q=' + row.name;\n                    result += '<span class=\"badge bg-info\" style=\"background-color: #4275d8\">' + '<a href=\"./' + search_all + '\" target=\"_blank\">Show all</a>' + '</span> ';\n                }\n                return result;\n            }\n        }, {\n            \"data\": \"internal\",\n            \"render\": function (data, type, row, meta) {\n                result = '<input class=\"form-check-input internal-checkbox\" type=\"checkbox\" ' + (data ? 'checked' : '') + '>'\n                return result;\n            }\n        }, {\n            \"data\": \"used_by\", \"visible\": false, \"searchable\": false, \"render\": function (data, type, row, meta) {\n                result = '';\n                $(data).each(function (id, name) {\n                    if (name.length > 0) {\n                        if (result.length > 1) {\n                            result += ', '\n                        }\n                        result += name;\n                    }\n                });\n                return result;\n            }\n        },],\n        initComplete: function () {\n            $('#search_bar').val(tag_search_string);\n            update_search();\n\n            // Enable Hanfor specific table filtering.\n            $.fn.dataTable.ext.search.push(function (settings, data, dataIndex) {\n                // data contains the row. data[0] is the content of the first column in the actual row.\n                // Return true to include the row into the data. false to exclude.\n                return evaluate_search(data);\n            });\n            this.api().draw();\n        }\n    });\n    tagsDataTable.column(4).visible(false);\n    new $.fn.dataTable.ColReorder(tagsDataTable, {});\n\n    let search_bar = $(\"#search_bar\");\n    // Bind big custom searchbar to search the table.\n    search_bar.keypress(function (e) {\n        if (e.which === 13) { // Search on enter.\n            update_search();\n            tagsDataTable.draw();\n        }\n    });\n\n    new Awesomplete(search_bar[0], {\n        filter: function (text, input) {\n            let result = false;\n            // If we have an uneven number of \":\"\n            // We check if we have a match in the input tail starting from the last \":\"\n            if ((input.split(\":\").length - 1) % 2 === 1) {\n                result = Awesomplete.FILTER_CONTAINS(text, input.match(/[^:]*$/)[0]);\n            }\n            return result;\n        }, item: function (text, input) {\n            // Match inside \":\" enclosed item.\n            return Awesomplete.ITEM(text, input.match(/(:)([\\S]*$)/)[2]);\n        }, replace: function (text) {\n            // Cut of the tail starting from the last \":\" and replace by item text.\n            const before = this.input.value.match(/(.*)(:(?!.*:).*$)/)[1];\n            this.input.value = before + text;\n        }, list: search_autocomplete, minChars: 1, autoFirst: true\n    });\n\n    // Add listener for tag link to modal.\n    tagsTable.find('tbody').on('click', 'a.modal-opener', function (event) {\n        // prevent body to be scrolled to the top.\n        event.preventDefault();\n\n        // Get row data\n        let data = tagsDataTable.row($(event.target).parent()).data();\n        let row_id = tagsDataTable.row($(event.target).parent()).index();\n\n        // Prepare tag modal\n        let tag_modal_content = $('.modal-content');\n        //$('#tag_modal').modal('show');\n        Modal.getOrCreateInstance($('#tag_modal')).show();\n        $('#modal_associated_row_index').val(row_id);\n\n        // Meta information\n        $('#tag_name_old').val(data.name);\n        $('#occurences').val(data.used_by);\n\n        // Visible information\n        $('#tag_modal_title').html('Tag: ' + data.name);\n        $('#tag_name').val(data.name);\n        $('#tag_color').val(data.color);\n        $('#tag-description').val(data.description);\n        $('#tag_internal').prop(\"checked\", data.internal);\n\n        tag_modal_content.LoadingOverlay('hide');\n    });\n\n    // Store changes on tag on save.\n    $('#save_tag_modal').click(function () {\n        store_tag(tagsDataTable);\n    });\n\n    tagsDataTable.on('click', '.internal-checkbox', function (event) {\n        event.preventDefault()\n\n        let checkbox = event.currentTarget\n        let data = tagsDataTable.row(checkbox.parentNode).data()\n\n        $.ajax({\n            type: 'POST',\n            url: 'api/tag/update',\n            data: {\n                name: data.name,\n                name_old: data.name,\n                occurences: data.used_by,\n                color: data.color,\n                description: data.description,\n                internal: checkbox.checked\n            },\n            success: function (response) {\n                if (response['success'] === false) {\n                    alert(response['errormsg'])\n                    return\n                }\n\n                checkbox.checked = response.data.internal\n                data.internal = response.data.internal\n            }\n        })\n    })\n\n    // $('.delete_tag').confirmation({\n    //     rootSelector: '.delete_tag'\n    // }).click(function () {\n    //     delete_tag($(this).attr('name'));\n    // });\n\n    $('.delete_tag').bootstrapConfirmButton({\n        onConfirm: function () {\n            delete_tag($(this).attr('name'))\n        }\n    })\n\n    autosize($('#tag-description'));\n\n    $('#tag_modal').on('shown.bs.modal', function (e) {\n        autosize.update($('#tag-description'));\n    });\n\n    $('.clear-all-filters').click(function () {\n        $('#search_bar').val('').effect(\"highlight\", {color: 'green'}, 500);\n        update_search();\n        tagsDataTable.draw();\n    });\n\n    $('#add-standard-tags').click(function () {\n        $.post(\"api/tag/add_standard\",\n            {},\n            function (data) {\n            location.reload();\n                })\n    });\n});\n\n/**\n * Update the search expression tree.\n */\nfunction update_search() {\n    tag_search_string = $('#search_bar').val().trim();\n    sessionStorage.setItem('tag_search_string', tag_search_string);\n    search_tree = SearchNode.fromQuery(tag_search_string);\n}\n\n\nfunction evaluate_search(data) {\n    return search_tree.evaluate(data, [true, true, true]);\n}\n\n\n/**\n * Store the currently active (in the modal) tag.\n * @param tagsDataTable\n */\nfunction store_tag(tagsDataTable) {\n    let tag_modal_content = $('.modal-content');\n    tag_modal_content.LoadingOverlay('show');\n\n    // Get data.\n    let tag_name = $('#tag_name').val();\n    let tag_name_old = $('#tag_name_old').val();\n    let occurences = $('#occurences').val();\n    let tag_color = $('#tag_color').val();\n    let associated_row_id = parseInt($('#modal_associated_row_index').val());\n    let tag_description = $('#tag-description').val();\n    let tag_internal = $('#tag_internal').prop(\"checked\");\n\n    // Store the tag.\n    $.post(\"api/tag/update\", {\n            name: tag_name,\n            name_old: tag_name_old,\n            occurences: occurences,\n            color: tag_color,\n            description: tag_description,\n            internal: tag_internal\n        }, // Update tag table on success or show an error message.\n        function (data) {\n            tag_modal_content.LoadingOverlay('hide', true);\n            if (data['success'] === false) {\n                alert(data['errormsg']);\n            } else {\n                if (data.rebuild_table) {\n                    location.reload();\n                } else {\n                    tagsDataTable.row(associated_row_id).data(data.data).draw();\n                    $('#tag_modal').modal('hide');\n                }\n            }\n        });\n}\n\nfunction delete_tag(name) {\n    let tag_modal_content = $('.modal-content');\n    tag_modal_content.LoadingOverlay('show');\n\n    let tag_name = $('#tag_name').val();\n    let occurences = $('#occurences').val();\n    $.ajax({\n        type: \"DELETE\",\n        url: \"api/tag/del_tag\",\n        data: {name: tag_name, occurences: occurences},\n        success: function (data) {\n            tag_modal_content.LoadingOverlay('hide', true);\n            if (data['success'] === false) {\n                alert(data['errormsg']);\n            } else {\n                if (data.rebuild_table) {\n                    location.reload();\n                } else {\n                    tagsDataTable.row(associated_row_id).data(data.data).draw();\n                    //$('#tag_modal').modal('hide');\n                    Modal.getOrCreateInstance(document.getElementById('tag_modal')).hide();\n                }\n            }\n        }\n    });\n}\n\n//# sourceURL=webpack://hanfor/./js/tags.js?");

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
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
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
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"tags": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["commons"], () => (__webpack_require__("./js/tags.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
=======
(()=>{var e,a={692:(e,a,t)=>{var n=t(9755);t(1388),t(4712),t(3333),t(2993),t(944),t(3889),t(7312),t(2106),t(9570),t(7175);const r=t(9367),{SearchNode:o}=t(3024),{Modal:l}=t(4712);let c=sessionStorage.getItem("tag_search_string"),i=[":AND:",":OR:",":NOT:",":COL_INDEX_00:",":COL_INDEX_01:",":COL_INDEX_02:"];function s(){c=n("#search_bar").val().trim(),sessionStorage.setItem("tag_search_string",c),search_tree=o.fromQuery(c)}function d(e){let a=n(".modal-content");a.LoadingOverlay("show");let t=n("#tag_name").val(),r=n("#occurences").val();n.ajax({type:"DELETE",url:"api/tag/del_tag",data:{name:t,occurences:r},success:function(e){a.LoadingOverlay("hide",!0),!1===e.success?alert(e.errormsg):e.rebuild_table?location.reload():(tagsDataTable.row(associated_row_id).data(e.data).draw(),l.getOrCreateInstance(document.getElementById("tag_modal")).hide())}})}n(document).ready((function(){let e=n("#tags-table"),a=e.DataTable({paging:!0,stateSave:!0,pageLength:50,responsive:!0,lengthMenu:[[10,50,100,500,-1],[10,50,100,500,"All"]],dom:'rt<"container"<"row"<"col-md-6"li><"col-md-6"p>>>',ajax:"api/tag/gets",deferRender:!0,columns:[{data:"name",render:function(e,a,t,n){return result='<a class="modal-opener" href="#">'+e+"</span></br>",result}},{data:"description",render:function(e,a,t,n){return result='<div class="white-space-pre">'+e+"</div>",result}},{data:"used_by",render:function(e,a,t,r){let o="";if(n(e).each((function(e,a){a.length>0&&(search_query="?command=search&col=2&q=%5C%22"+a+"%5C%22",o+='<span class="badge bg-info" style="background-color: '+t.color+'"><a href="'+base_url+search_query+'" target="_blank">'+a+"</a></span> ")})),e.length>1&&o.length>0){const e="?command=search&col=5&q=%5C%22"+t.name+"%5C%22";o+='<span class="badge bg-info" style="background-color: #4275d8"><a href="./'+e+'" target="_blank">Show all</a></span> '}return o}},{data:"internal",render:function(e,a,t,n){return result='<input class="form-check-input internal-checkbox" type="checkbox" '+(e?"checked":"")+">",result}},{data:"used_by",visible:!1,searchable:!1,render:function(e,a,t,r){return result="",n(e).each((function(e,a){a.length>0&&(result.length>1&&(result+=", "),result+=a)})),result}}],initComplete:function(){n("#search_bar").val(c),s(),n.fn.dataTable.ext.search.push((function(e,a,t){return function(e){return search_tree.evaluate(e,[!0,!0,!0])}(a)})),this.api().draw()}});a.column(4).visible(!1),new n.fn.dataTable.ColReorder(a,{});let t=n("#search_bar");t.keypress((function(e){13===e.which&&(s(),a.draw())})),new Awesomplete(t[0],{filter:function(e,a){let t=!1;return(a.split(":").length-1)%2==1&&(t=Awesomplete.FILTER_CONTAINS(e,a.match(/[^:]*$/)[0])),t},item:function(e,a){return Awesomplete.ITEM(e,a.match(/(:)([\S]*$)/)[2])},replace:function(e){const a=this.input.value.match(/(.*)(:(?!.*:).*$)/)[1];this.input.value=a+e},list:i,minChars:1,autoFirst:!0}),e.find("tbody").on("click","a.modal-opener",(function(e){e.preventDefault();let t=a.row(n(e.target).parent()).data(),r=a.row(n(e.target).parent()).index(),o=n(".modal-content");l.getOrCreateInstance(n("#tag_modal")).show(),n("#modal_associated_row_index").val(r),n("#tag_name_old").val(t.name),n("#occurences").val(t.used_by),n("#tag_modal_title").html("Tag: "+t.name),n("#tag_name").val(t.name),n("#tag_color").val(t.color),n("#tag-description").val(t.description),n("#tag_internal").prop("checked",t.internal),o.LoadingOverlay("hide")})),n("#save_tag_modal").click((function(){!function(e){let a=n(".modal-content");a.LoadingOverlay("show");let t=n("#tag_name").val(),r=n("#tag_name_old").val(),o=n("#occurences").val(),l=n("#tag_color").val(),c=parseInt(n("#modal_associated_row_index").val()),i=n("#tag-description").val(),s=n("#tag_internal").prop("checked");n.post("api/tag/update",{name:t,name_old:r,occurences:o,color:l,description:i,internal:s},(function(t){a.LoadingOverlay("hide",!0),!1===t.success?alert(t.errormsg):t.rebuild_table?location.reload():(e.row(c).data(t.data).draw(),n("#tag_modal").modal("hide"))}))}(a)})),a.on("click",".internal-checkbox",(function(e){e.preventDefault();let t=e.currentTarget,r=a.row(t.parentNode).data();n.ajax({type:"POST",url:"api/tag/update",data:{name:r.name,name_old:r.name,occurences:r.used_by,color:r.color,description:r.description,internal:t.checked},success:function(e){!1!==e.success?(t.checked=e.data.internal,r.internal=e.data.internal):alert(e.errormsg)}})})),n(".delete_tag").bootstrapConfirmButton({onConfirm:function(){d(n(this).attr("name"))}}),r(n("#tag-description")),n("#tag_modal").on("shown.bs.modal",(function(e){r.update(n("#tag-description"))})),n(".clear-all-filters").click((function(){n("#search_bar").val("").effect("highlight",{color:"green"},500),s(),a.draw()})),n("#add-standard-tags").click((function(){n.post("api/tag/add_standard",{},(function(e){location.reload()}))}))}))}},t={};function n(e){var r=t[e];if(void 0!==r)return r.exports;var o=t[e]={id:e,exports:{}};return a[e].call(o.exports,o,o.exports,n),o.exports}n.m=a,e=[],n.O=(a,t,r,o)=>{if(!t){var l=1/0;for(d=0;d<e.length;d++){for(var[t,r,o]=e[d],c=!0,i=0;i<t.length;i++)(!1&o||l>=o)&&Object.keys(n.O).every((e=>n.O[e](t[i])))?t.splice(i--,1):(c=!1,o<l&&(l=o));if(c){e.splice(d--,1);var s=r();void 0!==s&&(a=s)}}return a}o=o||0;for(var d=e.length;d>0&&e[d-1][2]>o;d--)e[d]=e[d-1];e[d]=[t,r,o]},n.n=e=>{var a=e&&e.__esModule?()=>e.default:()=>e;return n.d(a,{a}),a},n.d=(e,a)=>{for(var t in a)n.o(a,t)&&!n.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:a[t]})},n.o=(e,a)=>Object.prototype.hasOwnProperty.call(e,a),n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.j=81,(()=>{var e={81:0};n.O.j=a=>0===e[a];var a=(a,t)=>{var r,o,[l,c,i]=t,s=0;if(l.some((a=>0!==e[a]))){for(r in c)n.o(c,r)&&(n.m[r]=c[r]);if(i)var d=i(n)}for(a&&a(t);s<l.length;s++)o=l[s],n.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return n.O(d)},t=self.webpackChunkhanfor=self.webpackChunkhanfor||[];t.forEach(a.bind(null,0)),t.push=a.bind(null,t.push.bind(t))})(),n.nc=void 0;var r=n.O(void 0,[351],(()=>n(692)));r=n.O(r)})();
>>>>>>> 9da79d41b5195c72f1c9c547605bfa4e931920e0
