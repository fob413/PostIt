const bcrypt = require('bcrypt');

const Users = require('../models').Users;


module.exports = {

  create(req, res) {
    return Users
    .create({
      UserName: req.body.UserName,
      password: bcrypt.hashSync(req.body.password, 11),
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
        if (!bcrypt.compareSync(req.body.password, user.password)) {
          res.status(401).json('Invalid Username or Password');
        } else {
          res.status(200).json('Successfully logged in');
        }
      } else {
        res.status(401).json('Not a user on the platform');
      }
    })
    .then(user => res.status(201).send(user))
    .catch(error => res.status(400).send(error));
  }

};
