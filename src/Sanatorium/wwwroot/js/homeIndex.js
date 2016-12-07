
$(document)
    .ready(function() {
        $.ajax({
            type: "GET",
            url: "/Home/GetRoomsInfo/",
            success: function (data) {
                $("#totalRooms").text(data.total);
                $("#averagePrice").text(data.average);
                $("#totalProcedures").text(data.totalProc);
                $("#averageProcedurePrice").text(data.averageProc);
            }
        });
    });