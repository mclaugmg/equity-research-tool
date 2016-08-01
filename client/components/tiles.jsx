const React = require('react');

const Tiles = React.createClass({
  propTypes: {
    stocks: React.PropTypes.array.isRequired,
  },

  buildStockArray() {
    const stocks = this.props.stocks;
    return stocks.map(stock => {
      return (<div className="stock-tile">
        <h2>{stock.data.symbol}</h2>
        <h4>{stock.name}</h4>
        <div className="info-container">
          <p><span className="category">Today:</span><span className="stock-data">{stock.data.dailyPercentChange}</span></p>
        </div>
        <div className="info-container">
          <p><span className="category">P/E Ratio:</span><span className="stock-data">{stock.data.PERatio}</span></p>
        </div>
        <div className="info-container">
          <p><span className="category">Market Cap:</span><span className="stock-data">{stock.data.marketCap}</span></p>
        </div>
        <div className="info-container">
          <p><span className="category">Yield:</span><span className="stock-data">{stock.data.dividendYield}</span></p>
        </div>
        <div className="info-container">
          <p><span className="category">Volume:</span><span className="stock-data">{stock.data.volume}</span></p>
        </div>
        <div className="info-container">
          <p><span className="category">Avg Volume:</span><span className="stock-data">{stock.data.avgVolume}</span></p>
        </div>
      </div>);
    });
  },

  /* ------------------------------------ */
  /* ----           Render           ---- */
  /* ------------------------------------ */

  render() {
    const StockArray = this.buildStockArray();
    console.log(StockArray);
    return (
      <div id="tile-container">
        {StockArray}
      </div>
    );
  },
});

module.exports = Tiles;
