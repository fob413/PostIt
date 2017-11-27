import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../../app';
import models from '../../models';

const user = models.Users;
const group = models.Groups;
const groupMember = models.GroupMembers;
const message = models.Messages;

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

  clearMessagesDatabase() {
    message.destroy({
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
    telephone: '0987654321'
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

  testUser10: {
    userName: 'Bayo',
    email: 'funsho@gmail.com',
    password: 'asdf;lkj',
    telephone: '12345678901'
  },

  testUser11: {
    userName: 'test11',
    email: 'seyi@email.com',
    password: 'asdf;lkj',
    telephone: '1029384756'
  },

  testUser12: {
    userName: 'seyi',
    email: 'seyi@email.com',
    telephone: '0987654321',
    password: 'asdf;lkj'
  },

  incompleteUser1: {
    userName: 'Bayo',
    email: 'bayo@yahoo.com'
  }
};
