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

  signin(req, res) {
    return Users
    .findOne({
      where: {
        UserName: req.body.UserName
      }
    })
    .then((user) => {
      if (user) {
        if (user.password !== req.body.password) {
          return 'Invalid Username or Password';
        } else {
          return 'Successfully logged in';
        }
      } else {
        return 'User is not on the platform';
      }
    })
    .then(user => res.status(201).send(user))
    .catch(error => res.status(400).send(error));
  }

};
