const usersController = require('../controllers/user');
const groupsController = require('../controllers/groups');
const membersController = require('../controllers/members');

module.exports = (app) => {
  app.get('/api/user/signup', (req, res) => res.status(200).send({
    message: 'Hi, Welcome to PostIt',
  }));

  // list out all the registered users
  app.get('/api/user', usersController.list);

  // signup a user into the application
  app.post('/api/user/signup', usersController.create);

  // signin a user into the application
  app.patch('/api/user/signin', usersController.signin);

  // a get all api for group
  app.get('/api/group', (req, res) => res.status(200).send({
    message: 'Hi, Welcome to Groups in PostIt',
  }));

  // list out all the available groups on the application
  app.get('/api/group/list', groupsController.list);

  // creates a new group on the application
  app.post('/api/group', groupsController.create);

  // list all the members
  app.get('/api/group/:groupId/user', membersController.list);

  // ass a user to a particular group
  app.post('/api/group/:groupId/user', membersController.create);
};
