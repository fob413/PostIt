'use strict';

process.env.NODE_ENV = 'development';

var user = require('../models').Users;

var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../app');

var should = chai.should();
var expect = chai.expect;

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

  describe('Api Works', function () {
    it('it should return a response 200', function (done) {
      chai.request(app).get('/api').end(function (err, res) {
        res.should.have.status(200);
        done();
      });
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

  describe('Signs up a new user', function () {
    it('it should create a new user', function (done) {
      var testUser = {
        UserName: 'Bayo',
        email: 'bayo@yahoo.com',
        password: 'abcd'
      };
      chai.request(app).post('/api/user/signup').send(testUser).end(function (err, res) {
        res.should.have.status(201);
        res.body.should.be.a('object');
        done();
      });
    });

    it('It should create and user with the email send', function (done) {
      var testUser = {
        UserName: 'Bayo',
        email: 'bayo@yahoo.com',
        password: 'abcd'
      };
      chai.request(app).post('/api/user/signup').send(testUser).end(function (err, res) {
        res.should.have.status(201);
        expect(res.body.Username).to.equal('Bayo');
        done();
      });
    });

    it('It should create and user with the email send', function (done) {
      var testUser = {
        UserName: 'Bayo',
        email: 'bayo@yahoo.com',
        password: 'abcd'
      };
      chai.request(app).post('/api/user/signup').send(testUser).end(function (err, res) {
        res.should.have.status(201);
        expect(res.body.email).to.equal('bayo@yahoo.com');
        done();
      });
    });

    it('It should not return the Users password', function (done) {
      var testUser = {
        UserName: 'Bayo',
        email: 'bayo@yahoo.com',
        password: 'abcd'
      };
      chai.request(app).post('/api/user/signup').send(testUser).end(function (err, res) {
        res.should.have.status(201);
        expect(res.body.password).to.be.undefined;
        done();
      });
    });
  });
});