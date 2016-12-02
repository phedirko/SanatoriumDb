
$(document)
    .ready(function() {
        $.ajax({
            type: "GET",
            url: "/Home/GetLatestUpdates/",
            success: function(updates) {
                for (var i = 0; i < updates.length; i++) {
                    if (updates[updates.length - i - 1].type == "Room") {
                        $("#updatesRooms")
                            .append('<div class="ui massive success message"><div class="header">The price of the room changed.' + updates[updates.length - i - 1].when + '</div><p>You can download latest price list on link <a href="#" id="latestRoomPrices">Below</a></p></div>');
                    } else {
                        $("#updatesProcedures")
                            .append('<div class="ui massive success message"><div class="header">The price of the procedures changed.' + updates[updates.length - i - 1].when + '</div><p>You can download latest price list on link <a href="#" id="latestProceduresPrices">Below</a></p></div>');
                    }
                    console.log(updates[updates.length - i - 1].type);
                }
                $("#latestRoomPrices")
                    .click(function() {
                        $.ajax({
                            type: "GET",
                            url: "/Home/GetLatestRoomsPriceList/",
                            success: function(updates) {
                                createReport(updates);
                            }
                        });
                    });
                $("#latestProceduresPrices")
                    .click(function() {
                        $.ajax({
                            type: "GET",
                            url: "/Home/GetLatestProceduresPriceList/",
                            success: function(updates) {
                                createReport(updates);
                            }
                        });
                    });
            }
        });
    });