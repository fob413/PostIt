import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../app';
import db from '../models/index';

const user = db.Users;
const group = db.Groups;
const groupMember = db.GroupMembers;

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

  clearGroupDatabase() {
    group.destroy({
      where: {},
      truncate: true,
      restartIdentity: true,
      cascade: true
    });
  },

  clearGroupMemberDatabase() {
    groupMember.destroy({
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

  testUser7: {
    userName: 'test1',
    email: 'test1@yahoo.com',
    password: 'asdf;lkj',
    telephone: '08138498176'
  },

  testUser8: {
    userName: 'test2',
    email: 'test2@yahoo.com',
    password: 'asdf;lkj',
    telephone: '08138498177'
  },

  testUser9: {
    userName: 'test3',
    email: 'test3@yahoo.com',
    password: 'asdf;lkj',
    telephone: '08138498178'
  },

  incompleteUser1: {
    userName: 'Bayo',
    email: 'bayo@yahoo.com'
  }
};
