import chai from 'chai';
import model from '../../models';
import data from '../mockData';

const should = chai.should();

const Messages = model.Messages;

describe('Message model ', () => {
  it('should create a message', (done) => {
    Messages.create(data.message1).then((newMessage) => {
      newMessage.content.should.equal(data.message1.content);
      newMessage.authorsName.should.equal(data.message1.authorsName);
      newMessage.priorityValue.should.equal(data.message1.priorityValue);
      done();
    });
  });

  it('should not create a message if content is null', (done) => {
    Messages.create(data.message2).then().catch((error) => {
      error.errors[0].message.should.equal('content cannot be null');
      done();
    });
  });

  it('should not create a message if authorsName is null', (done) => {
    Messages.create(data.message3).then().catch((error) => {
      error.errors[0].message.should.equal('authorsName cannot be null');
      done();
    });
  });

  it('should create a message with a priorityValue of Normal if there\'s no prioriryValue', (done) => {
    Messages.create(data.message4).then((newMessage) => {
      newMessage.priorityValue.should.equal('NORMAL');
      done();
    });
  });
});
