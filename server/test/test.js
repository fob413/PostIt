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

describe('User Positive Responses', () => {
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
        password: 'abcdefghij'
      };
      chai.request(app)
      .post('/api/user/signup')
      .send(testUser)
      .end((err, res) => {
        res.body.should.be.a('object');
        done();
      });
    });

    it('It should create a user with the email given', (done) => {
      const testUser = {
        UserName: 'Bayo',
        email: 'bayo@yahoo.com',
        password: 'abcdefghij'
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
        password: 'abcdefghij'
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
        password: 'abcdefghij'
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

describe('User Negative Responses', () => {
  beforeEach((done) => {
    user.destroy({
      where: {},
      truncate: true,
      restartIdentity: true,
      cascade: true,
    });
    done();
  });

  it(`It should return a status code of 500
  when UserName is not given`, (done) => {
    const testUser = {
      email: 'bayo@yahoo.com',
      password: 'abcdefghij'
    };
    chai.request(app)
    .post('/api/user/signup')
    .send(testUser)
    .end((err, res) => {
      res.should.have.status(500);
      done();
    });
  });

  it(`It should return a status code of 400
  when email is not given`, (done) => {
    const testUser = {
      UserName: 'Bayo',
      password: 'abcdefghij'
    };
    chai.request(app)
    .post('/api/user/signup')
    .send(testUser)
    .end((err, res) => {
      res.should.have.status(400);
      done();
    });
  });

  it(`It should return a status code of 400
  when password is less than 8 characters`, (done) => {
    const testUser = {
      UserName: 'Bayo',
      email: 'bayo@yahoo.com',
      password: 'abcd'
    };
    chai.request(app)
    .post('/api/user/signup')
    .send(testUser)
    .end((err, res) => {
      res.should.have.status(400);
      done();
    });
  });
});

describe('Group API works', () => {
  it('it should return a response 200', (done) => {
    chai.request(app)
    .get('/api/group')
    .end((err, res) => {
      res.should.have.status(200);
      done();
    });
  });
});

describe('Create Group Positive Responses', () => {
  beforeEach((done) => {
    user.destroy({

    });
  });
});
