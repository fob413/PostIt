import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../app';
import models from '../models';

process.env.NODE_ENV = 'test';
const should = chai.should();
chai.use(chaiHttp);

models.Users.destroy({
  cascade: true,
  truncate: true,
  restartIdentity: true
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

describe('Signs up a new user', () => {
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
});
