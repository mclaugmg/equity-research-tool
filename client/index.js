var ticker = '';

$(document).ready(function() {
	$(document).keypress(function(e) {
		if(e.keyCode == '13') makeRequest();
	})
	$(document).on('dblclick', '.stock-box', function() {
		console.log('hearing click to div');
		$(this).remove();
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
	$('#main-container').append(`<div class="stock-box"><ul><span>${stockData.name}<span></ul><div>`)
	for (var key in stockData.data) {
		$('#main-container div:last-child ul').append(`<li>${stockData.data[key].name}: ${stockData.data[key].data}`) 
	}
	$('#ticker-input').val('');
}

function inputErrorAlert() {
	$('#ticker-form').append('<p id="NA-alert">Ticker does not exist</p>')
}
