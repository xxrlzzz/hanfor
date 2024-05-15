const {init_bpmn_modal} = require('./bpmn-modal.js')

const {Modal} = require('bootstrap')

function init_bpmn_tab() {
    console.log('init bpmn tab');
    const name_input = $('#simulator-tab-name-input')
    const simulator_select = $('#simulator-tab-select')
    const create_btn = $('#simulator-tab-create-btn')
    const delete_btn = $('#simulator-tab-delete-btn')
    const start_btn = $('#bpmn-tab-start-btn')
    const requirements_table = $('#requirements_table')

    $.ajax({
        type: 'GET', url: 'simulator', async: false, data: { // TODO: Allow async.
            command: 'get_simulators'
        }, success: function (response) {
            if (response.success === false) {
                alert(response.errormsg)
                return
            }

            update_simulator_select(simulator_select, response.data)
        }
    })

    create_btn.click(function () {
        $.ajax({
            type: 'POST', url: 'simulator', async: false, data: { // TODO: Allow async.
                command: 'create_simulator',
                simulator_name: name_input.val() || 'unnamed',
                requirement_ids: JSON.stringify(get_selected_requirement_ids(requirements_table))
            }, success: function (response) {
                if (response.success === false) {
                    alert(response.errormsg)
                    return
                }

                update_simulator_select(simulator_select, response.data, true)
            }
        })
    })

    delete_btn.click(function () {
        $.ajax({
            type: 'DELETE', url: 'simulator', async: false, data: { // TODO: Allow async.
                command: 'delete_simulator', simulator_id: simulator_select.val()
            }, success: function (response) {
                if (response.success === false) {
                    alert(response.errormsg)
                    return
                }

                update_simulator_select(simulator_select, response.data)
            }
        });
    });

    start_btn.click(function () {
        let selectedIds = get_selected_requirement_ids(requirements_table)
        $.ajax({
            // TODO: Allow async.
            type: 'GET', url: 'bpmn', async: false, data: {
                command: 'start_bpmn', 
                requirement_ids: JSON.stringify(selectedIds)
            }, success: function (response) {
                if (response['success'] === false) {
                    alert(response['errormsg'])
                    return
                }
                console.log(response.data);

                init_bpmn_modal(response.data, selectedIds);
            }
        })
    })
}

function get_selected_requirement_ids(requirements_table) {
    let result = []

    requirements_table.DataTable().rows({selected: true}).every(function () {
        result.push(this.data()['id'])
    })

    return result
}

exports.init_bpmn_tab = init_bpmn_tab