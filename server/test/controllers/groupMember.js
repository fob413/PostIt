import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../../app';
import {
  clearGroupDatabase,
  clearGroupMemberDatabase,
  clearUserDatabase
} from '../helper';

process.env.NODE_ENV = 'travis';

const expect = chai.expect;

chai.use(chaiHttp);

clearGroupDatabase();
clearGroupMemberDatabase();
clearUserDatabase();

let token = '';

describe('Test setup', () => {
  before((done) => {
    clearGroupDatabase();
    clearGroupMemberDatabase();
    clearUserDatabase();
    done();
  });

  it('should get token for other tests', (done) => {
    chai.request(app)
    .post('/api/v1/user/signup')
    .send({
      userName: 'seyi',
      email: 'seyi@email.com',
      telephone: '0987654321',
      password: 'asdf;lkj'
    })
    .end((err, res) => {
      token = res.body.token;
      res.should.have.status(201);
      done();
    });
  });

  it('should signup another user', (done) => {
    chai.request(app)
    .post('/api/v1/user/signup')
    .send({
      userName: 'funsho',
      email: 'funsho@email.com',
      telephone: '1234567890',
      password: 'asdf;lkj'
    })
    .end((err, res) => {
      token = res.body.token;
      res.should.have.status(201);
      done();
    });
  });

  it('should create a group', (done) => {
    chai.request(app)
    .post('/api/v1/group')
    .set('token', token)
    .send({
      groupName: 'Test Group One'
    })
    .end((err, res) => {
      res.should.have.status(201);
      done();
    });
  });
});

describe('Add User To A Group Route /api/group/:groupId/user', () => {
  describe('Add user positive response', () => {
    it('should return a status of 201 when successful', (done) => {
      chai.request(app)
      .post('/api/v1/group/1/user')
      .set('token', token)
      .send({
        userId: 1
      })
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
    });
  });

  describe('Add user negative response', () => {
    it('should return a status 400 when user object is not sent', (done) => {
      chai.request(app)
      .post('/api/v1/group/1/user')
      .set('token', token)
      .send()
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
    });

    it('should return a status 401 when user already belongs to the group', (done) => {
      chai.request(app)
      .post('/api/v1/group/1/user')
      .set('token', token)
      .send({
        userId: 1
      })
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
    });

    it('should return a status 400 when group does not exist', (done) => {
      chai.request(app)
      .post('/api/v1/group/8/user')
      .set('token', token)
      .send({
        userId: 1
      })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
    });
  });
});

describe('List Users In A Group api route /api/group/:groupId/user/list', () => {
  describe('List users in a group positive response', () => {
    it('should return a status 200 when successful', (done) => {
      chai.request(app)
      .get('/api/v1/group/1/user/list')
      .set('token', token)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
    });
  });

  describe('List users in a group negative response', () => {
    it('should return a status 400 when group does not exist', (done) => {
      chai.request(app)
      .get('/api/v1/group/8/user/list')
      .set('token', token)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
    });
  });
});
