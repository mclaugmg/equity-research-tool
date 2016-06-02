var ticker = '';

$(document).ready(function() {
	$(document).keypress(function(e) {
		if(e.keyCode == '13') makeRequest();
	})
	$(document).on('click', 'ul span', function() {
		console.log('hearing hover to div');
		$(this).parent().parent().remove();
	})
	$(document).on('dblclick', '.stock-box', function() {
		console.log('single click to div');
		var stockTickerString = $(this).find('li').first().text();
		var stockTicker = stockTickerString.split(': ')[1];
		console.log('ticker is ' + stockTicker);
		makeChartDataRequest(stockTicker);
	})
	$(document).on('click', 'canvas', function() {
		$('canvas').remove();
	})
});

function makeRequest() {
	console.log('inside make request, client side');
	ticker = $('#ticker-input').val();
	console.log('ticker is ' + ticker);
	$.ajax({
		url: 'http://localhost:3000/',
		type: 'POST',
		data: {ticker: ticker},
		dataType: 'json',
		success: function(data) {
			console.log(data);
			if (data.name) updatePage(data);
			else inputErrorAlert();
		},
		error: function(err) {
			console.log('an error occured')
		}
	});
}

function updatePage(stockData) {
	$('#NA-alert').remove();
	$('#main-container').append(`<div class="stock-box"><ul><span>${stockData.name}</span></ul><div>`)
	for (var key in stockData.data) {
		$('#main-container div:last-child ul').append(`<li>${stockData.data[key].name}: ${stockData.data[key].data}`) 
	}
	$('#ticker-input').val('');
}

function inputErrorAlert() {
	$('#ticker-form').append('<p id="NA-alert">Ticker does not exist</p>')
}

function makeChartDataRequest(ticker) {
	$.ajax({
		url: 'http://localhost:3000/chartData',
		type: 'POST',
		data: {ticker: ticker},
		dataType: 'json',
		success: function(data) {
			console.log(data);
			renderChart(data.dataArray, data.name);
		},
		error: function(err) {
			console.log('an error occured')
		}
	})
}

function renderChart(data, stockTicker) {
	$('canvas').remove();
	$('#graph-container').append('<canvas id="buyers"></canvas>');
	var timeAxisData = [], priceAxisData = [];
	data.forEach(function(element) {
		timeAxisData.push(element[0]);
		priceAxisData.push(element[1]);
	});
	timeAxisData = timeAxisData.reverse();
	priceAxisData = priceAxisData.reverse();
	var buyerData = {
		labels : timeAxisData,
		datasets : [
			{
				backgroundColor : "#4B8372",
				borderColor: "#0B3f2f",
				pointRadius: 0,
				data : priceAxisData
			}
		]
	}

	Chart.defaults.global.defaultFontColor = 'white';

	var buyers = document.getElementById('buyers').getContext('2d');
	var newChart = new Chart(buyers, {
		type: 'line',
		data: buyerData,
		options: {
			title: {
				display: true,
				text: stockTicker,
				fontColor: 'white',
				fontSize: 30
			}, 
			legend: {
				display: false
			},
			scales: {
				xAxes: [{
					gridLines: {
						color: 'white'
					}
				}],
				yAxes: [{
					gridLines: {
						color: 'white'
					}
				}],
			}
		}
	});
}
