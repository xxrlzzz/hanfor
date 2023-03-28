require('gasparesganga-jquery-loading-overlay')
require('bootstrap')
require('jquery-ui/ui/effects/effect-highlight')
require('../../static/js/bootstrap-tokenfield.js')
require('../../static/js/bootstrap-confirm-button')

/*
$(document).ajaxStart(function () {
    $.LoadingOverlay('show')
})

$(document).ajaxStop(function () {
    $.LoadingOverlay('hide')
})*/

function addToResult(status, requestID, message) {
   let newRow = $("<tr></tr>");
   let col1 = $("<td>" + status + "</td>");
   let col2 = $("<td>" + requestID + "</td>");
   let col3 = $("<td>" + message + "</td>");
   newRow.append(col1,col2,col3).prependTo("#result");
}

$(document).ready(function () {

    $('#btnPush').click(function () {
        $('#btnPush').text("Processing request")
        $.ajax({
            type: 'GET',
            url: '../api/tools/req_file',
        }).done(function (data) {
            console.log(data)
            $.ajax({
                type: 'POST',
                url: '../api/ultimate/job',
                data: data
            }).done(function (data) {
                $('#requestID').val(data['requestId']);
                addToResult(data['status'], data['requestId'], 'Post');
                $('#btnPush').text("Send Request")
            }).fail(function (jqXHR, textStatus, errorThrown) {
                alert(errorThrown + '\n\n' + jqXHR['responseText'])
            })
        }).fail(function (jqXHR, textStatus, errorThrown) {
            alert(errorThrown + '\n\n' + jqXHR['responseText'])
        })


    })

    $('#btnGet').click(function () {
        $.ajax({
            type: 'GET',
            url: '../api/ultimate/job/' + $('#requestID').val(),
        }).done(function (data) {
            addToResult(data['status'], data['requestId'], JSON.stringify(data['result']));
        }).fail(function (jqXHR, textStatus, errorThrown) {
            alert(errorThrown + '\n\n' + jqXHR['responseText'])
        })
    })

    $('#btnDelete').click(function () {
        $.ajax({
            type: 'DELETE',
            url: '../api/ultimate/job/' + $('#requestID').val(),
        }).done(function (data) {
            addToResult(data['status'], data['requestId'], JSON.stringify(data['result']));
        }).fail(function (jqXHR, textStatus, errorThrown) {
            alert(errorThrown + '\n\n' + jqXHR['responseText'])
        })
    })
    $('#btnReq').click(function () {

    })
})