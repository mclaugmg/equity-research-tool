// require npm modules
const React = require('react');
const ReactDOM = require('react-dom');
const $ = require('jquery');
// require components
const Header = require('./components/header.jsx');
const Search = require('./components/search.jsx');
const Tiles = require('./components/tiles.jsx');
const Chart = require('./components/chart.jsx');
// require chart.js utils
const ChartData = require('./chart-utils/chart-data.jsx');

const App = React.createClass({
  getInitialState() {
    return {
      tickers: [],
      priceHistoryData: {},
      chartData: ChartData.data,
      chartOptions: ChartData.options,
    };
  },

  /* ------------------------------------ */
  /* ---       Lifecycle Events       --- */
  /* ------------------------------------ */

  /* ------------------------------------ */
  /* ----       Event Handlers       ---- */
  /* ------------------------------------ */

  handleSearch(keyUpEvent) {
    if (keyUpEvent.keyCode === 13) {
      const ticker = document.getElementById('search').value;
      document.getElementById('search').innerHTML = '';
      $.ajax({
        url: `http://query.yahooapis.com/v1/public/yql?q=select%20%2a%20from%20yahoo.finance.quotes%20where%20symbol%20in%20%28%22${ticker}%22%29&format=json&env=store://datatables.org/alltableswithkeys`,
        type: 'GET',
        dataType: 'json',
        success: data => {
          this.addStockData(data);
        },
        error: err => {
          console.log('an error occured', err);
        },
      });
    }
  },

  addStockData(rawData) {
    const results = rawData.query.results.quote;
    const currentTickers = this.state.tickers;
    const stockData = { name: results.Name, data: {} };
    stockData.data.symbol = results.Symbol;
    stockData.data.dailyPercentChange = results.PercentChange;
    stockData.data.PERatio = results.PERatio;
    stockData.data.marketCap = results.MarketCapitalization;
    stockData.data.dividendYield = results.DividendYield;
    stockData.data.avgVolume = results.AverageDailyVolume;
    stockData.data.volume = results.Volume;
    currentTickers.push(stockData);
    this.setState({ tickers: currentTickers });
    this.getHistoricalPrices(stockData.data.symbol);
  },

  getHistoricalPrices(stock) {
    $.ajax({
      url: `https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.historicaldata%20where%20symbol%20%3D%20%22${stock}%22%20and%20startDate%20%3D%20%222015-06-1%22%20and%20endDate%20%3D%20%222016-05-30%22&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=`,
      type: 'GET',
      dataType: 'json',
      success: data => {
        this.storePrices(stock, data.query.results);
      },
      error: err => {
        console.log('an error occured', err);
      },
    });
  },

  storePrices(stock, data) {
    const newData = this.state.priceHistoryData;
    newData[stock] = data;
    this.setState({ priceHistoryData: newData });

    const priceArray = this.extractData(newData[stock].quote, 'Close');
    const dateArray = this.extractData(newData[stock].quote, 'Date');
    const newChartData = ChartData.data;
    console.log(newChartData);
    newChartData.datasets[0].data = priceArray;
    newChartData.labels = dateArray;
    this.setState({ chartData: newChartData });
  },

  extractData(stockInfoArray, query) {
    const extractedData = [];
    stockInfoArray.reverse().forEach(day => {
      extractedData.push(day[query]);
    });
    return extractedData;
  },

  /* ------------------------------------ */
  /* ----           Render           ---- */
  /* ------------------------------------ */

  render() {
    return (
      <div id="app">
        <Header />
        <Search
          handleSearch={this.handleSearch}
        />
        <Tiles
          stocks={this.state.tickers}
        />
        <Chart
          chartData={this.state.chartData}
          chartOptions={this.state.chartOptions}
        />
      </div>
    );
  },
});

ReactDOM.render(
  <App />,
  document.getElementById('content')
);
