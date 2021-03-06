const React = require('react');
const LineChart = require('react-chartjs').Line;

const Chart = React.createClass({
  propTypes: {
    chartData: React.PropTypes.object.isRequired,
    chartOptions: React.PropTypes.object.isRequired,
  },

  /* ------------------------------------ */
  /* ----           Render           ---- */
  /* ------------------------------------ */

  render() {
    return (
      <LineChart
        data={this.props.chartData}
        options={this.props.chartOptions}
        width="800"
        height="350"
      />
    );
  },
});

module.exports = Chart;
