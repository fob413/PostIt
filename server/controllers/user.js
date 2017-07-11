const Users = require('../models').Users;

module.exports = {

  create(req, res) {
    return Users
    .create({
      UserName: req.body.UserName,
      password: req.body.password,
      email: req.body.email
    })
    .then(user => res.status(201).send(user))
    .catch(error => res.status(400).send(error));
  },

  list(req, res) {
    return Users
    .all()
    .then(user => res.status(201).send(user))
    .catch(error => res.status(400).send(error));
  }

};
