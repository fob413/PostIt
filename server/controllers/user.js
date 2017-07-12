const bcrypt = require('bcrypt');

const Users = require('../models').Users;


module.exports = {
  list(req, res) {
    return Users
    .all()
    .then(user => res.status(200).send(user));
  },

  create(req, res) {
    return Users
    .create({
      UserName: req.body.UserName,
      password: bcrypt.hashSync(req.body.password, 11),
      email: req.body.email
    })
    .then(user => res.status(201).send({
      Username: user.UserName,
      email: user.email,
      isLoggedin: user.isLoggedin
    }))
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
          return user
          .update({
            isLoggedin: true,
          })
          .then(res.status(200).send({
            Username: user.UserName,
            isLoggedin: user.isLoggedin
          }));
        }
      } else {
        res.status(401).json('Invalid Credentials');
      }
    })
    .then(user => res.status(201).send(user))
    .catch(error => res.status(400).send(error));
  }

};
