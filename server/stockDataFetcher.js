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
	stockData.data.avgVolume = new Information ('Average Daily Volume', rawData.AverageDailyVolume);
	stockData.data.marketCap = new Information ('Market Cap', rawData.MarketCapitalization);
	stockData.data.PERatio = new Information ('P/E Ratio', rawData.PERatio);
	stockData.data.dividendYield = new Information ('Dividend Yield', rawData.DividendYield);
	stockData.data.dailyPercentChange = new Information ('Today', rawData.PercentChange);
	stockData.data.volume = new Information ('Volume', rawData.Volume);
	return stockData;
}

module.exports = stockDataFetcher;
