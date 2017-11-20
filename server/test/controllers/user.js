import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../../app';
import {
  clearUserDatabase,
  testUser1,
  testUser2,
  testUser12,
  testUser4,
  testUser5,
  testUser10,
  testUser11,
  incompleteUser1,
  signup
} from '../mockData/helper';
import mockData from '../mockData';

process.env.NODE_ENV = 'travis';


const should = chai.should();
const expect = chai.expect;

chai.use(chaiHttp);
clearUserDatabase();

let token = '';

describe('Test setup ', () => {
  before((done) => {
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
});

describe('Signup route \'POST: /api/user/signup\'', () => {
  it('should signup a new user', (done) => {
    chai.request(app)
    .post('/api/v1/user/signup')
    .send(testUser1)
    .end((err, res) => {
      res.should.have.status(201);
      done();
    });
  });

  it('should return a status of 400 if nothing is sent to the route', (done) => {
    chai.request(app)
    .post('/api/v1/user/signup')
    .send()
    .end((err, res) => {
      res.should.have.status(400);
      done();
    });
  });

  it('should return a message Invalid credentials when no user object is given', (done) => {
    chai.request(app)
    .post('/api/v1/user/signup')
    .send()
    .end((err, res) => {
      expect(res.body.message).to.equal(mockData.invalid);
      done();
    });
  });

  it('should return a message Invalid credentials when a user object is incomplete', (done) => {
    chai.request(app)
    .post('/api/v1/user/signup')
    .send(incompleteUser1)
    .end((err, res) => {
      expect(res.body.message).to.equal(mockData.invalid);
      done();
    });
  });

  it('should return a status of 409 if username is already in use', (done) => {
    chai.request(app)
    .post('/api/v1/user/signup')
    .send(testUser10)
    .end((err, res) => {
      res.should.have.status(409);
      done();
    });
  });

  it('should return a status of 409 if email is already in use', (done) => {
    chai.request(app)
    .post('/api/v1/user/signup')
    .send(testUser11)
    .end((err, res) => {
      res.should.have.status(409);
      done();
    });
  });

  it('should return a status of 409 if telephone number is already in use', (done) => {
    chai.request(app)
    .post('/api/v1/user/signup')
    .send(testUser4)
    .end((err, res) => {
      res.should.have.status(409);
      done();
    });
  });
});

describe('Signin route \'POST: /api/user/signin\'', () => {
  it('should signin a user', (done) => {
    chai.request(app)
    .post('/api/v1/user/signin')
    .send(testUser12)
    .end((err, res) => {
      res.should.have.status(200);
      done();
    });
  });

  it('should return a status 400 if no user object is sent', (done) => {
    chai.request(app)
    .post('/api/v1/user/signin')
    .send()
    .end((err, res) => {
      res.should.have.status(400);
      done();
    });
  });

  it('should return a status 404 when user is not found', (done) => {
    chai.request(app)
    .post('/api/v1/user/signin')
    .send(mockData.userData2)
    .end((err, res) => {
      res.should.have.status(404);
      done();
    });
  });

  it('should return a status 401 when password is wrong', (done) => {
    chai.request(app)
    .post('/api/v1/user/signin')
    .send(testUser5)
    .end((err, res) => {
      res.should.have.status(401);
      done();
    });
  });
});

describe('Signout route, \'GET: /api/user/signout\'', () => {
  it('should return a status of 200 on successful signout', (done) => {
    chai.request(app)
    .get('/api/v1/user/signout')
    .set('token', token)
    .end((err, res) => {
      res.should.have.status(200);
      done();
    });
  });

  it('should return a status of 403 when no token is sent', (done) => {
    chai.request(app)
    .get('/api/v1/user/signout')
    .end((err, res) => {
      res.should.have.status(403);
      done();
    });
  });

  it('should return a status of 401 when the token sent is invalid', (done) => {
    chai.request(app)
    .get('/api/v1/user/signout')
    .set('token', 'invalid token')
    .end((err, res) => {
      res.should.have.status(401);
      done();
    });
  });

  it('should return a message when token sent is invalid', (done) => {
    chai.request(app)
    .get('/api/v1/user/signout')
    .set('token', 'invalid token')
    .end((err, res) => {
      expect(res.body.message).to.equal(mockData.failedAuthentication);
      done();
    });
  });
});

describe('Search Users Route \'POST: /api/users/list/:offset\'', () => {
  it('should return a status of 200 on successful search', (done) => {
    chai.request(app)
    .post('/api/v1/users/list/0')
    .set('token', token)
    .send({
      userName: 't',
      limit: 5
    })
    .end((err, res) => {
      res.should.have.status(200);
      done();
    });
  });

  it('should return a status of 400 when no search or limit parameter is sent', (done) => {
    chai.request(app)
    .post('/api/v1/users/list/0')
    .set('token', token)
    .send()
    .end((err, res) => {
      res.should.have.status(400);
      done();
    });
  });
});

describe('Forgot password route /api/forgot/password', () => {
  it('should return a status of 200', (done) => {
    chai.request(app)
    .post('/api/v1/forgot/password')
    .set('token', token)
    .send({
      email: 'seyi@email.com'
    })
    .end((err, res) => {
      res.should.have.status(200);
      done();
    });
  });

  it('should return a status of 400 if email is not sent', (done) => {
    chai.request(app)
    .post('/api/v1/forgot/password')
    .set('token', token)
    .send()
    .end((err, res) => {
      res.should.have.status(400);
      done();
    });
  });

  it('should return a status of 400 when no user is on the platforom with the email', (done) => {
    chai.request(app)
    .post('/api/v1/forgot/password')
    .set('token', token)
    .send(mockData.userData3)
    .end((err, res) => {
      res.should.have.status(400);
      done();
    });
  });
});
