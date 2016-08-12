const ChartData = {};

ChartData.data = {
  datasets: [{
    label: 'Scatter Dataset',
    data: [1, 2, 3, 2, 10],
    pointRadius: 0,
    xAxisID: 'Data',
    yAxisID: 'Price',
    lineTension: 0,
  }],
  labels: [10, 11, 12, 13, 14],
};

// options not currently working
ChartData.options = {
  title: {
    display: true,
    text: 'Historical Prices',
    fontColor: 'black',
  },
};

module.exports = ChartData;
