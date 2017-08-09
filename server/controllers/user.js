import bcrypt from 'bcrypt';
import db from '../models/index';

const Users = db.Users;
// const bcrypt = require('bcrypt');
// const Users = require('../models').Users;

// function definitions

// message sent for invalid inputs
const invalid = {
  message: 'Invalid Credentials'
};


export default {
  list(req, res) {
    return Users
    .all()
    .then(user => res.status(200).send(user));
  },

  create(req, res) {
    if (req.body.UserName.length > 0) {
      if (req.body.password.length > 7) {
        return Users
        .create({
          UserName: req.body.UserName,
          password: bcrypt.hashSync(req.body.password, 11),
          email: req.body.email
        })
        .then(user => res.status(201).send({
          id: user.id,
          Username: user.UserName,
          email: user.email,
          isLoggedin: user.isLoggedin
        }))
        .catch(error => res.status(400).send({
          message: error.message
        }));
      } else {
        res.status(400).send({
          message: 'Password must be at least 8 characters'
        });
      }
    } else {
      res.status(400).send({
        message: 'Username cannot be an empty field'
      });
    }
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
        if (req.body.password) {
          if (!bcrypt.compareSync(req.body.password, user.password)) {
            res.status(401).send(invalid);
          } else {
            return user
            .update({
              isLoggedin: true,
            })
            .catch(error => res.status(400).send(error.message))
            .then(res.status(200).send({
              Username: user.UserName,
              isLoggedin: user.isLoggedin
            }))
            .catch(error => res.status(400).send(error.message));
          }
        } else {
          res.status(401).json(invalid)
          .catch(error => res.status(400).send(error.message));
        }
      } else {
        res.status(401).send(invalid)
        .catch(error => res.status(400).send(error.message));
      }
    })
    .catch(error => res.status(400).send(error));
  },

  signout(req, res) {
    return Users
    .findOne({
      where: {
        UserName: req.body.UserName
      }
    })
    .then(user => {
      user.update({
        isLoggedin: false,
      })
      .then(res.status(200).send({
        message: 'successfully logged out',
        isLoggedin: user.isLoggedin
      }))
      .catch(err => res.status(400).send(err.message));
    })
    .catch(err => res.status(400).send(err.message));
  }


/*
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
   }*/

};
