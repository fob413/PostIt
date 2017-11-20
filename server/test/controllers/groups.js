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
clearUserDatabase();
clearGroupDatabase();
clearGroupMemberDatabase();

let token = '';

describe('Test setup ', () => {
  before((done) => {
    clearUserDatabase();
    clearGroupDatabase();
    clearGroupMemberDatabase();
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

describe('Create Group Route \'POST: /api/group\' ', () => {
  it('should return a status of 201 on succeffully creating a new group', (done) => {
    chai.request(app)
    .post('/api/v1/group')
    .set('token', token)
    .send(mockData.groupData2)
    .end((err, res) => {
      res.should.have.status(201);
      done();
    });
  });

  it('should return status of 400 when no request object is given', (done) => {
    chai.request(app)
    .post('/api/v1/group')
    .set('token', token)
    .send()
    .end((err, res) => {
      res.should.have.status(400);
      done();
    });
  });

  it('should return status of 409 when a group already exists with the same name', (done) => {
    chai.request(app)
    .post('/api/v1/group')
    .set('token', token)
    .send({
      groupName: 'Test Group Two'
    })
    .end((err, res) => {
      res.should.have.status(409);
      done();
    });
  });

  it('should return status of 400 when a group name is more than 14 characters', (done) => {
    chai.request(app)
    .post('/api/v1/group')
    .set('token', token)
    .send(mockData.groupData3)
    .end((err, res) => {
      res.should.have.status(400);
      done();
    });
  });
});

describe('List Groups Route \'GET: /api/v1/group/list\'', () => {
  it('should return a status of 200 on successful listing of groups', (done) => {
    chai.request(app)
    .get('/api/v1/group/list')
    .set('token', token)
    .end((err, res) => {
      res.should.have.status(200);
      done();
    });
  });
});
