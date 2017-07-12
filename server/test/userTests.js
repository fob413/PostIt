const should = require('chai').should();
const expect = require('chai').expect;
const supertest = require('supertest');

const api = supertest('http://localhost:8000');

describe('User', () => {
  it('should return a 200 response', (done) => {
    api.get('/api')
    .set('Accept', 'application/json')
    .expect(200, done);
  });
});
