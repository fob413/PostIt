import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../../app';
import {
  clearUserDatabase,
  testUser1,
  testUser12,
  testUser4,
  testUser5,
  testUser10,
  testUser11,
  incompleteUser1,
} from '../mockData/helper';
import mockData from '../mockData';

process.env.NODE_ENV = 'travis';


const should = chai.should();
const expect = chai.expect;

chai.use(chaiHttp);
clearUserDatabase();

let token = '';
let resetToken = '';

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
      res.body.should.have.property('success').equals(true);
      done();
    });
  });

  it('should not sign up any user when nothing is sent to the route', (done) => {
    chai.request(app)
    .post('/api/v1/user/signup')
    .send()
    .end((err, res) => {
      res.should.have.status(400);
      res.body.should.have.property('success').equals(false);
      done();
    });
  });

  it('should return a message \'Invalid credentials\' when no user object is given', (done) => {
    chai.request(app)
    .post('/api/v1/user/signup')
    .send()
    .end((err, res) => {
      expect(res.body.message).to.equal(mockData.invalid);
      done();
    });
  });

  it('should return a message \'Invalid credentials\' when a user object is incomplete', (done) => {
    chai.request(app)
    .post('/api/v1/user/signup')
    .send(incompleteUser1)
    .end((err, res) => {
      expect(res.body.message).to.equal(mockData.invalid);
      done();
    });
  });

  it('should not sign up a user with username that has been used', (done) => {
    chai.request(app)
    .post('/api/v1/user/signup')
    .send(testUser10)
    .end((err, res) => {
      res.should.have.status(409);
      res.body.should.have.property('success').equals(false);
      done();
    });
  });

  it('should not sign up a user with an email that has been used', (done) => {
    chai.request(app)
    .post('/api/v1/user/signup')
    .send(testUser11)
    .end((err, res) => {
      res.should.have.status(409);
      res.body.should.have.property('success').equals(false);
      done();
    });
  });

  it('should not sign up a user with a telephone number that has been used', (done) => {
    chai.request(app)
    .post('/api/v1/user/signup')
    .send(testUser4)
    .end((err, res) => {
      res.should.have.status(409);
      res.body.should.have.property('success').equals(false);
      done();
    });
  });
});

describe('Signin route \'POST: /api/user/signin\'', () => {
  it('should successfully signin a user', (done) => {
    chai.request(app)
    .post('/api/v1/user/signin')
    .send(testUser12)
    .end((err, res) => {
      res.should.have.status(200);
      res.body.should.have.property('success').equals(true);
      done();
    });
  });

  it('should not login a user with no object body', (done) => {
    chai.request(app)
    .post('/api/v1/user/signin')
    .send()
    .end((err, res) => {
      res.should.have.status(400);
      res.body.should.have.property('success').equals(false);
      done();
    });
  });

  it('should not login a user that does not exist', (done) => {
    chai.request(app)
    .post('/api/v1/user/signin')
    .send(mockData.userData2)
    .end((err, res) => {
      res.should.have.status(404);
      res.body.should.have.property('success').equals(false);
      done();
    });
  });

  it('should not login a user with wrong password', (done) => {
    chai.request(app)
    .post('/api/v1/user/signin')
    .send(testUser5)
    .end((err, res) => {
      res.should.have.status(401);
      res.body.should.have.property('success').equals(false);
      done();
    });
  });
});

describe('Signout route, \'GET: /api/user/signout\'', () => {
  it('should successfully sign out a user', (done) => {
    chai.request(app)
    .get('/api/v1/user/signout')
    .set('token', token)
    .end((err, res) => {
      res.should.have.status(200);
      res.body.should.have.property('success').equals(true);
      done();
    });
  });

  it('should not signout a user with no token', (done) => {
    chai.request(app)
    .get('/api/v1/user/signout')
    .end((err, res) => {
      res.should.have.status(403);
      res.body.should.have.property('success').equals(false);
      done();
    });
  });

  it('should not signout a user with an invalid token', (done) => {
    chai.request(app)
    .get('/api/v1/user/signout')
    .set('token', 'invalid token')
    .end((err, res) => {
      res.should.have.status(401);
      res.body.should.have.property('success').equals(false);
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
  it('should successfully search for other users', (done) => {
    chai.request(app)
    .post('/api/v1/users/list/0')
    .set('token', token)
    .send(mockData.searchParameter1)
    .end((err, res) => {
      res.should.have.status(200);
      res.body.should.have.property('success').equals(true);
      done();
    });
  });

  it('should not search when no search or limit parameter is sent', (done) => {
    chai.request(app)
    .post('/api/v1/users/list/0')
    .set('token', token)
    .send()
    .end((err, res) => {
      res.should.have.status(400);
      res.body.should.have.property('success').equals(false);
      done();
    });
  });
});

describe('Forgot password route \'POST: /api/forgot/password\'', () => {
  it('should successfully send resetToken', (done) => {
    chai.request(app)
    .post('/api/v1/forgot/password')
    .set('token', token)
    .send({
      email: 'seyi@email.com'
    })
    .end((err, res) => {
      res.should.have.status(200);
      resetToken = res.body.resetToken;
      done();
    });
  });

  it('should not send resetToken if email is not sent', (done) => {
    chai.request(app)
    .post('/api/v1/forgot/password')
    .set('token', token)
    .send()
    .end((err, res) => {
      res.should.have.status(400);
      done();
    });
  });

  it('should not send resetToken if no user is on the platforom with the email', (done) => {
    chai.request(app)
    .post('/api/v1/forgot/password')
    .set('token', token)
    .send(mockData.userData3)
    .end((err, res) => {
      res.should.have.status(400);
      done();
    });
  });

  describe('Authenticate reset token route \'POST: /api/v1/reset/token\'', () => {
    it('should successfully authenticate the restToken', (done) => {
      chai.request(app)
      .post('/api/v1/reset/token')
      .send({
        token: resetToken
      })
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
    });

    it('should not authenticate if no token is provided', (done) => {
      chai.request(app)
      .post('/api/v1/reset/token')
      .send()
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
    });

    it('should not authenticate when token authentication fails', (done) => {
      chai.request(app)
      .post('/api/v1/reset/token')
      .send({
        token: mockData.token
      })
      .end((err, res) => {
        res.should.have.status(403);
        done();
      });
    });
  });

  describe('Update Password route \'/api/v1/reset/password/:token\'', () => {
    it('should update the password when successful', () => {
      chai.request(app)
      .post(`/api/v1/reset/password/${resetToken}`)
      .send(mockData.updatePassword1)
      .end((err, res) => {
        res.should.have.status(201);
      });
    });

    it('should not update password if resetToken is wrong', () => {
      chai.request(app)
      .post(`/api/v1/reset/password/${mockData.token}`)
      .send(mockData.updatePassword1)
      .end((err, res) => {
        res.should.have.status(401);
      });
    });

    it('should not update if request body validation fails', () => {
      chai.request(app)
      .post(`/api/v1/reset/password/${resetToken}`)
      .send(mockData.updatePassword2)
      .end((err, res) => {
        res.should.have.status(401);
      });
    });
  });
});
