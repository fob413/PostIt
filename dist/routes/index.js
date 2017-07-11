'use strict';

var usersController = require('../controllers').users;

module.exports = function (app) {
  app.get('/api', function (req, res) {
    return res.status(200).send({
      message: 'Hi, Welcome to PostIt'
    });
  });

  app.post('api/user/signup', usersController.create);
};