const React = require('react');

const Search = React.createClass({
  /* ------------------------------------ */
  /* ----           Render           ---- */
  /* ------------------------------------ */

  render() {
    return (
      <div className="box">
        <div className="container-1">
          <span className="icon"><i className="fa fa-search"></i></span>
          <input type="search" id="search" placeholder="Search..." />
        </div>
      </div>
    );
  },
});

module.exports = Search;
