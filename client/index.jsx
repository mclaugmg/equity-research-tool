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
        url: `http://query.yahooapis.com/v1/public/yql?q=select%20%2a%20from%20yahoo.finance.quotes%20where%20symbol%20in%20%28%22${ticker}%22%29&env=store://datatables.org/alltableswithkeys`,
        type: 'GET',
        dataType: 'xml',
        success: data => {
          this.addStockData(this.xmlToJson(data));
        },
        error: function(err) {
          console.log('an error occured');
        },
      });
    }
  },

  addStockData(rawData) {
    const results = rawData.query.results.quote;
    console.log('adding data');
    console.log(rawData);
    console.log(results);
    const currentTickers = this.state.tickers;
    const Information = (name, data) => {
      this.name = name;
      this.data = data;
    };
    const stockData = { name: results.Name, data: {} };
    stockData.data.symbol = new Information('Ticker', results.Symbol);
    stockData.data.dailyPercentChange = new Information('Today', results.PercentChange);
    stockData.data.PERatio = new Information('P/E Ratio', results.PERatio);
    stockData.data.marketCap = new Information('Market Cap', results.MarketCapitalization);
    stockData.data.dividendYield = new Information('Dividend Yield', results.DividendYield);
    stockData.data.avgVolume = new Information('Average Daily Volume', results.AverageDailyVolume);
    stockData.data.volume = new Information('Volume', results.Volume);
    console.log(stockData);
    currentTickers.push(stockData);
    this.setState({ tickers: currentTickers });
  },

    // Changes XML to JSON
  xmlToJson(xml) {
    // Create the return object
    var obj = {};
    if (xml.nodeType == 1) { // element
      // do attributes
      if (xml.attributes.length > 0) {
      obj["@attributes"] = {};
        for (var j = 0; j < xml.attributes.length; j++) {
          var attribute = xml.attributes.item(j);
          obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
        }
      }
    } else if (xml.nodeType == 3) { // text
      obj = xml.nodeValue;
    }
    // do children
    if (xml.hasChildNodes()) {
      for(var i = 0; i < xml.childNodes.length; i++) {
        var item = xml.childNodes.item(i);
        var nodeName = item.nodeName;
        if (typeof(obj[nodeName]) == "undefined") {
          obj[nodeName] = this.xmlToJson(item);
        } else {
          if (typeof(obj[nodeName].push) == "undefined") {
            var old = obj[nodeName];
            obj[nodeName] = [];
            obj[nodeName].push(old);
          }
          obj[nodeName].push(this.xmlToJson(item));
        }
      }
    }
    return obj;
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
