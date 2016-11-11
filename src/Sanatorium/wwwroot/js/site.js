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
$('#test').click(function () {

    $('#roomAddedDimmer').dimmer('show');
});