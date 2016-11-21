
$(document)
    .ready(function() {
        $.ajax({
            type: "GET",
            url: "../Admin/GetRoomsStat/",
            success: function(rooms) {
                var ctx = document.getElementById("myChart");
                var data = [];
                for (var i = 0; i < rooms.length; i++) {
                    data.push({ x: rooms[i].cap, y: rooms[i].price, r: 10 });
                }
                var scatterChart = new Chart(ctx,
                {
                    type: 'bubble',

                    data: {
                        datasets: [
                            {
                                label: 'Price/Capacity Dataset',
                                backgroundColor: "#FF6384",
                                hoverBackgroundColor: "#FF6384",
                                data: data
                            }
                        ]
                    },
                    options: {
                        onClick: function(e, a) {
                            console.log(a);
                        },
                        scales: {
                            xAxes: [{
                                ticks: {
                                    beginAtZero: true,
                                    stepSize :1
                                }
                            }]
                        }
                    }
                });
            }
        });
    });