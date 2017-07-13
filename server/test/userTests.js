const should = require('chai').should();
const expect = require('chai').expect;
const supertest = require('supertest');

const api = supertest('http://localhost:8000');

describe('Valid User', () => {
  it('should return a 200 response', (done) => {
    api.get('/api')
    .set('Accept', 'application/json')
    .expect(200, done);
  });

  it('should signup a user', (done) => {
    api.post('/api/user/signup')
    .set('Accept', 'application/x-www-form-urlencoded')
    .send({
      UserName: 'Bayo',
      email: 'bayo@gmail.com',
      password: '1234'
    })
    .expect(201)
    .end((err, res) => {
      console.log('<,,,,,,,,,,,,-------------------' + res.body);
      expect(res.body.UserName).to.equal('Funsho');
      done();
    });
  });

  it('should not return an error signiing up a user', (done) => {
    api.post('/api/user/signup')
    .field('UserName', 'Bayo')
    .field('email', 'bayo@yahoo.com')
    .field('password', '1234')
    .end((err, res) => {
      expect(err).to.be.null;
      done();
    });
  });

  it('should signup a user', (done) => {
    api.post('/api/user/signup')
    .field('UserName', 'Titi')
    .field('email', 'Titi@yahoo.com')
    .field('password', '1234')
    .end((err, res) => {
      expect(res).to.have.status(201);
      done();
    });
  });
});
