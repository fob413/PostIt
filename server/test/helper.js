import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../app';
import db from '../models/index';

const user = db.Users;

chai.use(chaiHttp);

module.exports = {
  clearUserDatabase() {
    user.destroy({
      where: {},
      truncate: true,
      restartIdentity: true,
      cascade: true
    });
  },

  signup(userName, email, password, telephone) {
    let token = '';
    chai.request(app)
    .post('/api/user/signup')
    .send(
      {
        userName,
        email,
        password,
        telephone
      }
    )
    .end((err, res) => {
      token = res.body.token;
    });
    return token;
  },

  testUser1: {
    userName: 'Bayo',
    email: 'bayo@yahoo.com',
    password: 'abcdefghij',
    telephone: '08138498175'
  },

  testUser2: {
    userName: 'funsho',
    email: 'funsho@gmail.com',
    password: 'asdf;lkj',
    telephone: '12345678901'
  },

  testUser3: {
    userName: 'fob',
    email: 'funsho@gmail.com',
    password: 'asdf;lkj',
    telephone: '12345678901'
  },

  testUser4: {
    userName: 'fob',
    email: 'fob@gmail.com',
    password: 'asdf;lkj',
    telephone: '12345678901'
  },

  testUser5: {
    userName: 'Bayo',
    email: 'bayo@yahoo.com',
    password: 'asdf;lkj',
    telephone: '08138498175'
  },

  testUser6: {
    email: 'funsho@gmail.com'
  },

  incompleteUser1: {
    userName: 'Bayo',
    email: 'bayo@yahoo.com'
  }
};
