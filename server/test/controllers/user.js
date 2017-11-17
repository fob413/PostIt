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
} from '../helper';

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
});

describe('Signup route POST /api/user/signup', () => {
  describe('Signup Positive Responses ', () => {
    it('it should return a status of 201 on successful signup', (done) => {
      chai.request(app)
      .post('/api/v1/user/signup')
      .send(testUser1)
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
    });
  });

  describe('Signup Negative Responses ', () => {
    before((done) => {
      signup('funsho', 'funsho@gmail.com', 'asdf;lkj', '12345678901');
      done();
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
        expect(res.body.message).to.equal('Invalid credentials');
        done();
      });
    });

    it('should return a message Invalid credentials when a user object is incomplete', (done) => {
      chai.request(app)
      .post('/api/v1/user/signup')
      .send(incompleteUser1)
      .end((err, res) => {
        expect(res.body.message).to.equal('Invalid credentials');
        done();
      });
    });

    it('should return a status of 400 if username is already in use', (done) => {
      chai.request(app)
      .post('/api/v1/user/signup')
      .send(testUser10)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
    });

    it('should return a status of 400 if email is already in use', (done) => {
      chai.request(app)
      .post('/api/v1/user/signup')
      .send(testUser11)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
    });

    it('should return a status of 400 if telephone number is already in use', (done) => {
      chai.request(app)
      .post('/api/v1/user/signup')
      .send(testUser4)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
    });
  });
});

describe('Signin route POST /api/user/signin', () => {
  describe('Signin Positive Responses ', () => {
    before((done) => {
      signup('funsho', 'funsho@gmail.com', 'asdf;lkj', '12345678901');
      done();
    });

    it('it should return a status 200 on successful signin', (done) => {
      chai.request(app)
      .post('/api/v1/user/signin')
      .send(testUser12)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
    });
  });

  describe('Siginin Negative Responses ', () => {
    before((done) => {
      // clearUserDatabase();
      signup('titi', 'titi@gmail.com', 'asdf;lkj', '123456789012');
      done();
    });

    it('it should return a status 400 if no user object is sent', (done) => {
      chai.request(app)
      .post('/api/v1/user/signin')
      .send()
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
    });

    it('it should return a status 401 when user is not found', (done) => {
      chai.request(app)
      .post('/api/v1/user/signin')
      .send({
        userName: 'McDavid',
        password: 'asdf;lkj'
      })
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
    });

    it('it should return a status 401 when password is wrong', (done) => {
      chai.request(app)
      .post('/api/v1/user/signin')
      .send(testUser5)
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
    });
  });
});

describe('Signout route, GET /api/user/signout', () => {
  describe('Signout positive response ', () => {
    it('should return a status of 200 on successful signout', (done) => {
      chai.request(app)
      .get('/api/v1/user/signout')
      .set('token', token)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
    });
  });

  describe('Signout negative response ', () => {
    it('should return a status of 403 when no token is sent', (done) => {
      chai.request(app)
      .get('/api/v1/user/signout')
      .end((err, res) => {
        res.should.have.status(403);
        done();
      });
    });

    it('should return a status of 403 when no token sent is invalid', (done) => {
      chai.request(app)
      .get('/api/v1/user/signout')
      .set('token', 'asdlkfjasl;dfjoiuwajefi;ajsdi;dujas')
      .end((err, res) => {
        res.should.have.status(403);
        done();
      });
    });

    it('should return a message when no token sent is invalid', (done) => {
      chai.request(app)
      .get('/api/v1/user/signout')
      .set('token', 'asdlkfjasl;dfjoiuwajefi;ajsdi;dujas')
      .end((err, res) => {
        expect(res.body.message).to.equal('failed to authenticate token');
        done();
      });
    });
  });
});

describe('Search Users Route /api/users/list/:offset', () => {
  describe('Search users positive response ', () => {
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
  });

  describe('Search users negative response ', () => {
    it('should return a status of 400 when request object fails validation', (done) => {
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
});

describe('Forgot password route /api/forgot/password', () => {
  describe('Forgot password positive response ', () => {
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
  });

  describe('Forgot password negative response ', () => {
    it('it should return a status of 400 when email is not sent', (done) => {
      chai.request(app)
      .post('/api/v1/forgot/password')
      .set('token', token)
      .send()
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
    });

    it('it should return a status of 400 when no users is on the platforom with the email', (done) => {
      chai.request(app)
      .post('/api/v1/forgot/password')
      .set('token', token)
      .send({
        email: 'nouseremail@email.com'
      })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
    });
  });
});
