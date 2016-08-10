const ChartData = {};

ChartData.data = {
  datasets: [{
    label: 'Scatter Dataset',
    data: [1, 2, 3, 2, 10],
  }],
  labels: [10, 11, 12, 13, 14],
  xAxisID: 'Data',
  yAxisID: 'Price',
};

// options not currently working
ChartData.options = {
  title: {
    display: true,
    text: 'Historical Prices',
  },
};

module.exports = ChartData;
