const React = require('react');

const Header = React.createClass({
  /* ------------------------------------ */
  /* ----           Render           ---- */
  /* ------------------------------------ */

  render() {
    return (
      <div id="header" style={{ borderBottom: '1px solid black' }}>
        <h1>mr. market</h1>
      </div>
    );
  },
});

module.exports = Header;
