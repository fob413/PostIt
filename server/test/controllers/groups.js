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
  it('should create a new group', (done) => {
    chai.request(app)
    .post('/api/v1/group')
    .set('token', token)
    .send(mockData.groupData2)
    .end((err, res) => {
      res.should.have.status(201);
      res.body.should.have.property('success').equals(true);
      done();
    });
  });

  it('should not create a group without group name', (done) => {
    chai.request(app)
    .post('/api/v1/group')
    .set('token', token)
    .send()
    .end((err, res) => {
      res.should.have.status(400);
      res.body.should.have.property('success').equals(false);
      done();
    });
  });

  it('should not create duplicate groups', (done) => {
    chai.request(app)
    .post('/api/v1/group')
    .set('token', token)
    .send({
      groupName: 'Test Group Two'
    })
    .end((err, res) => {
      res.should.have.status(409);
      res.body.should.have.property('success').equals(false);
      done();
    });
  });

  it('should not create group if group name is more than 14 characters', (done) => {
    chai.request(app)
    .post('/api/v1/group')
    .set('token', token)
    .send(mockData.groupData3)
    .end((err, res) => {
      res.should.have.status(400);
      res.body.should.have.property('success').equals(false);
      done();
    });
  });
});

describe('List Groups Route \'GET: /api/v1/group/list\'', () => {
  it('should successfully list groups a user belongs to', (done) => {
    chai.request(app)
    .get('/api/v1/group/list')
    .set('token', token)
    .end((err, res) => {
      res.should.have.status(200);
      res.body.should.have.property('success').equals(true);
      done();
    });
  });
});
