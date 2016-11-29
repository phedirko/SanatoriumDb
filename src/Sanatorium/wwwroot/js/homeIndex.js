$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: "/Home/GetLatestUpdates/",
        success: function (updates) {
            console.log("yep");
        }
    })


});