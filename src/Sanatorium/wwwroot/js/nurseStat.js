$(document)
    .ready(function() {
        $.ajax({
            type: "GET",
            url: "../Nurse/GetDeseasesStat/",
            success: function (deseasesStat) {
                var deseasesDataValues = [];
                var deseases = [];
                var colors = [];
                $(deseasesStat)
                    .each(function (index, element) {
                        deseasesDataValues.push(element.value);
                        deseases.push(element.desease);
                        colors.push(GenerateRandomPalette());
                    });
                var deseasesData = {
                    datasets: [
                        {
                            data: deseasesDataValues,
                            backgroundColor: colors,
                            hoverBackgroundColor: colors
                        }],
                    labels: deseases
                    
                };
                var deseasesCtx = document.getElementById("deseasesChart");
                var myPieChart = new Chart(deseasesCtx, {
                    type: 'pie',
                    data: deseasesData
                });
            }
        });
    });