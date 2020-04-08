$(document).ready(function () {

    $.ajax({
        url: "http://157.230.17.132:4006/sales",
        data: {

        },
        method: 'GET',
        success: function (data) {
            var dataApi = data;
            //console.log(dataApi);
            var oggettoIntermedio = {};

            for (var i = 0; i < dataApi.length; i++) {
                var oggettoSingolo = dataApi[i];
                //console.log(oggettoSingolo);
                var salesman = oggettoSingolo.salesman;
                //console.log(salesman);
                var amount = oggettoSingolo.amount;
                //console.log(amount);
                var date = oggettoSingolo.date;
                //console.log(date);
                var id = oggettoSingolo.id;
                //console.log(id);

                if (oggettoIntermedio[salesman] === undefined) {
                    oggettoIntermedio[salesman] = 0;
                }
                oggettoIntermedio[salesman] += amount;
                //console.log(oggettoIntermedio);
            }

            var salesmanArray = [];
            var amountArray = [];

            for (var key in oggettoIntermedio) {
                    salesmanArray.push(key);
                    amountArray.push(oggettoIntermedio[key]);
                }
            //console.log(salesmanArray);
            //console.log(amountArray);

            newChart(salesmanArray, amountArray)
        },
        error: function () {

        }
    });

    function newChart(labels, data) {
        var ctx = $('#myChart');
        var chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'My First dataset',
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: data // amount
                }]
            },
        });
    }

});
