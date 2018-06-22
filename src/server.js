var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var logger = require('morgan');

var mongoose = require('./connection');
var Article = require('./models/Articles');

var htmlRouter = require('./routes/html');

var app = express();
const PORT = process.env.PORT || 3000;

app.use(logger('tiny'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', htmlRouter);

app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT);
