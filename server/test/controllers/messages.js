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
    .post('/api/user/signup')
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
    .post('/api/user/signup')
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
    .post('/api/group')
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

describe('Send Messge Route /api/group/:groupId/message', () => {
  describe('Send message positive response ', () => {
    it('should return a status 201 when successful', (done) => {
      chai.request(app)
      .post('/api/group/1/message')
      .set('token', token)
      .send({
        content: 'Hello World one'
      })
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
    });

    it('should return a status 201 when successful', (done) => {
      chai.request(app)
      .post('/api/group/1/message')
      .set('token', token)
      .send({
        content: 'Hello World two',
        priorityValue: 'urgent'
      })
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
    });

    it('should return a status 201 when successful', (done) => {
      chai.request(app)
      .post('/api/group/1/message')
      .set('token', token)
      .send({
        content: 'Hello World three',
        priority: 'critical'
      })
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
    });
  });

  describe('Send message negative response ', () => {
    let secondToken = '';
    before((done) => {
      chai.request(app)
      .post('/api/user/signup')
      .send({
        userName: 'temi',
        email: 'temi@email.com',
        telephone: '123456789012',
        password: 'asdf;lkj'
      })
      .end((err, res) => {
        secondToken = res.body.token;
        res.should.have.status(201);
        done();
      });
    });

    it('should return a status 400 when group does not exist', (done) => {
      chai.request(app)
      .post('/api/group/8/message')
      .set('token', token)
      .send({
        content: 'Hello World'
      })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
    });

    it('should return a status 400 when user is not in group', (done) => {
      chai.request(app)
      .post('/api/group/1/message')
      .set('token', secondToken)
      .send({
        content: 'Hello World'
      })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
    });

    it('should return a status 400 when there is no content in users request object', (done) => {
      chai.request(app)
      .post('/api/group/1/message')
      .set('token', token)
      .send()
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
    });
  });
});

describe('Retrieve Group Messages Route /api/group/:groupId/messages', () => {
  let secondToken = '';
  before((done) => {
    chai.request(app)
    .post('/api/user/signup')
    .send({
      userName: 'teni',
      email: 'teni@email.com',
      telephone: '523456789012',
      password: 'asdf;lkj'
    })
    .end((err, res) => {
      secondToken = res.body.token;
      res.should.have.status(201);
      done();
    });
  });
  describe('Retrieve group messages positive response ', () => {
    it('should return a status 200 when successful', (done) => {
      chai.request(app)
      .get('/api/group/1/messages')
      .set('token', token)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
    });
  });

  describe('Retrieve group negative response', () => {
    it('should return status 400 when group does not exist', (done) => {
      chai.request(app)
      .get('/api/group/8/messages')
      .set('token', token)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
    });

    it('should return status 400 when user is not a member of the group', (done) => {
      chai.request(app)
      .get('/api/group/1/messages')
      .set('token', secondToken)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
    });
  });
});

describe('Read Message route /api/group/:groupId/messages/read ', () => {
  let secondToken = '';
  before((done) => {
    chai.request(app)
    .post('/api/user/signup')
    .send({
      userName: 'femi',
      email: 'femi@email.com',
      telephone: '623456789012',
      password: 'asdf;lkj'
    })
    .end((err, res) => {
      secondToken = res.body.token;
      res.should.have.status(201);
      done();
    });
  });
  describe('Read message positive response ', () => {
    it('should return status 201 when successful', (done) => {
      chai.request(app)
      .post('/api/group/1/messages/read')
      .set('token', token)
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
    });
  });

  describe('Read message negative response ', () => {
    it('should return status 400 when not a member of group', (done) => {
      chai.request(app)
      .post('/api/group/1/messages/read')
      .set('token', secondToken)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
    });
  });
});
