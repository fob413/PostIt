const usersController = require('../controllers/user');
const groupsContoller = require('../controllers/groups');

module.exports = (app) => {
  app.get('/api/user/signup', (req, res) => res.status(200).send({
    message: 'Hi, Welcome to PostIt',
  }));

  app.post('/api/user/signup', usersController.create);

  app.patch('/api/user/signin', usersController.signin);

  app.get('/api/group', (req, res) => res.status(200).send({
    message: 'Hi, Welcome to Groups in PostIt',
  }));

  app.get('/api/group/list', groupsContoller.list);

  app.post('/api/group', groupsContoller.create);

  // app.post('/api/Group', groupsContoller.list);
};
