const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const request = require('request');
const mongoose = require('mongoose');
const stockDataFetcher = require('./stockDataFetcher');

var app = express();

app.set('view engine', 'ejs');

app.use(express.static(__dirname + './../client/')); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function(req, res) {
  console.log('rendering html');
  res.render('./../client/index');
});

app.post('/', stockDataFetcher.getData);

app.post('/chartData', stockDataFetcher.getChartData);

app.listen(3000);

module.exports = app;
