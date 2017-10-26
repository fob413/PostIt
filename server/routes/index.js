import path from 'path';
import usersController from '../controllers/user';
import groupsController from '../controllers/groups';
import groupMembersController from '../controllers/groupMembers';
import messagesController from '../controllers/messages';
import auth from '../middleware/authenticate';

module.exports = (app) => {
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
  app.get('/api/user/signout', auth, usersController.signout);

  // forgot password api for the user
  app.post('/api/forgot/password', usersController.forgot);

  // update user password
  app.post('/api/reset/password/:token', usersController.reset);

  // authenticate reset password token
  app.post('/api/reset/token', usersController.authToken);

  // search the users on the platform using pagination
  app.post('/api/users/list/:offset', auth, usersController.searchUsers);

  // creates a new group on the application
  app.post('/api/group', auth, groupsController.create);

  // add a user to a particular group
  app.post('/api/group/:groupId/user', auth, groupMembersController.create);

  // list users in a particular group
  app.get('/api/group/:groupId/user/list', auth, groupMembersController.listGroupUsers);

  // logged in users retrieve groups they have been added to
  app.get('/api/group/list', auth, groupsController.listGroups);

  // posts a message to a particular group
  // app.post('/api/group/:groupId/message', messagesController.create);
  app.post('/api/group/:groupId/message', auth, messagesController.sendMessage);

  // logged in users retrieve their messages in a particular group
  app.get('/api/group/:groupId/messages', auth, messagesController.listMessages);

  // updates messages that users have read
  app.post('/api/group/:groupId/messages/read', auth, messagesController.readMessages);

  // a get all for the starty page of the app
  app.get('/*', (req, res) => {
    res.status(200)
    .sendFile(
    path.join(__dirname, '../index.html'
    ));
  });
};
