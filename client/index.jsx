// require npm modules
const React = require('react');
const ReactDOM = require('react-dom');
const $ = require('jquery');
// require components
const Header = require('./components/header.jsx');
const Search = require('./components/search.jsx');
const Tiles = require('./components/tiles.jsx');

const App = React.createClass({
  getInitialState() {
    return {
      tickers: [],
    };
  },

  /* ------------------------------------ */
  /* ---       Lifecycle Events       --- */
  /* ------------------------------------ */

  // componentDidMount() {
  // },

  /* ------------------------------------ */
  /* ----       Event Handlers       ---- */
  /* ------------------------------------ */

  handleSearch(keyUpEvent) {
    if (keyUpEvent.keyCode === 13) {
      const ticker = document.getElementById('search').value;
      console.log('tick is', ticker);
      $.ajax({
        url: `http://query.yahooapis.com/v1/public/yql?q=select%20%2a%20from%20yahoo.finance.quotes%20where%20symbol%20in%20%28%22${ticker}%22%29&format=json&env=store://datatables.org/alltableswithkeys`,
        // https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22YHOO%22%2C%22AAPL%22%2C%22GOOG%22%2C%22MSFT%22)&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=
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
    console.log('results are ', results);
    const currentTickers = this.state.tickers;
    const Information = (name, data) => {
      this.name = name;
      this.data = data;
    };
    const stockData = { name: results.Name, data: {} };
    stockData.data.symbol = results.Symbol;
    stockData.data.dailyPercentChange = results.PercentChange;
    stockData.data.PERatio = results.PERatio;
    stockData.data.marketCap = results.MarketCapitalization;
    stockData.data.dividendYield = results.DividendYield;
    stockData.data.avgVolume = results.AverageDailyVolume;
    stockData.data.volume = results.Volume;
    console.log('stockdata object is ', stockData);
    currentTickers.push(stockData);
    this.setState({ tickers: currentTickers });
  },

  // getHistoricalPrices(stock) {

  // }

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
      </div>
    );
  },
});

ReactDOM.render(
  <App />,
  document.getElementById('content')
);
