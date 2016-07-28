// require npm modules
const React = require('react');
const ReactDOM = require('react-dom');
// require components
const Header = require('./header.jsx');

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
        <VisibilityBox isVisible={this.state.isVisible} />
        <ConnectionInfo connections={this.state.connections} />
        <Iacto
          connections={this.state.connections}
          visibilityUpdate={this.visibilityUpdate}
          visibilityId={'iacto'}
        />
        <Umbra
          visibilityUpdate={this.visibilityUpdate}
          visibilityId={'umbra'}
        />
      </div>
    );
  },
});

ReactDOM.render(
  <App />,
  document.getElementById('content')
);
