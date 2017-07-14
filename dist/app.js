'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');*/

// setup the express app
var app = (0, _express2.default)();

// log requests to the console
app.use((0, _morgan2.default)('dev'));

// parse incoming requests data
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));

require('./routes')(app);
/* setup a default catch-all route that sends back a
welcome message in json format*/
app.get('*', function (req, res) {
  return res.status(200).send({

    message: 'Welcome to the beginning of nothingness'

  });
});

module.exports = app;