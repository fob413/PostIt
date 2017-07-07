'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var users = require('./data');

app.use(bodyParser.urlencoded({

  extended: true

}));

app.use(cors());

app.get('/api/users', function (request, response) {
  response.json(users);
});

var hostname = 'localhost';
var port = '3001';
/*
const server = http.createServer (( request, response ) => {

  response.statusCode = 200;
  response.setHeader ( 'Content-Type', 'text/html' );
  response.end( '<h1>Hello World!</h1>\n' );

});*/

app.listen(port, hostname, function () {

  console.log('server is running...');
});