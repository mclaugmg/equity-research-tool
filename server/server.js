const express = require('express');
const app = express();
const server = require('http').Server(app); // eslint-disable-line
const port = process.env.PORT || 3000;
const path = require('path');

/* ----------------------------------
 * -----   Global Middleware   ------
 * ---------------------------------- */

app.use(express.static(path.join(`${__dirname}/../client`)));

/* ----------------------------------
 * --------      Routes      --------
 * ---------------------------------- */

app.get('/', function(req, res) {
  res.sendFile('./../client/index.html');
});

// app.post('/', stockDataFetcher.getData);

// app.post('/chartData', stockDataFetcher.getChartData);

/* ----------------------------------
 * --------      Server      --------
 * ---------------------------------- */

server.listen(port, () => {
  console.log(`Listening on port ${port}`); // eslint-disable-line
});
