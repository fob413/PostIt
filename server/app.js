import express from 'express';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import logger from 'morgan';
import bodyParser from 'body-parser';
import path from 'path';
import webpack from 'webpack';
import dotenv from 'dotenv';
import webpackConfig from '../webpack.dev';
import colors from 'colors';

dotenv.config();

// setup the express app
const port = process.env.PORT || 3000;
const app = express();

// log requests to the console
app.use(logger('dev'));

const publicPath = express.static(path.join(__dirname, '../build'));

app.use('/', publicPath);

if (process.env.NODE_ENV === 'development') {
  const compiler = webpack(webpackConfig);

  app.use(webpackMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    noInfo: true,
  }),
);

  app.use(webpackHotMiddleware(compiler));
}

// parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
require('./routes')(app);
/* setup a default catch-all route that sends back a
welcome message in json format */
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
    console.log(`Server running on port ${port}...`.red);
  }
});

export default app;
