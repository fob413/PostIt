'use strict';

var should = require('chai').should();
var expect = require('chai').expect;
var supertest = require('supertest');

var api = supertest('http://localhost:8000');

describe('Valid User', function () {
  it('should return a 200 response', function (done) {
    api.get('/api').set('Accept', 'application/json').expect(200, done);
  });

  it('should signup a user', function (done) {
    api.post('/api/user/signup').set('Accept', 'application/x-www-form-urlencoded').send({
      UserName: 'Bayo',
      email: 'bayo@gmail.com',
      password: '1234'
    }).expect(201).end(function (err, res) {
      console.log('<,,,,,,,,,,,,-------------------' + res.body);
      expect(res.body.UserName).to.equal('Funsho');
      done();
    });
  });

  it('should not return an error signiing up a user', function (done) {
    api.post('/api/user/signup').field('UserName', 'Bayo').field('email', 'bayo@yahoo.com').field('password', '1234').end(function (err, res) {
      expect(err).to.be.null;
      done();
    });
  });

  it('should signup a user', function (done) {
    api.post('/api/user/signup').field('UserName', 'Titi').field('email', 'Titi@yahoo.com').field('password', '1234').end(function (err, res) {
      expect(res).to.have.status(201);
      done();
    });
  });
});