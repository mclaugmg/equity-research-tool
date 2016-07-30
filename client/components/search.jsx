const React = require('react');

const Search = React.createClass({
  propTypes: {
    handleSearch: React.PropTypes.func.isRequired,
  },

  /* ------------------------------------ */
  /* ----           Render           ---- */
  /* ------------------------------------ */

  render() {
    return (
      <div className="box">
        <div className="container-1">
          <span className="icon"><i className="fa fa-search"></i></span>
          <input
            type="search"
            id="search"
            placeholder="Search..."
            onKeyUp={this.props.handleSearch}
          />
        </div>
      </div>
    );
  },
});

module.exports = Search;
