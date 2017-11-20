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
let secondToken = '';

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
      secondToken = res.body.token;
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

describe('Send Messge Route \'POST: /api/group/:groupId/message\'', () => {
  it('should return a status 201 when successful', (done) => {
    chai.request(app)
    .post('/api/v1/group/1/message')
    .set('token', token)
    .send(mockData.sendMessage1)
    .end((err, res) => {
      res.should.have.status(201);
      done();
    });
  });

  it('should return a status 201 when successful', (done) => {
    chai.request(app)
    .post('/api/v1/group/1/message')
    .set('token', token)
    .send(mockData.sendMessage2)
    .end((err, res) => {
      res.should.have.status(201);
      done();
    });
  });

  it('should return a status 201 when successful', (done) => {
    chai.request(app)
    .post('/api/v1/group/1/message')
    .set('token', token)
    .send(mockData.sendMessage3)
    .end((err, res) => {
      res.should.have.status(201);
      done();
    });
  });

  it('should return a status 404 when group does not exist', (done) => {
    chai.request(app)
    .post('/api/v1/group/8/message')
    .set('token', token)
    .send({
      content: 'Hello World'
    })
    .end((err, res) => {
      res.should.have.status(404);
      done();
    });
  });

  it('should return a status 401 when user is not in group', (done) => {
    chai.request(app)
    .post('/api/v1/group/1/message')
    .set('token', secondToken)
    .send({
      content: 'Hello World'
    })
    .end((err, res) => {
      res.should.have.status(401);
      done();
    });
  });

  it('should return a status 400 when there is no content in users request object', (done) => {
    chai.request(app)
    .post('/api/v1/group/1/message')
    .set('token', token)
    .send()
    .end((err, res) => {
      res.should.have.status(400);
      done();
    });
  });
});

describe('Retrieve Group Messages Route \'GET: /api/group/:groupId/messages\'', () => {
  let thirdToken = '';
  before((done) => {
    chai.request(app)
    .post('/api/v1/user/signup')
    .send({
      userName: 'teni',
      email: 'teni@email.com',
      telephone: '523456789012',
      password: 'asdf;lkj'
    })
    .end((err, res) => {
      thirdToken = res.body.token;
      res.should.have.status(201);
      done();
    });
  });

  it('should return a status 200 when successful', (done) => {
    chai.request(app)
    .get('/api/v1/group/1/messages')
    .set('token', token)
    .end((err, res) => {
      res.should.have.status(200);
      done();
    });
  });

  it('should return status 404 when group does not exist', (done) => {
    chai.request(app)
    .get('/api/v1/group/8/messages')
    .set('token', token)
    .end((err, res) => {
      res.should.have.status(404);
      done();
    });
  });

  it('should return status 401 when user is not a member of the group', (done) => {
    chai.request(app)
    .get('/api/v1/group/1/messages')
    .set('token', thirdToken)
    .end((err, res) => {
      res.should.have.status(401);
      done();
    });
  });
});

describe('Read Message route \'POST: /api/group/:groupId/messages/read\' ', () => {
  let fourthToken = '';
  before((done) => {
    chai.request(app)
    .post('/api/v1/user/signup')
    .send(mockData.userData5)
    .end((err, res) => {
      fourthToken = res.body.token;
      res.should.have.status(201);
      done();
    });
  });
  it('should return status 201 when successful', (done) => {
    chai.request(app)
    .post('/api/v1/group/1/messages/read')
    .set('token', token)
    .end((err, res) => {
      res.should.have.status(201);
      done();
    });
  });

  it('should return status 401 when not a member of group', (done) => {
    chai.request(app)
    .post('/api/v1/group/1/messages/read')
    .set('token', fourthToken)
    .end((err, res) => {
      res.should.have.status(401);
      done();
    });
  });
});
