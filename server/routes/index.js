const usersController = require('../controllers').users;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Hi, Welcome to PostIt',
  }));

  app.post('api/user/signup', usersController.create);
};
