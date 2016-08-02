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
      prices: {},
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
      </div>
    );
  },
});

ReactDOM.render(
  <App />,
  document.getElementById('content')
);
