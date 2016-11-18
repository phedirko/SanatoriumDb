// Write your Javascript code.
var rooms = [];
var patients = [];
$(document)
    .ready(function() {
        $("#adminRegisterGender").dropdown();
        $("#patientsSettle").dropdown();
        $("#roomSettle").dropdown();
        $(".ui.dropdown").dropdown();
        switch (window.location.pathname) {
            case "/Admin":
             $.ajax({
            url: "../Admin/GetRooms/",
            success: function(allRooms) {
                $(allRooms)
                    .each(function(index, element) {
                        rooms.push(element);
                    });
                //  console.log(rooms);
            }
             });
                break;
            case "/Nurse":
                console.log("nurse");
                break;
        default:
        }       
       
    });
$("#addRoomBtn")
    .click(function() {
        $.ajax({
            type: "POST",
            data: $("#addRoomForm").serialize(),
            url: "../Admin/AppendRoom/",
            success: function(room) {
                $("#roomTableBody")
                    .append("<tr>" +
                        '<td class="collapsing">Комната ' +
                        room.roomNumber +
                        "</td>" +
                        "<td>" +
                        "Этаж " +
                        room.stageNumber +
                        ",вместимость " +
                        room.capacity +
                        ",цена " +
                        room.dailyPrice +
                        "</td>" +
                        '<td class="right aligned collapsing">Какие то действия</td>' +
                        "</tr>");
                $("#tableDimmerIcon").removeClass("remove circle");
                $("#tableDimmerIcon").addClass("add circle");
                $("#tableDimmerText").text("Room successively added");
                $("#tableDimmer").dimmer("show");
            }
        });
    });
$("#addProcedureBtn")
    .click(function() {
        $.ajax({
            type: "POST",
            data: $("#addProcedureForm").serialize(),
            url: "../Nurse/AppendProcedure/",
            success: function(procedure) {
                $("#procedureTableBody")
                    .append("<tr>" +
                        '<td class="collapsing">' +
                        procedure.name +
                        "</td>" +
                        '<td class="right aligned collapsing">' +
                        procedure.price +
                        "</td>" +
                        "<td>Какие то действия</td>" +
                        "</tr>");
                $("#name").val("");
                $("#price").val("");
                $("#procedureAddedDimmer").dimmer("show");
            }
        });
    });
$(".updateBtn")
    .click(function(e) {
        var id = e.target.id;
        $("#updateRoomModal")
            .modal({
                blurring: true
            })
            .modal({
                closable: true,
                onDeny: function() {
                    return true;
                },
                onApprove: function() {
                    $.ajax({
                        type: "POST",
                        data: $("#updateRoomForm").serialize(),
                        url: "../Admin/UpdateRoom?roomId=" + id,
                        success: function(updateRoom) {
                            $("#tdRoomNumber" + id).text("Room " + updateRoom.roomNumber);
                            $("#tdRoomInfo" + id)
                                .text("Stage " +
                                    updateRoom.stageNumber +
                                    ",capacity " +
                                    updateRoom.capacity +
                                    ",daily price " +
                                    updateRoom.dailyPrice);
                        }
                    });
                }
            })
            .modal("setting", "transition", "scale")
            .modal("show");

    });
$(".removeBtn")
    .click(function(e) {
        var id = e.target.id;
        $("#removeRoomModal")
            .modal({
                blurring: true
            })
            .modal({
                closable: true,
                onDeny: function() {
                    return true;
                },
                onApprove: function() {
                    $.ajax({
                        type: "POST",
                        data: { roomId: id },
                        url: "../Admin/RemoveRoom/",
                        success: function() {
                            $("#Room" + id).remove();
                            $("#tableDimmerIcon").removeClass("add circle");
                            $("#tableDimmerIcon").addClass("remove circle");
                            $("#tableDimmerText").text("Room successively deleted");
                            $("#tableDimmer").dimmer("show");
                        }
                    });
                }
            })
            .modal("setting", "transition", "scale")
            .modal("show");
    });
$("#registerPatient").click(function() {
    $.ajax({
        type: "POST",
        data: $("#registerPatientForm").serialize(),
        url: "../Admin/RegisterPatient/",
        success: function (patient) {
            window.location.reload();

        }       
});
});
$("#settlePatients").click(function() {
    $.ajax({
        type: "POST",
        data: $("#settlePatientsForm").serialize(),
        url: "../Admin/SettlePatients/",
        success: function (patientsId) {
            window.location.reload();
        }
    });
});
$("#addDesease")
    .click(function() {
        $("#addDeseaseModal")
            .modal({
                blurring: true
            })
            .modal({
                closable: true,
                onDeny: function() {
                    return true;
                },
                onApprove: function() {
                    var bookId = $("#addDesease").attr("book-id");
                    console.log($("#deseaseName").val());
                    console.log($("#addDesease").attr("book-id"));
                    $.ajax({
                        type: "POST",
                        data: { id: bookId, desease: $("#deseaseName").val() },
                        url: "../Nurse/AddDesease/",
                        success: function(desease) {
                            $("#deseaseTableBody")
                                .append('<tr id="desease' +
                                    desease.id +
                                    '">' +
                                    "<td>" +
                                    desease.name +
                                    "</td>" +
                                    '<td class="center aligned collapsed">' +
                                    '  <a class="ui yellow basic button desease" book-id="' +
                                    bookId +
                                    '" desease-id="' +
                                    desease.id +
                                    '"><i class="remove circle icon"></i>Remove</a>' +
                                    " </td>" +
                                    "</tr>");
                        }

                    });
                }
            })
            .modal("setting", "transition", "scale")
            .modal("show");
    });
$(".removeDesease")
    .click(function(e) {
        var deseaseId = e.currentTarget.attributes["desease-id"].value;
        var bookId = e.currentTarget.attributes["book-id"].value;
        $.ajax({
            type: "POST",
            data: { id: bookId, deseaseId: deseaseId },
            url: "../Nurse/RemoveDesease/",
            success: function(id) {
                $("#desease" + id).remove();
            }
        });
    });
$("#addProcedureFrequency")
    .click(function() {
        $("#addProcedureFrequencyModal")
            .modal({
                blurring: true
            })
            .modal({
                closable: true,
                onDeny: function() {
                    return true;
                },
                onApprove: function() {
                    $.ajax({
                        type: "POST",
                        data: $("#addProcedureFrequencyForm").serialize(),
                        url: "../Nurse/AddProcedureFrequency/",
                        success: function(procedureFrequency) {
                            $("#proceduresFrequencyTableBody")
                                .append('<tr id="procedureFrequency' +
                                    procedureFrequency.id +
                                    '">' +
                                    "<td>" +
                                    procedureFrequency.patientProcedure.name +
                                    "</td>" +
                                    "<td>" +
                                    procedureFrequency.frequency +
                                    "</td>" +
                                    '<td class="center aligned collapsed">' +
                                    ' <a class="ui yellow basic button procedureFrequencyDelete" book-id="' +
                                    $("#bookId").val() +
                                    '" procedureFrequency-id="' +
                                    procedureFrequency.id +
                                    '"><i class="remove circle icon"></i>Delete</a>' +
                                    " </td>" +
                                    " </tr>");
                        }
                    });
                }
            })
            .modal("setting", "transition", "scale")
            .modal("show");
    });
$(".procedureFrequencyDelete").click(function(e) {
    var procedureFrequencyId = e.currentTarget.attributes["procedureFrequency-id"].value;
    $.ajax({
        type: "POST",
        data: { procedureFrequencyId:procedureFrequencyId},
        url: "../Nurse/DeleteProcedureFrequency/",
        success: function (procedureFrequency) {
            $("#procedureFrequency" + procedureFrequency).remove();
        }
    });
});
$("#test").click(function() {
    $('.ui.sidebar')
  .sidebar('toggle')
    ;


});
