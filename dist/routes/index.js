'use strict';

var usersController = require('../controllers/user');
var groupsController = require('../controllers/groups');
var membersController = require('../controllers/members');
var messagesController = require('../controllers/messages');

module.exports = function (app) {
  // a get all api for users signup
  app.get('/api/user/signup', function (req, res) {
    return res.status(200).send({
      message: 'Hi, Welcome to PostIt'
    });
  });

  // list out all the registered users
  app.get('/api/user', usersController.list);

  // signup a user into the application
  app.post('/api/user/signup', usersController.create);

  // signin a user into the application
  app.patch('/api/user/signin', usersController.signin);

  // a get all api for group
  app.get('/api/group', function (req, res) {
    return res.status(200).send({
      message: 'Hi, Welcome to Groups in PostIt'
    });
  });

  // list out all the available groups on the application
  app.get('/api/group/list', groupsController.list);

  // creates a new group on the application
  app.post('/api/group', groupsController.create);

  // list all the members
  app.get('/api/group/:groupId/user', membersController.list);

  // add a user to a particular group
  app.post('/api/group/:groupId/user', membersController.create);

  // a get all spi for users messages
  app.get('/api/group/message', function (req, res) {
    return res.status(200).send({
      message: 'Hi, welcome to users messages'
    });
  });

  // list all the messages
  app.get('/api/group/:groupId/message', messagesController.list);

  // posts a message to a particular group
  app.post('/api/group/:groupId/message', messagesController.create);

  // logged in users retrieve their messages
  app.get('/api/group/:groupId/messages', messagesController.listMessages);
};