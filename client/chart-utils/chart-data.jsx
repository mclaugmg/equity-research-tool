const ChartData = {};

ChartData.data = {
  datasets: [{
    label: 'Scatter Dataset',
    data: [{
      x: -10,
      y: 0,
    }, {
      x: 0,
      y: 10,
    }, {
      x: 10,
      y: 5,
    }],
  }],
};

ChartData.options = {
  scales: {
    xAxes: [{
      type: 'linear',
      position: 'bottom',
    }],
  },
};

module.exports = ChartData;
