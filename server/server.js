'use strict'

const express = require( 'express' );
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
let users = require('./data');

app.use(bodyParser.urlencoded( {

  extended: true

}));

app.use(cors());

app.get( '/api/users', ( request, response) => {
  response.json(users);
});


const hostname = 'localhost';
const port = '3001';
/*
const server = http.createServer (( request, response ) => {

  response.statusCode = 200;
  response.setHeader ( 'Content-Type', 'text/html' );
  response.end( '<h1>Hello World!</h1>\n' );

});*/

app.listen( port, hostname, () => {

  console.log( `server is running...`);

} );