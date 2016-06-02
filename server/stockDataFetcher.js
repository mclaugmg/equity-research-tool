const request = require('request');

var stockDataFetcher = {};
var url = '';

stockDataFetcher.getData = function(req, res, next) {
	url = `https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22${req.body.ticker}%22)&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=`
	request(url, function(error, response, body) {
		if (error) console.log('an error occured!');
		var rawData = JSON.parse(body).query.results.quote;
		res.send(stockDataFetcher.buildObject(rawData));
		next();
	})
};

stockDataFetcher.buildObject = function(rawData) {
	function Information(name, data) {
		this.name = name;
		this.data = data;
	}
	var stockData = {name: rawData.Name, data: {}};
	stockData.data.symbol = new Information ('Ticker', rawData.Symbol);
	stockData.data.dailyPercentChange = new Information ('Today', rawData.PercentChange);
	stockData.data.PERatio = new Information ('P/E Ratio', rawData.PERatio);
	stockData.data.marketCap = new Information ('Market Cap', rawData.MarketCapitalization);
	stockData.data.dividendYield = new Information ('Dividend Yield', rawData.DividendYield);
	stockData.data.avgVolume = new Information ('Average Daily Volume', rawData.AverageDailyVolume);
	stockData.data.volume = new Information ('Volume', rawData.Volume);
	return stockData;
}

stockDataFetcher.getChartData = function(req, res, next) {
	url = `https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.historicaldata%20where%20symbol%20%3D%20%22${req.body.ticker}%22%20and%20startDate%20%3D%20%222015-06-1%22%20and%20endDate%20%3D%20%222016-05-30%22&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=`
	request(url, function(error, response, body) {
		if (error) console.log('error occured!');
		var rawData = JSON.parse(body).query.results.quote;
		var stockData = {dataArray: [], name: req.body.ticker};
		rawData.forEach(function(dataObject) {
			date = dataObject.Date;
			closingPrice = dataObject.Close;
			stockData.dataArray.push([date, closingPrice]);
		})
		res.send(stockData);
		next();
	})
}

module.exports = stockDataFetcher;
