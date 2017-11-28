import chai from 'chai';
import models from '../../models';

const should = chai.should();

describe('Database models', () => {
  it('should include User model', () => {
    should.exist(models.Users);
  });

  it('should include Group model', () => {
    should.exist(models.Groups);
  });

  it('should include GroupMember model', () => {
    should.exist(models.GroupMembers);
  });

  it('should include Messages model', () => {
    should.exist(models.Messages);
  });
});
