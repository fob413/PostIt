import chai from 'chai';
import models from '../../models';
import mockData from '../mockData';

const should = chai.should();
const Users = models.Users;

let userId;

describe('User model', () => {
  it('should create a user', (done) => {
    Users.create(mockData.user1).then((newUser) => {
      newUser.userName.should.equal(mockData.user1.userName);
      newUser.email.should.equal(mockData.user1.email);
      newUser.telephone.should.equal(mockData.user1.telephone);
      userId = newUser.id;
    });
    done();
  });

  it('should not create a user when userName is null', (done) => {
    Users.create(mockData.errorUser1).then().catch((error) => {
      error.errors[0].message.should.equal('userName cannot be null');
    });
    done();
  });

  it('should not create a user when password is null', (done) => {
    Users.create(mockData.errorUser2).then().catch((error) => {
      error.errors[0].message.should.equal('password cannot be null');
    });
    done();
  });

  it('should not create a user when email is null', (done) => {
    Users.create(mockData.errorUser3).then().catch((error) => {
      error.errors[0].message.should.equal('email cannot be null');
    });
    done();
  });

  it('should not create a user when telephone is null', (done) => {
    Users.create(mockData.errorUser4).then().catch((error) => {
      error.errors[0].message.should.equal('telephone cannot be null');
    });
    done();
  });
});

