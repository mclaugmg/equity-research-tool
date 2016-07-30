const React = require('react');

const Tiles = React.createClass({
  propTypes: {
    stocks: React.PropTypes.array.isRequired,
  },

  buildStockArray() {
    const stocks = this.props.stocks;
    return stocks.map(stock => {
      return (<div className="stock-tile">
        <h2>{stock.data.symbol.data}</h2>
        <h3>{stock.name}</h3>
        <p><span>P/E Ratio:</span>{stock.data.PERatio}</p>
        <p><span>Market Cap:</span>{stock.data.marketCap}</p>
        <p><span>Yield:</span>{stock.data.dividendYield}</p>
        <p><span>Volume:</span>{stock.data.volume}</p>
        <p><span>Avg Volume:</span>{stock.data.avgVolume}</p>
      </div>);
    });
  },

  /* ------------------------------------ */
  /* ----           Render           ---- */
  /* ------------------------------------ */

  render() {
    const StockArray = this.buildStockArray();
    return (
      <div id="tile-container">
        {StockArray}
      </div>
    );
  },
});

module.exports = Tiles;
