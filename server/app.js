const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

// setup the express app
const app = express();

// log requests to the console
app.use(logger('dev'));

// parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./routes')(app);
/* setup a default catch-all route that sends back a
welcome message in json format*/
app.get('*', (req, res) => res.status(200).send({

  message: 'Welcome to the beginning of nothingness',

}));

module.exports = app;
