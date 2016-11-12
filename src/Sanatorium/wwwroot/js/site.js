// Write your Javascript code.
$("#addRoomBtn").click(function () {
    $.ajax({
        type: "POST",
        data: $("#addRoomForm").serialize(),
        url: "../Admin/AppendRoom/",       
        success: function (room) {
            $('#roomTableBody').append('<tr>'+
                '<td class="collapsing">Комната '+
                    room.roomNumber+
                '</td>'+
                '<td>'+
                'Этаж '+room.stageNumber+',вместимость '+room.capacity+',цена '+room.dailyPrice+
                '</td>'+
                '<td class="right aligned collapsing">Какие то действия</td>'+
                '</tr>');
                
            $('#roomAddedDimmer').dimmer('show');
        }
    });
});
$("#addProcedureBtn").click(function () {
    $.ajax({
        type: "POST",
        data: $("#addProcedureForm").serialize(),
        url: "../Nurse/AppendProcedure/",
        success: function (procedure) {
            $('#procedureTableBody').append('<tr>' +
                '<td class="collapsing">' +
                    procedure.name+
                '</td>' +
                '<td class="right aligned collapsing">' +
                procedure.price + 
                '</td>' +
                '<td>Какие то действия</td>' +
                '</tr>');
            $('#name').val('');
            $('#price').val('');
            $('#procedureAddedDimmer').dimmer('show');
        }
    });
});