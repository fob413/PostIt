import chai from 'chai';
import models from '../../models';
import mockData from '../mockData';

const shuold = chai.should();
const GroupMember = models.GroupMembers;

describe('GroupMember model', () => {
  it('should create a new GroupMember', (done) => {
    GroupMember.create(mockData.groupMember1).then((newGroupMember) => {
      newGroupMember.userId.should.equal(mockData.groupMember1.userId);
      newGroupMember.groupId.should.equal(mockData.groupMember1.groupId);
      done();
    });
  });

  it('should not create a new GroupMember if userId is null', (done) => {
    GroupMember.create(mockData.groupMember2).then().catch((error) => {
      error.errors[0].message.should.equal('userId cannot be null');
      done();
    });
  });

  it('should not create a new GroupMember if groupId is null', (done) => {
    GroupMember.create(mockData.groupMember3).then().catch((error) => {
      error.errors[0].message.should.equal('groupId cannot be null');
      done();
    });
  });
});

