require('../css/simulator-modal.css')
// require('datatables.net-bs5');
// require('datatables.net-select-bs5');
// require('datatables.net-colreorder-bs5');
const {Modal} = require('bootstrap')
// const BpmnViewer = require("bpmn-js/lib/NavigatedViewer").default;
const BpmnViewer = require("bpmn-js/lib/Viewer").default;
// features/toggle-mode/viewer

// const TokenSimulationModule = require("./mdist/viewer").default;
// const TokenSimulationModule2 = require("./mdist/viewer");
const TokenSimulationModule3 = require('bpmn-js-token-simulation/lib/viewer').default;
// require("./mdist/viewer");
// const TokenSimulationModule = require("bpmn-js-token-simulation/lib/features/toggle-mode/viewer/index").default;
// const TokenSimulationModule = require('bpmn-js-token-simulation/lib/viewer');
let utils = require('./hanfor-utils');
const {Chart, registerables} = require('chart.js')
const annotationPlugin = require('chartjs-plugin-annotation/dist/chartjs-plugin-annotation')

Chart.register(...registerables, annotationPlugin)

function init_bpmn_modal(data, reqs) {

    const bpmn_modal = $(data['html'])
    
    Modal.getOrCreateInstance(bpmn_modal).show()

    
    bpmn_modal[0].addEventListener('hidden.bs.modal', function () {
        $('#bpmn_modal').remove()
    })
    setTimeout(()=>{
        init_canvas();
        load_datatable(reqs);
    },1000);
}

function init_canvas() {
  
    let viewer = new BpmnViewer({
        container: '#chart-canvas',
        additionalModules: [
            TokenSimulationModule3
        ]
    });
    console.log(viewer);

    let dropZone = $("#drop-zone")[0];

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, preventDefaults, false)
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }


    // 高亮拖拽区域
    ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, highlight, false)
    });

    ['dragleave', 'drop'].forEach(eventName => {
    dropZone.addEventListener(eventName, unhighlight, false)
    });

    function highlight(e) {
        dropZone.classList.add('highlight');
    }

    function unhighlight(e) {
        dropZone.classList.remove('highlight');
    }


    // 处理文件拖拽
    dropZone.addEventListener('drop', handleDrop, false);

    function handleDrop(e) {
        var dt = e.dataTransfer;
        var files = dt.files;

        handleFiles(files);
    }

    // 读取文件并渲染BPMN图
    function handleFiles(files) {
        ([...files]).forEach(uploadFile);
    }

    function uploadFile(file) {
        var reader = new FileReader();
        reader.onload = function(e) {
            var xml = e.target.result;
            viewer.importXML(xml).catch(err => {
                return console.error('无法导入BPMN图:', err);
            }).then(()=> {
                console.log('BPMN图渲染成功!2');
                viewer.get('canvas').zoom('fit-viewport');
            });
        };
        reader.readAsText(file);
    }
  
}

/**
 * Load requirements datatable definitions. Trigger build of a fresh requirement datatable.
 */
function load_datatable(reqs) {
    // Initialize the Column defs.
    // First set the static colum definitions.
    let columnDefs = [{
        "orderable": false, "className": 'select-checkbox', "targets": [0], "data": null, "defaultContent": ""
    }, {
        "targets": [1], "data": "pos"
    }, {
        "targets": [2], "data": "id", "render": function (data) {
            return '<a href="#">' + utils.escapeHtml(data) + '</a>';
        }
    }, {
        "targets": [3], "data": "desc", "render": function (data) {
            return '<div class="white-space-pre">' + utils.escapeHtml(data) + '</div>';
        }
    },
     {
        "targets": [4], "data": "formal", "render": function (data, type, row) {
            let result = '';
            if (row.formal.length > 0) {
                $(data).each(function (id, formalization) {
                    if (formalization.length > 0) {
                        result += '<div class="white-space-pre">' + utils.escapeHtml(formalization) + '</div>';
                    }
                });
            }
            return result;
        }
    }
];

    init_datatable(columnDefs, reqs);
}


/**
 * Fetch requirements from hanfor api and build the requirements table.
 * Apply search queries to table
 * Bind button/links to events.
 * @param columnDefs predefined columDefs (https://datatables.net/reference/option/columnDefs)
 */
function init_datatable(columnDefs, ids) {
    console.log('init_datatable' ,columnDefs);
    let table = $('.modal.show #bpmn_requirements_table').DataTable({
        "language": {
            "emptyTable": "Loading data."
        },
        // "paging": true,
        "stateSave": true,
        "select": {
            style: 'os', selector: 'td:first-child'
        },
        "order": [[1, "asc"]],
        "bDestroy": true,    
        "pageLength": 50,
        "lengthMenu": [[10, 50, 100, 500, -1], [10, 50, 100, 500, "All"]],
        "dom": 'rt<"container"<"row"<"col-md-6"li><"col-md-6"p>>>',
        "ajax": {
            url: "api/req/get_by_id",
            data: { 
                "ids": ids.join(',')
            }
        },
        // "ajax": "api/req/gets",
        "deferRender": true,
        "columnDefs": columnDefs,
        "createdRow": function (row, data) {
            if (data['type'] === 'Heading') {
                $(row).addClass('bg-primary');
            }
            if (data['type'] === 'Information') {
                $(row).addClass('table-info');
            }
            if (data['type'] === 'Requirement') {
                $(row).addClass('table-warning');
            }
            if (data['type'] === 'not set') {
                $(row).addClass('table-light');
            }
        },
        "infoCallback": function (settings, start, end, max, total) {
            // let api = this.api();
            // let pageInfo = api.page.info();

            // $('#clear-all-filters-text').html("Showing " + total + "/" + pageInfo.recordsTotal + ". Clear all.");

            // let result = "Showing " + start + " to " + end + " of " + total + " entries";
            // result += " (filtered from " + pageInfo.recordsTotal + " total entries).";

            // return result;
            // return "more info";
        },
        "initComplete": function () {
            // $('#search_bar').val(req_search_string);
            // $('#type-filter-input').val(filter_type_string);
            // $('#tag-filter-input').val(filter_tag_string);
            // $('#status-filter-input').val(filter_status_string);

            // let requirements_table = this.api();
            // bind_requirement_id_to_modals(requirements_table);
            // init_datatable_manipulators(requirements_table);
            // init_ultimate_requirements_table_connection(requirements_table);

            // utils.process_url_query(get_query);
            // update_search();
            // update_filter();

            // // Enable Hanfor specific requirements table filtering.
            // $.fn.dataTable.ext.search.push(function (settings, data) {
            //     // data contains the row. data[0] is the content of the first column in the actual row.
            //     // Return true to include the row into the data. false to exclude.
            //     return evaluate_search(data);
            // });

            // this.api().draw();

        }
    });
    // new $.fn.dataTable.ColReorder(table, {});
}


module.exports.init_bpmn_modal = init_bpmn_modal