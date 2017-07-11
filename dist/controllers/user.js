'use strict';

var User = require('../models').User;

module.exports = {
  create: function create(req, res) {
    return User.create({

      userName: req.body.userName,
      password: req.body.password,
      email: req.body.email

    }).then(function (user) {
      return res.status(201).send(user);
    }).catch(function (error) {
      return res.status(400).send(error);
    });
  }
};