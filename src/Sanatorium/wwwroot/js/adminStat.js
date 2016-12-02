
$(document)
    .ready(function() {
        $.ajax({
            type: "GET",
            url: "../Admin/GetRoomsStat/",
            success: function(rooms) {
                var ctx = document.getElementById("myChart");
                var data = [];
                var color = GenerateRandomPalette();
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
                                backgroundColor: color,
                                hoverBackgroundColor: color,
                                data: data
                            }
                        ]
                    },
                    options: {
                        onClick: function(e, a) {
                            console.log(a);
                        },
                        scales: {
                            xAxes: [
                                {
                                    ticks: {
                                        beginAtZero: true,
                                        stepSize: 1
                                    }
                                }
                            ]
                        }
                    }
                });
            }
        });
        var data1 = {
            labels: [
                "Red",
                "Blue",
                "Yellow"
            ],
            datasets: [
                {
                    data: [300, 50, 100],
                    backgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56"
                    ],
                    hoverBackgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56"
                    ]
                }
            ]
        };

        $.ajax({
            type: "GET",
            url: "../Admin/GetGenderStat/",
            success: function(genderStat) {
                var genderDataValues = [];
                var genders = [];
                $(genderStat)
                    .each(function(index, element) {
                        genderDataValues.push(element.value);
                        genders.push(element.gender);
                    });
                var genderData = {
                    labels: genders,
                    datasets: [
                        {
                            data: genderDataValues,
                            backgroundColor: [
                                //"#36A2EB",
                                GenerateRandomPalette(),
                                GenerateRandomPalette()
                                //"#FF6384"
                            ],
                            hoverBackgroundColor: [
                                GenerateRandomPalette(),
                                GenerateRandomPalette()

                                // "#36A2EB",
                                //"#FF6384"
                            ]
                        }
                    ]
                };
                var genderCtx = document.getElementById("genderChart");
                var myDoughnutChart = new Chart(genderCtx,
                {
                    type: 'doughnut',
                    data: genderData
                });
            }
        });
        $.ajax({
            type: "GET",
            url: "../Admin/GetSettleStat/",
            success: function(settleStat) {
                var settleDataValues = [];
                var settle = [];
                $(settleStat)
                    .each(function(index, element) {
                        settleDataValues.push(element.value);
                        if (element.settle === true) {
                            settle.push("Settle");
                        } else {
                            settle.push("UnSettle");
                        }
                    });
                var settleData = {
                    labels: settle,
                    datasets: [
                        {
                            data: settleDataValues,
                            backgroundColor: [
                                //"#36A2EB",
                                GenerateRandomPalette(),
                                GenerateRandomPalette()
                                //"#FF6384"
                            ],
                            hoverBackgroundColor: [
                                GenerateRandomPalette(),
                                GenerateRandomPalette()

                                // "#36A2EB",
                                //"#FF6384"
                            ]
                        }
                    ]
                };
                var settleCtx = document.getElementById("settleChart");
                var myDoughnutChart = new Chart(settleCtx,
                {
                    type: 'doughnut',
                    data: settleData
                });
            }
        });
    });