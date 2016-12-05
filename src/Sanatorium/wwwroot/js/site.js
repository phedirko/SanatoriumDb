// Write your Javascript code.
var rooms = [];
var patients = [];
var tablePatientsGender = "";
var tablePatientsFullName = "";
var tablePatientsType;
var onlyUnSeenPatients = false;
var importFile = "";
$(document)
    .ready(function() {
        $("#adminRegisterGender").dropdown();
        $("#patientsSettle").dropdown();
        $("#roomSettle").dropdown();
        $(".ui.dropdown").dropdown();
        $('.ui.checkbox')
            .checkbox();
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
        $(rooms)
            .each(function(index, element) {
                if (element.id == id) {
                    $("#updateCapacity").val(element.capacity);
                    $("#updateDailyPrice").val(element.dailyPrice);
                    return false;
                }
            });
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
}

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
$("#changePhoto")
    .click(function() {
        var img = new FormData();
        img.append('img', $("#img")[0]);
        $.ajax({
            url: "../Nurse/SaveImg",
            type: "POST",

            cache: false,
            contentType: false,
            processData: false,

            data: img

        });

    });
$("#allPatientsReport")
    .click(function() {
        $("#downloadFormatModal")
            .modal({
                closable: true,
                onDeny: function() {
                    return true;
                },
                onApprove: function() {
                    var format = $("#fileFormat").val();

                    $.ajax({
                        url: "../Nurse/GetPatientsInfo/",
                        success: function(data) {
                            createReport(data, format);
                        }
                    });
                }
            })
            .modal("show");

    });
$(".bookReport")
    .click(function(e) {
        $("#downloadFormatModal")
            .modal({
                closable: true,
                onDeny: function() {
                    return true;
                },
                onApprove: function() {
                    var format = $("#fileFormat").val();
                    var id = e.currentTarget.attributes["patient-id"].value;
                    $.ajax({
                        url: "../Nurse/GetPatientBookInfo/" + id,
                        success: function(data) {
                            createReport(data, format);
                            console.log(JSON.stringify(data));

                        }
                    });
                }
            })
            .modal("show");

        //console.log(id);
        //console.log(e);
    });

function createReport(data, format) {
    var document1 =
        "<html><head><style>.jh-root, .jh-type-object, .jh-type-array, .jh-key, .jh-value, .jh-root tr{ -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */ -moz-box-sizing: border-box; /* Firefox, other Gecko */ box-sizing: border-box; /* Opera/IE 8+ */ font-weight: bold; } .jh-key, .jh-value{ margin: 0; padding: 0.2em; font-weight: bold; } .jh-value{ border-left: 1px solid #ddd; } .jh-type-number{ text-align: center; color: #5286BC; } .jh-type-bool-true{ text-align: center; color: #5A811C; } .jh-type-bool-false{ text-align: center; color: #D45317; } .jh-type-bool-image { width: 20px; height: 20px; margin-right: 5px; vertical-align: bottom; } .jh-type-string{ font-style: italic; color: #6E6E6E; } .jh-array-key{ font-style: italic; font-size: small; text-align: center; } .jh-object-key, .jh-array-key{ color: #444; vertical-align: top; } .jh-type-object > tbody > tr:nth-child(odd), .jh-type-array > tbody > tr:nth-child(odd){ background-color: #f5f5f5; } .jh-type-object > tbody > tr:nth-child(even), .jh-type-array > tbody > tr:nth-child(even){ background-color: #fff; } .jh-type-object, .jh-type-array{ width: 100%; border-collapse: collapse; } .jh-root{ border: 1px solid #ccc; margin: 0.2em; } th.jh-key{ text-align: left; } .jh-type-object > tbody > tr, .jh-type-array > tbody > tr{ border: 1px solid #ddd; border-bottom: none; } .jh-type-object > tbody > tr:last-child, .jh-type-array > tbody > tr:last-child{ border-bottom: 1px solid #ddd; } .jh-type-object > tbody > tr:hover, .jh-type-array > tbody > tr:hover{ border: 1px solid #F99927; } .jh-empty{ font-style: italic; color: #999; font-size: small; } .jh-a { text-decoration: none; } .jh-a:hover{ text-decoration: underline; } .jh-a span.jh-type-string { text-decoration: none; color : #268ddd; font-style: normal; }</style></head><body>";
    var node = JsonHuman.format(data);
    document1 += "<br/>" + node.innerHTML + "<script>window.print()</script></body></html>";
    //Rabotaet ne trogaj)))
    switch (format) {
    case "html":
        download(new Blob([document1.bold()]), "report.html", "text/html");
        break;
    case "doc":
        download(new Blob([document1.bold()]), "report.doc", "text/doc");
        break;
    case "docx":
        download(new Blob([document1.bold()]), "report.docx", "text/docx");
        break;
    default:
        break;
    }


}

$(".orderBy")
    .click(function(e) {
        var flag = true;
        if (e.currentTarget.attributes["byDesc"].value == "false") {
            flag = false;
        }
        $.ajax({
            type: "GET",
            url: "/Admin/OrderPatientsByName?desc=" + flag,
            success: function(data) {
                for (var i = 0; i < data.length; i++) {
                    console.log(data[i].id);
                    $('#patientTableBody').append($('#Patient' + data[i].id));
                }

            }
        });
    });
$("#searchPatientsByName")
    .keyup(function() {
        $(patients)
            .each(function(index, element) {
                console.log(element.id);
                $("#Patient" + element.id).removeClass("active");
            });
        var partOfName = $("#searchPatientsByName").val();
        $.ajax({
            type: "GET",
            url: "/Admin/SearchPatients?partOfName=" + partOfName,
            success: function(data) {
                $(data)
                    .each(function(index, element) {
                        console.log(element.id);
                        $("#Patient" + element.id).addClass("active");
                    });
            }
        });
    });
$("#importBtn")
    .click(function() {

        console.log(importFile.FullName);
        $.ajax({
            type: "POST",
            data: importFile,
            url: "../Admin/ImportPatientFromFile/",
            //url: "../Admin/ImportPatientFromFile?FullName="+importFile.FullName+"&Days="+importFile.Days+"&Gender="+importFile.Gender,
            success: function(dataa) {
                window.location.reload();
            }

        });

    });
$(document)
    .on('change',
        '#patientFile',
        function(event) {
            var reader = new FileReader();
            reader.onload = function(event) {
                var jsonObj = JSON.parse(event.target.result);
                importFile = jsonObj;
            };
            reader.readAsText(event.target.files[0]);
            //console.log(reader.readAsText(event.target.files[0]));
        });
$("#createQuery").click(function () {
    $.ajax({
        type: "POST",
        data: {q:$("#query").val()},
        url: "../Admin/Query/",
        success: function (result) {
            $("#sqlResult").html("");
            for (var i = 0 ; i < result.length; i++) {
                //if (i == 0) {
                //    $("#sqlResult").append('<table class="ui single line table"> <thead> <tr>');
                //}
                for (j = 0; j < result[i].length; j++) {
                    console.log(result[i][j]);
                    //if (i == 0 && j == result[i].length - 1) {
                        //        $("#sqlResult").append('<th>' + result[i][j] + "</th></tr></thead>");
                        //    }
                        //    else if (i == 0) {
                        //        $("#sqlResult").append('<th>' + result[i][j] + "</th>");
                        //    }
                        //    else if(j==0){
                        //        $("#sqlResult").append('<tr><td>' + result[i][j] + "</td>");
                        //    }
                        //    else if (j == result[i].length - 1) {
                        //        $("#sqlResult").append('<td>' + result[i][j] + "</td><tr>");
                        //    }
                        //    else {
                        //        $("#sqlResult").append('<td>' + result[i][j] + "</td>");
                        //    }
                        //}
                        //if (i == result.length - 1) {
                        //    $("#sqlResult").append('</tbody></table>');
                        //}
                    }
                }
        }
    });
});