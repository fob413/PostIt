import chai from 'chai';
import models from '../../models';
import data from '../mockData';

const should = chai.should();
const Group = models.Groups;

describe('Group model ', () => {
  it('should create a group', (done) => {
    Group.create(data.group1).then((newGroup) => {
      newGroup.groupName.should.equal(data.group1.groupName);
      done();
    });
  });

  it('should not create a group if groupName is null', (done) => {
    Group.create(data.group2).then().catch((error) => {
      error.errors[0].message.should.equal('groupName cannot be null');
      done();
    });
  });
});

