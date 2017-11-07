import chai from 'chai';
import models from '../../models';
import data from '../data';

const should = chai.should();
const Users = models.Users;

let userId;

describe('User model', () => {
  it('should create a user', (done) => {
    Users.create(data.user1).then((newUser) => {
      newUser.userName.should.equal(data.user1.userName);
      newUser.email.should.equal(data.user1.email);
      newUser.telephone.should.equal(data.user1.telephone);
      userId = newUser.id;
    });
    done();
  });

  it('should not create a user when userName is null', (done) => {
    Users.create(data.errorUser1).then().catch((error) => {
      error.errors[0].message.should.equal('userName cannot be null');
    });
    done();
  });

  it('should not create a user when password is null', (done) => {
    Users.create(data.errorUser2).then().catch((error) => {
      error.errors[0].message.should.equal('password cannot be null');
    });
    done();
  });

  it('should not create a user when email is null', (done) => {
    Users.create(data.errorUser3).then().catch((error) => {
      error.errors[0].message.should.equal('email cannot be null');
    });
    done();
  });

  it('should not create a user when telephone is null', (done) => {
    Users.create(data.errorUser4).then().catch((error) => {
      error.errors[0].message.should.equal('telephone cannot be null');
    });
    done();
  });

  it('should update a user\'s password', (done) => {
    Users.findById(userId).then((user) => {
      user.update({ password: data.newPassword })
      .then((updatedUser) => {
        updatedUser.dataValues.id.should.equal(userId);
        updatedUser.dataValues.password.should.equal(data.newPassword);
        done();
      });
    });
  });
});

