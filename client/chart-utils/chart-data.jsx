const ChartData = {};

ChartData.data = {
  datasets: [{
    label: 'Scatter Dataset',
    data: [1, 2, 3],
  }],
  labels: [10, 11, 12],
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
