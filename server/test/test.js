process.env.NODE_ENV = 'development';

const user = require('../models').Users;

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

const should = chai.should();
const expect = chai.expect;

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

  describe('Api Works', () => {
    it('it should return a response 200', (done) => {
      chai.request(app)
      .get('/api')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
    });
  });
});

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

  describe('Signs up a new user', () => {
    it('it should create a new user', (done) => {
      const testUser = {
        UserName: 'Bayo',
        email: 'bayo@yahoo.com',
        password: 'abcd'
      };
      chai.request(app)
      .post('/api/user/signup')
      .send(testUser)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        done();
      });
    });

    it('It should create and user with the email send', (done) => {
      const testUser = {
        UserName: 'Bayo',
        email: 'bayo@yahoo.com',
        password: 'abcd'
      };
      chai.request(app)
      .post('/api/user/signup')
      .send(testUser)
      .end((err, res) => {
        res.should.have.status(201);
        expect(res.body.Username).to.equal('Bayo');
        done();
      });
    });

    it('It should create and user with the email send', (done) => {
      const testUser = {
        UserName: 'Bayo',
        email: 'bayo@yahoo.com',
        password: 'abcd'
      };
      chai.request(app)
      .post('/api/user/signup')
      .send(testUser)
      .end((err, res) => {
        res.should.have.status(201);
        expect(res.body.email).to.equal('bayo@yahoo.com');
        done();
      });
    });

    it('It should not return the Users password', (done) => {
      const testUser = {
        UserName: 'Bayo',
        email: 'bayo@yahoo.com',
        password: 'abcd'
      };
      chai.request(app)
      .post('/api/user/signup')
      .send(testUser)
      .end((err, res) => {
        res.should.have.status(201);
        expect(res.body.password).to.be.undefined;
        done();
      });
    });
  });
});
