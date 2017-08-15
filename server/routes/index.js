import path from 'path';
import usersController from '../controllers/user';
import groupsController from '../controllers/groups';
import membersController from '../controllers/members';
import messagesController from '../controllers/messages';
import clearController from '../controllers/clear';

module.exports = (app) => {
  // a get all for the starty page of the app
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/src/index.html'));
  });

  // a get all api for users signup
  app.get('/api/user/signup', (req, res) => res.status(200).send({
    message: 'Hi, Welcome to PostIt',
  }));

  // a get all api for group
  app.get('/api/group', (req, res) => res.status(200).send({
    message: 'Hi, Welcome to Groups in PostIt',
  }));

  // a get all api for users messages
  app.get('/api/group/message', (req, res) => res.status(200).send({
    message: 'Hi, welcome to users messages',
  }));
  // signup a user into the application
  app.post('/api/user/signup', usersController.create);

  // signin a user into the application
  app.post('/api/user/signin', usersController.signin);

  // signout a user from the application
  app.get('/api/user/signout', usersController.signout);

  // list all the users on the platform
  app.get('/api/users/list', usersController.list);

  // creates a new group on the application
  app.post('/api/group', groupsController.create);

  // add a user to a particular group
  app.post('/api/group/:groupId/user', membersController.create);

  // list users in a particular group
  app.get('/api/group/:groupId/user/list', membersController.listGroupUsers);

  // logged in users retrieve groups they have been added to
  app.get('/api/group/list', groupsController.listGroups);

  // posts a message to a particular group
  // app.post('/api/group/:groupId/message', messagesController.create);
  app.post('/api/group/:groupId/message', messagesController.sendMessage);

  // logged in users retrieve their messages
  app.get('/api/group/:groupId/messages', messagesController.listMessages);

  // list all the members
  // app.get('/api/group/:groupId/user', membersController.list);
  // list out all the available groups on the application
  // app.get('/api/group/list', groupsController.list);
  // to be removed list out all the registered users
  app.get('/api/clear/users', clearController.clearUsers);
  app.get('/api/clear/groups', clearController.clearGroups);
  app.get('/api/clear/members', clearController.clearMembers);
  app.get('/api/clear/messages', clearController.clearMessages);
  // list all the messages
  // app.get('/api/group/:groupId/message', messagesController.list);
};
