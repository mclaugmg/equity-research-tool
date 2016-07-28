const React = require('react');

const Header = React.createClass({
  /* ------------------------------------ */
  /* ----           Render           ---- */
  /* ------------------------------------ */

  render() {
    return (
      <div id="header" style={{ height: '100px', border: '1px solid black' }}>
        <h1>mr. market</h1>
      </div>
    );
  },
});

module.exports = Header;
