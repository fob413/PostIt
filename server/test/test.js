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

describe('SignUp Positive Responses', () => {
  beforeEach((done) => {
    user.destroy({
      where: {},
      truncate: true,
      restartIdentity: true,
      cascade: true,
    });
    done();
  });

  describe('POST /api/user/signup', () => {
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

    it('It should create and user with the email given', (done) => {
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
  });
});

describe('SignUp Negative Responses', () => {
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

// describe('Group Positive Responses', () => {
//   beforeEach((done) => {
//     group.destroy({
//       where: {},
//       truncate: true,
//       restartIdentity: true,
//       cascade: true
//     });
//     user.destroy({
//       where: {},
//       truncate: true,
//       restartIdentity: true,
//       cascade: true
//     });
//     done();
//   });

//   describe('POST /api/group', () => {
//     it('it should create a new group', (done) => {
//       const testUser = {
//         UserName: 'Funsho',
//         email: 'funsho@yahoo.com',
//         password: 'abcdefghij'
//       };
//       chai.request(app)
//       .post('/api/user/signup')
//       .send(testUser);
//       const testGroup = {
//         userId: 1,
//         GroupName: 'Sample Group',
//         Description: 'Short description about the created sample group'
//       };
//       chai.request(app)
//       .post('/api/group')
//       .send(testGroup)
//       .end((err, res) => {
//         console.log('===========>>>>>>>>>>>>>!!!!!!!!!', res.body);
//         res.should.have.status(201);
//         done();
//       });
//     });

//     it('it should create a new group with the name given', (done) => {
//       const testUser = {
//         UserName: 'Bayo',
//         email: 'bayo@yahoo.com',
//         password: 'abcdefghij'
//       };
//       const testGroup = {
//         userId: 1,
//         GroupName: 'Sample Group',
//         Description: 'Short description about the created sample group'
//       };
//       chai.request(app)
//       .post('/api/user/signup', '/api/group')
//       .send(testUser, testGroup)
//       .end((err, res) => {
//         res.should.have.status(201);
//         expect(res.body.GroupName).to.equal('Sample Group');
//         done();
//       });
//     });
//   });
// });
