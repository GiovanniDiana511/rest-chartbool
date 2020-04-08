$(document).ready(function () {

    $.ajax({
        url: "http://157.230.17.132:4006/sales",
        data: {

        },
        method: 'GET',
        success: function (data) {
            var dataApi = data;
            //console.log(dataApi);
            var oggettoIntermedioLine = {};
            var oggettoIntermedioPie = {};

            for (var i = 0; i < dataApi.length; i++) {
                var oggettoSingolo = dataApi[i];
                //console.log(oggettoSingolo);
                var salesman = oggettoSingolo.salesman;
                //console.log(salesman);
                var amount = oggettoSingolo.amount;
                //console.log(amount);
                var date = moment(oggettoSingolo.date, 'DD/MM/YYYY') // 10/02/2017
                var mese = date.format('MMMM');
                //console.log(oggettoSingolo.date, date, mese);
                var id = oggettoSingolo.id;
                //console.log(id);

                if (oggettoIntermedioLine[mese] === undefined) {
                    oggettoIntermedioLine[mese] = 0;
                }
                oggettoIntermedioLine[mese] += amount;
                //console.log(oggettoIntermedioLine);

                if (oggettoIntermedioPie[salesman] === undefined) {
                    oggettoIntermedioPie[salesman] = 0;
                }
                oggettoIntermedioPie[salesman] += amount;
                //console.log(oggettoIntermedioPie);
            }

            var salesmanArray = [];
            var meseArray = [];
            var amountArrayLine = [];
            var amountArrayPie = [];

            for (var key in oggettoIntermedioLine) {
                    meseArray.push(key);
                    amountArrayLine.push(oggettoIntermedioLine[key]);
                }

            for (var key in oggettoIntermedioPie) {
                    salesmanArray.push(key);
                    amountArrayPie.push(oggettoIntermedioPie[key]);
                }

            //console.log(salesmanArray);
            //console.log(amountArray);

            newLineChart(meseArray, amountArrayLine)
            newPieChart(salesmanArray, amountArrayPie)
        },
        error: function () {

        }
    });

    function newLineChart(labels, data) {
        var ctx = $('#myChart');
        var chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'My First dataset',
                    backgroundColor: '#18737b',
                    borderColor: '#cdd741',
                    data: data // amount
                }]
            },
        });
    }

    function newPieChart(labels, data) {
        var ctx = $('#mySecondChart');
        var chart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    label: 'My First dataset',
                    backgroundColor: [
                        'darkorange',
                        'darkgreen',
                        '#18737b',
                        'darkred'
                    ],
                    borderColor: '#cdd741',
                    data: data // amount
                }]
            },
        });
    }

});
