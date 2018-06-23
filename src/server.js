const express = require('express');
const path = require('path');
const logger = require('morgan');

const mongoose = require('./connection');
const Article = require('./models/Articles');

const htmlRouter = require('./routes/html');
const apiRouter = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(logger('tiny'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(path.join(__dirname, '/../client/build')));

if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    const allowed_header = ['http://localhost:3000'];
    const origin = req.headers.origin;
    if (allowed_header.indexOf(origin) > -1) {
      res.header('Access-Control-Allow-Origin', origin);
    }
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, ideaJWT, Accept'
    );
    res.header(
      'Access-Control-Allow-Methods',
      'POST, GET, OPTIONS, PUT, DELETE'
    );
    next();
  });
}

app.use('/', htmlRouter);
app.use('/api', apiRouter);

app.listen(PORT);
