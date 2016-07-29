// require npm modules
const React = require('react');
const ReactDOM = require('react-dom');
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

  /* ------------------------------------ */
  /* ----           Render           ---- */
  /* ------------------------------------ */

  render() {
    return (
      <div id="app">
        <Header />
        <Search />
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
