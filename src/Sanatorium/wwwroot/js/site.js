// Write your Javascript code.
$("#addRoomBtn").click(function () {
    $.ajax({
        url: "../Admin/CreateRoom",
        data: $("#addRoomForm").serialize(),
        success: function () {
            console.log("yep");
        }
    });
});