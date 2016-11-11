// Write your Javascript code.
$("#addRoomBtn").click(function () {
    $.ajax({
        type : "POST",
        url: "../Admin/AppendRoom",
        data: $("#addRoomForm").serialize(),
        success: function () {
            console.log("yep");
        }
    });
});