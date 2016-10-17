$(document).ready(function () {
    getLocations();
});

var getLocations = function () {
    $.ajax({
        url: '/getLocations',
        error: function () {
            $('#info').html('<p>An error has occurred</p>');
        },
        dataType: 'json',
        success: function (data) {
            fillTable(data);
        },
        type: 'GET'
    });
}

var getNearest = function (lat, lon) {
    $.ajax({
        data: {'lat': lat, 'lon' : lon},
        url: '/location/getNearestLocation',
        error: function () {
            $('#info').html('<p>An error has occurred</p>');
        },
        async: false,
        dataType: 'json',
        success: function (data) {
            fillTable(data);
        },
        type: 'POST'
    });
}

$('#btnLocation').click(function () {
    $.ajax({
        url: "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyBTiJbxLAMVJVQWiFJOGgfTFxFdDJiPesA",
        error: function () {
            $('#info').html('<p>An error has occurred</p>');
        },
        async: false,
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            //fillTable(data);
            console.log(data);
            console.dir(data);
            console.log(data.location.lat);
            getNearest(data.location.lat, data.location.lng);
        },
        type: 'POST'
    });
});

$('#btnSubmit').click(function () {
    var data = {
        name: $("#name").val(),
        category: $("#category").val(),
        latitude: $("#latitude").val(),
        longitude: $("#longitude").val()
    }
    $.ajax({
        url: '/addLocation',
        data: data,
        error: function () {
            $('#info').html('<p>An error has occurred</p>');
        },
        dataType: 'json',
        success: function (data) {
            fillTable(data);
        },
        type: 'POST'
    });
});

function fillTable(data) {
    $("#tblLocations tbody").empty();
    for (var i = 0; i < data.length; i++) {
        fillRow(data[i]);
    }
}

function fillRow(rowData) {
    var row = $("<tr />")
    $("#tblLocations tbody").append(row);
    row.append($("<td>" + rowData.name + "</td>"));
    row.append($("<td>" + rowData.category + "</td>"));
    if (rowData.loc.coordinates != null) {
        row.append($("<td>" + rowData.loc.coordinates[1] + " / " + rowData.loc.coordinates[0] + "</td>"));
    }
}

