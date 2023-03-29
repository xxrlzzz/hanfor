require('gasparesganga-jquery-loading-overlay')
require('bootstrap')
require('jquery-ui/ui/effects/effect-highlight')
require('../../static/js/bootstrap-tokenfield.js')
require('../../static/js/bootstrap-confirm-button')



$(document).ready(function () {
    load_all_jobs()

    $('#ultimate-job-refresh-btn').click(function () {
        load_all_jobs()
    });

    $('#ultimate-job-load-btn').click(function () {
        $.ajax({
            type: 'GET',
            url: '../api/ultimate/job/' + $('#ultimate-job-select').val(),
        }).done(function (data) {
            $('#ultimate-job-request-id').text(data['requestId'])
            $('#ultimate-job-request-time').text(data['request_time'])
            $('#ultimate-job-last-update').text(data['last_update'])
            $('#ultimate-job-request-status').text(data['status'])
        }).fail(function (jqXHR, textStatus, errorThrown) {
            alert(errorThrown + '\n\n' + jqXHR['responseText']);
        })
    });
})

function load_all_jobs() {
    $.ajax({
        type: 'GET',
        url: '../api/ultimate/jobs'
    }).done(function (data) {
        let select = $('#ultimate-job-select');
        select.empty();
        let jobs = data['data'];
        for (let i = 0; i < jobs.length; i++) {
            let displayed_name = jobs[i]['requestId'];
            displayed_name += ' ' + jobs[i]['request_time'];
            displayed_name += ' (' + jobs[i]['status'] + ')';
            select.append($('<option></option>').val(jobs[i]['requestId']).text(displayed_name));
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        alert(errorThrown + '\n\n' + jqXHR['responseText']);
    });
}