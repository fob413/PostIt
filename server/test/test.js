process.env.NODE_ENV = 'development';

const user = require('../models').User;

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

const should = chai.should();

chai.use(chaiHttp);
/*
describe('user', () => {
  beforeEach((done) => {
    user.destroy({
      where: {},
      truncate: true,
      restartIdentity: true,
      cascade: true,
    });
    done();
  });
*/
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

describe('user', () => {
  beforeEach((done) => {
    user.destroy({
      where: {},
      truncate: true,
      restartIdentity: true,
      cascade: true,
    });
    done();
  });
});
