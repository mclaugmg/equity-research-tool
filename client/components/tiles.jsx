const React = require('react');

const Tiles = React.createClass({
  propTypes: {
    stocks: React.PropTypes.array.isRequired,
  },

  /* ------------------------------------ */
  /* ----           Render           ---- */
  /* ------------------------------------ */

  render() {
    const stocks = this.props.stocks;
    const StockArray = stocks.map(stock => {
      return (<div className="stock-tile">
        <h2>{stock.data.symbol}</h2>
        <h3>{stock.name}</h3>
        <p><span>P/E Ratio:</span>{stock.data.PERatio}</p>
        <p><span>Market Cap:</span>{stock.data.marketCap}</p>
        <p><span>Yield:</span>{stock.data.dividendYield}</p>
        <p><span>Volume:</span>{stock.data.volume}</p>
        <p><span>Avg Volume:</span>{stock.data.avgVolume}</p>
      </div>);
    });
    return (
      <div id="tile-container">
        <StockArray />
      </div>
    );
  },
});

module.exports = Tiles;
