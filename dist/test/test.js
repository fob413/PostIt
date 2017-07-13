'use strict';

process.env.NODE_ENV = 'development';

var user = require('../models').User;

var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../app');

var should = chai.should();

chai.use(chaiHttp);
/*
describe('user', () => {
  beforeEach((done) => {
    user.destroy({
      where: {},
      truncate: true,
      restartIdentity: true,
      cascade: true,
    });
    done();
  });
*/
describe('Api Works', function () {
  it('it should return a response 200', function (done) {
    chai.request(app).get('/api').end(function (err, res) {
      res.should.have.status(200);
      done();
    });
  });
});

describe('user', function () {
  beforeEach(function (done) {
    user.destroy({
      where: {},
      truncate: true,
      restartIdentity: true,
      cascade: true
    });
    done();
  });
});