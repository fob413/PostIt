import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../../app';
import {
  clearGroupDatabase,
  clearGroupMemberDatabase,
  clearUserDatabase
} from '../mockData/helper';
import mockData from '../mockData';

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
    .send(mockData.userData1)
    .end((err, res) => {
      token = res.body.token;
      res.should.have.status(201);
      done();
    });
  });

  it('should signup another user', (done) => {
    chai.request(app)
    .post('/api/v1/user/signup')
    .send(mockData.userData4)
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
    .send(mockData.groupData1)
    .end((err, res) => {
      res.should.have.status(201);
      done();
    });
  });
});

describe('Add User To A Group Route /api/group/:groupId/user', () => {
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

  it('should return a status 404 when user object is not sent', (done) => {
    chai.request(app)
    .post('/api/v1/group/1/user')
    .set('token', token)
    .send()
    .end((err, res) => {
      res.should.have.status(404);
      done();
    });
  });

  it('should return a status 409 when user already belongs to the group', (done) => {
    chai.request(app)
    .post('/api/v1/group/1/user')
    .set('token', token)
    .send(mockData.addUser1)
    .end((err, res) => {
      res.should.have.status(409);
      done();
    });
  });

  it('should return a status 404 when group does not exist', (done) => {
    chai.request(app)
    .post('/api/v1/group/8/user')
    .set('token', token)
    .send(mockData.addUser1)
    .end((err, res) => {
      res.should.have.status(404);
      done();
    });
  });
});

describe('List Users In A Group api route \'GET: /api/group/:groupId/user/list\'', () => {
  it('should return a status 200 when successful', (done) => {
    chai.request(app)
    .get('/api/v1/group/1/user/list')
    .set('token', token)
    .end((err, res) => {
      res.should.have.status(200);
      done();
    });
  });

  it('should return a status 404 when group does not exist', (done) => {
    chai.request(app)
    .get('/api/v1/group/8/user/list')
    .set('token', token)
    .end((err, res) => {
      res.should.have.status(404);
      done();
    });
  });
});
