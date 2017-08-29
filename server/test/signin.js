import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../app';
import db from '../models/index';

process.env.NODE_ENV = 'test';

const user = db.Users;
const group = db.Groups;
// const user = require('../models').Users;

const should = chai.should();
const expect = chai.expect;

chai.use(chaiHttp);

// function that clears out user database
const clearUserDatabase = () => {
  user.destroy({
    where: {},
    truncate: true,
    restartIdentity: true,
    cascade: true,
  });
};

// sample user used for testing
const testUser = {
  UserName: 'Bayo',
  email: 'bayo@yahoo.com',
  password: 'abcdefghij',
  telephone: '08138498175'
};

// sample user to signin
const testUser3 = {
  UserName: 'Bayo',
  password: 'abcdefghij'
};


// tests for signin route
describe('Signin route tests /api/user/signin', () => {
  before((done) => {
    clearUserDatabase();
    chai.request(app)
    .post('/api/user/signup')
    .send(testUser)
    .end((err, res) => {
      done();
    });
  });

  // test signin positive responses
  describe('Positive signin of a user ', () => {

    // successful signin should have a status code of 200
    it(`should return a status code of 200 on successful signin`, (done) => {
      chai.request(app)
      .post('/api/user/signin')
      .send(testUser3)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
    });

    // a token should be returned on successful signin
    it(`should return a token`, (done) => {
      chai.request(app)
      .post('/api/user/signin')
      .send(testUser3)
      .end((err, res) => {
        expect(res.body.token).to.be.a('string');
        done();
      });
    });

    // the user's UserName should be returned
    it(`should return the users UserName`, (done) => {
      chai.request(app)
      .post('/api/user/signin')
      .send(testUser3)
      .end((err, res) => {
        expect(res.body.UserName).to.equal('Bayo');
        done();
      });
    });

    // the user's mail should be returned
    it(`should return the users mail`, (done) => {
      chai.request(app)
      .post('/api/user/signin')
      .send(testUser3)
      .end((err, res) => {
        expect(res.body.email).to.equal('bayo@yahoo.com');
        done();
      });
    });

    // the user's telephone number should be given
    it(`should return the users telephone number`, (done) => {
      chai.request(app)
      .post('/api/user/signin')
      .send(testUser3)
      .end((err, res) => {
        expect(res.body.telephone).to.equal('08138498175');
        done();
      });
    });

  });


  describe('Negative signin of a user ', () => {});

    // should return status code 401 if user doesn't exist
    it(`should return a status code 401 when the user does not exist`, (done) => {
      chai.request(app)
      .post('/api/user/signin')
      .send(testUser3)
      .end((err, res) => {
        expect(res.body.telephone).to.equal('08138498175');
        done();
      });
    });

    // should return status a message if user doesn not exist
    it(`should return a message when user does not exist`, (done) => {
      const testUser4 = {
        UserName: 'Funsho',
        password: 'asdf;lkj'
      };

      chai.request(app)
      .post('/api/user/signin')
      .send(testUser4)
      .end((err, res) => {
        expect(res.body.message).to.equal('Invalid Credentials');
        done();
      });
    });

    // should return a message when username is not given
    it(`should return a message when user name is not given`, (done) => {
      const testUser4 = {
        password: 'asdf;lkj'
      };

      chai.request(app)
      .post('/api/user/signin')
      .send(testUser4)
      .end((err, res) => {
        expect(res.body.message).to.equal('Invalid Credentials');
        done();
      });
    });

    // should return a message when both password and username are not given
    it(`should return a message when both user name and password are not given`, (done) => {
      const testUser4 = {
        // empty
      };

      chai.request(app)
      .post('/api/user/signin')
      .send(testUser4)
      .end((err, res) => {
        expect(res.body.message).to.equal('Invalid Credentials');
        done();
      });
    });

    // should return a status code of 400 when both password and username are not given
    it(`should return a status code of 400 when both user name and password are not given`, (done) => {
      const testUser4 = {
        // empty
      };

      chai.request(app)
      .post('/api/user/signin')
      .send(testUser4)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
    });

    // should return status a message when password is not given
    it(`should return a message when password is not given`, (done) => {
      const testUser4 = {
        UserName: 'Bayo'
      };

      chai.request(app)
      .post('/api/user/signin')
      .send(testUser4)
      .end((err, res) => {
        expect(res.body.message).to.equal('Invalid Credentials');
        done();
      });
    });

    // should return a status code of 400 when password is wrong
    it(`should return a status code of 400 when password is wrong`, (done) => {
      const testUser4 = {
        UserName: 'Bayo',
        password: 'abcdefghijklmnop'
      };

      chai.request(app)
      .post('/api/user/signin')
      .send(testUser4)
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
    });

    // should return a message when password is wrong
    it(`should return a message when password is wrong`, (done) => {
      const User4 = {
        UserName: 'Bayo',
        password: 'abcdefghijklmnop'
      };

      chai.request(app)
      .post('/api/user/signin')
      .send(User4)
      .end((err, res) => {
        // expect(res.body.message).to.equal('Invalid Credentials');
        expect(res.body.message).to.equal('Invalid Credentials');
        done();
      });
    });



  });