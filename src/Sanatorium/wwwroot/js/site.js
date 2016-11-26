// Write your Javascript code.
var rooms = [];
var patients = [];
var tablePatientsGender = "";
var tablePatientsFullName = "";
var tablePatientsType;
var onlyUnSeenPatients = false;
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
                }
            });
            $.ajax({
                url: "../Admin/GetAllPatients/",
                success: function(allPatients) {
                    $(allPatients)
                        .each(function(index, element) {
                            patients.push(element);
                        });
                }
            });
            break;
        case "/Nurse":
            $.ajax({
                url: "../Nurse/GetAllPatients/",
                success: function(allPatients) {
                    $(allPatients)
                        .each(function(index, element) {
                            patients.push(element);
                        });
                    tablePatientsType = "All";
                }
            });
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
                    .append(`<tr><td class="collapsing">Комната ${room.roomNumber}</td><td>Этаж ${room.stageNumber
                        },вместимость ${room.capacity},цена ${room.dailyPrice
                        }</td><td class="right aligned collapsing">Какие то действия</td></tr>`);
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
            success: function() {
                $("#name").val("");
                $("#price").val("");
                window.location.reload();
                $("#procedureAddedDimmer").dimmer("show");
            }
        });
    });
$(".updateBtn")
    .click(function(e) {
        var id = e.target.id;
        $("#updateRoomModal")
            .modal({
                closable: true,
                onDeny: function() {
                    return true;
                },
                onApprove: function() {
                    $.ajax({
                        type: "POST",
                        data: $("#updateRoomForm").serialize(),
                        url: `../Admin/UpdateRoom?roomId=${id}`,
                        success: function(updateRoom) {
                            $(`#tdRoomNumber${id}`).text(`Room ${updateRoom.roomNumber}`);
                            $(`#tdRoomInfo${id}`)
                                .text(`Stage ${updateRoom
                                    .stageNumber},capacity ${updateRoom.capacity},daily price ${updateRoom.dailyPrice
                                    }`);
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
                            $(`#Room${id}`).remove();
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
$("#registerPatient")
    .click(function() {
        $.ajax({
            type: "POST",
            data: $("#registerPatientForm").serialize(),
            url: "../Admin/RegisterPatient/",
            success: function(patient) {
                window.location.reload();

            }
        });
    });
$("#settlePatients")
    .click(function() {
        $.ajax({
            type: "POST",
            data: $("#settlePatientsForm").serialize(),
            url: "../Admin/SettlePatients/",
            success: function(patientsId) {
                window.location.reload();
            }
        });
    });
$("#addDesease")
    .click(function() {
        $("#addDeseaseModal")
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
                            window.location.reload();
                            $("#deseaseName").val("");
                        }

                    });
                }
            })
            .modal("setting", "transition", "scale")
            .modal("show");
    });
$(".removeDesease")
    .click(function(e) {
        const deseaseId = e.currentTarget.attributes["desease-id"].value;
        const bookId = e.currentTarget.attributes["book-id"].value;
        $.ajax({
            type: "POST",
            data: { id: bookId, deseaseId: deseaseId },
            url: "../Nurse/RemoveDesease/",
            success: function(id) {
                $(`#desease${id}`).remove();
            }
        });
    });
$("#addProcedureFrequency")
    .click(function() {
        $("#addProcedureFrequencyModal")
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
                            window.location.reload();
                        }
                    });
                }
            })
            .modal("setting", "transition", "scale")
            .modal("show");
    });
$(".procedureFrequencyDelete")
    .click(function(e) {
        const procedureFrequencyId = e.currentTarget.attributes["procedureFrequency-id"].value;
        $.ajax({
            type: "POST",
            data: { procedureFrequencyId: procedureFrequencyId },
            url: "../Nurse/DeleteProcedureFrequency/",
            success: function(procedureFrequency) {
                $(`#procedureFrequency${procedureFrequency}`).remove();
            }
        });
    });
$("#test")
    .click(function() {
        $(".ui.sidebar")
            .sidebar("toggle");
    });
$("#searchPatientByName")
    .keyup(function() {
        var currentValue = $("#searchPatientByName").val();
        tablePatientsFullName = currentValue;
        const flag = tablePatientsType == "All" || tablePatientsType == undefined ? true : false;
        if (flag) {
            $.each(patients,
                function(index, value) {
                    if (!tablePatientsGender) {
                        if (patients[index].fullName.substring(0, $("#searchPatientByName").val().length) ===
                            currentValue) {
                            $(`#Patient${patients[index].id}`).attr("style", "display:table-row");
                        } else {
                            $(`#Patient${patients[index].id}`).attr("style", "display:none");
                        }
                    } else {
                        if (patients[index].fullName.substring(0, $("#searchPatientByName").val().length) ===
                            currentValue &&
                            patients[index].gender === tablePatientsGender) {
                            $(`#Patient${patients[index].id}`).attr("style", "display:table-row");
                        } else {
                            $(`#Patient${patients[index].id}`).attr("style", "display:none");
                        }
                    }
                });
        } else {
            var isSeen = tablePatientsType == "Unseen" ? false : true;
            $.each(patients,
                function(index, value) {
                    if (!tablePatientsGender) {
                        if (patients[index].fullName.substring(0, $("#searchPatientByName").val().length) ===
                            currentValue &&
                            patients[index].seenByNurse.toString() == isSeen.toString()) {
                            $(`#Patient${patients[index].id}`).attr("style", "display:table-row");
                        } else {
                            $(`#Patient${patients[index].id}`).attr("style", "display:none");
                        }
                    } else {
                        if (patients[index].fullName.substring(0, $("#searchPatientByName").val().length) ===
                            currentValue &&
                            patients[index].gender === tablePatientsGender &&
                            patients[index].seenByNurse.toString() == isSeen.toString()) {
                            $(`#Patient${patients[index].id}`).attr("style", "display:table-row");
                        } else {
                            $(`#Patient${patients[index].id}`).attr("style", "display:none");
                        }
                    }
                });
        }
    });
$(".genderSort")
    .click(function(e) {
        var currentGender = e.currentTarget.attributes["data-text"].value;
        tablePatientsGender = currentGender;
        const flag = tablePatientsType == "All" || tablePatientsType == undefined ? true : false;
        if (flag) {
            $.each(patients,
                function(index, value) {
                    if (!tablePatientsFullName) {
                        if (patients[index].gender === currentGender) {
                            $(`#Patient${patients[index].id}`).attr("style", "display:table-row");
                        } else {
                            $(`#Patient${patients[index].id}`).attr("style", "display:none");
                        }
                    } else {
                        if (patients[index].gender === currentGender &&
                            patients[index].fullName.substring(0, tablePatientsFullName.length) ===
                            tablePatientsFullName) {
                            $(`#Patient${patients[index].id}`).attr("style", "display:table-row");
                        } else {
                            $(`#Patient${patients[index].id}`).attr("style", "display:none");
                        }
                    }
                });
        } else {
            var isSeen = tablePatientsType == "Unseen" ? false : true;
            $.each(patients,
                function(index, value) {
                    if (!tablePatientsFullName) {
                        if (patients[index].gender === currentGender &&
                            patients[index].seenByNurse.toString() == isSeen.toString()) {
                            $(`#Patient${patients[index].id}`).attr("style", "display:table-row");
                        } else {
                            $(`#Patient${patients[index].id}`).attr("style", "display:none");
                        }
                    } else {
                        if (patients[index].gender === currentGender &&
                            patients[index].fullName.substring(0, tablePatientsFullName.length) ===
                            tablePatientsFullName &&
                            patients[index].seenByNurse.toString() == isSeen.toString()) {
                            $(`#Patient${patients[index].id}`).attr("style", "display:table-row");
                        } else {
                            $(`#Patient${patients[index].id}`).attr("style", "display:none");
                        }
                    }
                });
        }
    });
$(".settleBtn")
    .click(function(e) {
        const fullName = e.currentTarget.attributes["patient-name"].value;
        $("#patientId").val(e.currentTarget.attributes.id.value);
        const gender = e.currentTarget.attributes["patient-gender"].value;
        $("#patientModalName").text(fullName + "," + gender);
        $("#settlePatientModal")
            .modal({
                closable: true,
                onDeny: function() {
                    return true;
                },
                onApprove: function() {
                    $.ajax({
                        type: "POST",
                        data: $("#singlePatientSettleForm").serialize(),
                        url: "../Admin/SettlePatient/",
                        success: function(data) {
                          window.location.reload();
                        }
                    });
                }
            })
            .modal("setting", "transition", "scale")
            .modal("show");
    });

function GenerateRandomPalette() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

$(".infoBtn")
    .click(function(e) {
        var patient = {};
        console.log(e.currentTarget.attributes["id"].value);
        for (let i = 0; i < patients.length; i++) {
            if (patients[i].id == e.currentTarget.attributes["id"].value) {
                patient = patients[i];
                break;
            }

        }
        $("#patientFullName").text(patient.fullName);
        if (patient.gender.toString() === "Male") {
            $("#genderLabel").text("Male,");
            $("#patientImg").attr("src", "/lib/semantic/examples/assets/images/avatar/tom.jpg");
        } else {
            $("#patientImg").attr("src", "/lib/semantic/examples/assets/images/avatar/nan.jpg");
            $("#genderLabel").text("Female,");

        }
        if (patient.isSettle) {
            $("#settleLabel").text("Settle");
        } else {
            $("#settleLabel").text("UnSettle");
        }
        $("#patientInfoModal")
            .modal("setting", "transition", "scale")
            .modal("show");
    });
$(".seenSort")
    .click(function(e) {
        tablePatientsType = e.currentTarget.attributes["data-text"].value;
        console.log(e.currentTarget.attributes["data-text"].value);
        var flag = tablePatientsType == "Unseen" ? false : true;
        if (tablePatientsGender != "" && tablePatientsFullName != "") {
            $.each(patients,
                function(index, value) {
                    if (patients[index].gender === tablePatientsGender &&
                        patients[index].fullName.substring(0, tablePatientsFullName.length) ===
                        tablePatientsFullName &&
                        patients[index].seenByNurse.toString() == flag.toString()) {
                        $(`#Patient${patients[index].id}`).attr("style", "display:table-row");
                    } else {
                        $(`#Patient${patients[index].id}`).attr("style", "display:none");
                    }

                });
        } else if (tablePatientsGender == "" && tablePatientsFullName == "") {
            $.each(patients,
                function(index, value) {
                    if (patients[index].seenByNurse.toString() == flag.toString()) {
                        $(`#Patient${patients[index].id}`).attr("style", "display:table-row");
                    } else {
                        $(`#Patient${patients[index].id}`).attr("style", "display:none");
                    }

                });
        } else if (tablePatientsGender == "") {
            $.each(patients,
                function(index, value) {
                    if (patients[index].fullName.substring(0, tablePatientsFullName.length) ===
                        tablePatientsFullName &&
                        patients[index].seenByNurse.toString() == flag.toString()) {
                        $(`#Patient${patients[index].id}`).attr("style", "display:table-row");
                    } else {
                        $(`#Patient${patients[index].id}`).attr("style", "display:none");
                    }

                });
        } else {
            $.each(patients,
                function(index, value) {
                    if (patients[index].gender === tablePatientsGender &&
                        patients[index].seenByNurse.toString() == flag.toString()) {
                        $(`#Patient${patients[index].id}`).attr("style", "display:table-row");
                    } else {
                        $(`#Patient${patients[index].id}`).attr("style", "display:none");
                    }

                });
        }
    });
$(".updateProcedureInfo")
    .click(function(e) {
        console.log(e);
        const prevName = e.currentTarget.attributes["procedure-name"].value;
        const prevPrice = e.currentTarget.attributes["procedure-price"].value;
        const procedureId = e.currentTarget.attributes["procedure-id"].value;
        $("#updateName").val(prevName);
        $("#updatePrice").val(prevPrice);
        $("#updateProcedureId").val(procedureId);
        $("#updateProcedureModal")
            .modal({
                closable: true,
                onDeny: function() {
                    return true;
                },
                onApprove: function() {
                    $.ajax({
                        type: "POST",
                        data: $("#updateProcedureForm").serialize(),
                        url: "../Nurse/UpdateProcedure/",
                        success: function(procedure) {
                            $(`#procedure${procedure.id}Name`).text(procedure.name);
                            $(`#procedure${procedure.id}Price`).text(procedure.price);
                            e.currentTarget.attributes["procedure-price"].value = procedure.price;
                            e.currentTarget.attributes["procedure-name"].value = procedure.name;
                        }
                    });
                }
            })
            .modal("show");
    });
$(".removeProcedure")
    .click(function(e) {
        var id = e.currentTarget.attributes["procedure-id"].value;
        $("#removeProcedureModal")
            .modal({
                closable: true,
                onDeny: function() {
                    return true;
                },
                onApprove: function() {
                    $.ajax({
                        type: "POST",
                        data: { id: id },
                        url: "../Nurse/RemoveProcedure/",
                        success: function(procedureId) {
                            $(`#procedure${procedureId}Tr`).remove();
                        }
                    });
                }
            })
            .modal("show");
    });
$("#changePhoto").click(function () {
    var img = new FormData();
    img.append('img', $("#img")[0])
    $.ajax({
        url: "../Nurse/SaveImg",
        type: "POST",
       
        cache: false,
        contentType: false,
        processData: false,
        
        data: img,
        success: function () {
            
        }

    })

});