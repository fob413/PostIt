import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import path from 'path';
import config from '../webpack.config.dev';
import webpack from 'webpack';
import open from 'open';
import colors from 'colors';

/*
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');*/

// setup the express app
const port = process.env.PORT || 3000;
const app = express();

// config setup
const compiler = webpack(config);

// log requests to the console
app.use(logger('dev'));

const publicPath = express.static(path.join(__dirname, '../client/dist'));

app.use('/', publicPath);

// parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));
require('./routes')(app);
/* setup a default catch-all route that sends back a
welcome message in json format*/
app.get('/*', (req, res) => {
    res.status(200)
    .sendFile(
    path.join(__dirname, 'index.html'
  ));
});

/* eslint-disable no-console */
app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server running on port ${port}...`.red );
    open(`http://localhost:${port}`);
  }
});
 
export default app;