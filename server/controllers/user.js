import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../models/index';
import crypto from 'crypto';
import { sendResetMail, sendSuccessfulResetMail } from './priority';

require('dotenv').config();

const secret = process.env.SECRET_TOKEN;

const Users = db.Users;
// const bcrypt = require('bcrypt');
// const Users = require('../models').Users;

// function definitions

// message sent for invalid inputs
const invalid = {
  success: false,
  message: 'Invalid Credentials'
};


export default {
  list(req, res) {

    if (req.header('x-auth')) {
      const token = req.header('x-auth');
      jwt.verify(token, secret, (err, decoded) => {
        if (err) {
          return res.json({
            success: false,
            message: 'failed to authenticaate token'
          });
        } else {
          req.decoded = decoded;
          return Users
          .findOne({
            where: {
              UserName: req.decoded.UserName
            }
          })
          .then(user => {
            if(user.isLoggedin){
              Users.all( {
                attributes:['id','UserName']
              })
              .then(allUsers => res.status(200).send(allUsers))
              .catch(err => res.status(400).send({
                success: false,
                message: err.message
              }));
            } else {
              return res.status(401).send({
                success: false,
                message: 'Login to access this service'
              });
            }
          })
          .catch(err => res.status(400).send({
            success: false,
            error: err.message
          }));
        }
      });
    } else {
      return res.status(403).send({
        success: false,
        message: 'no token provided'
      });
    }
  },

  create(req, res) {
    if (req.body.UserName.length > 0) {
      if (req.body.password.length > 7) {
        if (req.body.telephone) {
          if (req.body.telephone.length == 11 && !isNaN(req.body.telephone)) {
            return Users
            .create({
              UserName: req.body.UserName,
              password: bcrypt.hashSync(req.body.password, 11),
              email: req.body.email,
              telephone: req.body.telephone
            })
            .then((user) => {
              const token = jwt.sign({
                UserName: user.UserName,
                email: user.email,
                telephone: user.telephone
              }, secret);
              res.status(201).json({
                success: true,
                UserName: user.UserName,
                email: user.email,
                isLoggedin: user.isLoggedin,
                telephone: user.telephone,
                token
              });
            })
            .catch(err => res.status(400).send({
              success: false,
              message: err.message
            }));
          } else {
            res.status(400).send({
              success: false,
              message: 'Telephone must be a numbers of 11 characters'
            });
          }
        } else {
          res.status(400).send({
            success: false,
            message: 'Please input your phone number'
          });
        }
      } else {
        res.status(400).send({
          success: false,
          message: 'Password must be at least 8 characters'
        });
      }
    } else {
      res.status(400).send({
        success: false,
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
            .then(() => {
              const token = jwt.sign({
                UserName: user.UserName,
                email: user.email,
                telephone: user.telephone
              }, secret, {expiresIn: '1 day'});
              res.status(201).json({
                success: true,
                UserName: user.UserName,
                email: user.email,
                isLoggedin: user.isLoggedin,
                telephone: user.telephone,
                token
              });
            })
            .catch(err =>  {
              console.log(err);
              res.status(400).send({
                success: false,
              message: err.message
            });
          }
          );
          }
        } else {
          res.status(401).json(invalid)
          .catch(error => {
            res.status(400).send(error.message)});
        }
      } else {
        res.status(401).send(invalid)
        .catch(error => res.status(400).send(error.message));
      }
    })
    .catch(error => {
      console.log(error);
      res.status(400).send(error)});
  },

  signout(req, res) {
    if (req.header('x-auth')){
      const token = req.headers['x-auth'];
      jwt.verify(token, secret, (err, decoded) => {
        if (err) {
          return res.status(403).json({
            success: false,
            message: 'failed to authenticate token'
          });
        } else {
          req.decoded = decoded;
          return Users
          .findOne({
            where: {
              UserName: req.decoded.UserName
            }
          })
          .then(user => {
            user.update({
              isLoggedin: false
            })
            .then(res.status(200).send({
              message: 'successfully logged out',
              isLoggedin: user.isLoggedin
            }))
            .catch(err => res.status(400).send(err.message));
          })
          .catch(err => res.status(400).send(err.message));
        }
      })
    } else {
      return res.status(403).send({
        success: false,
        message: 'no token provided'
      });
    }
  },

  forgot(req, res) {
    if (!req.body.email) {
      res.status(400).send({
        success: false,
        message: 'No email provided'
      });
    } else {
      return Users.findOne({
        where: {
          email: req.body.email
        }
      })
      .then(user => {
        if (!user) {
          res.status(400).send({
            success: false,
            message: 'user not found'
          });
        } else {
          const token = crypto.randomBytes(20).toString('hex');
          user.update({
            resetPasswordToken: token,
            expiryTime: Date.now() + 3600000
          }, err => {
            res.status(400).send({
              success: false,
              message: err.message
            });
          })
          .then(updatedUser => {
            res.send({
              success: true
            });
            sendResetMail(updatedUser.resetPasswordToken, updatedUser.email, req.headers.host);
          }, err => {
            res.status(400).send({
              success: false,
              message: err.message
            });
          });
        }
      }, err => {
        res.status(400).send({
          success: false,
          message: err.message
        });
      });
    }
  },

  reset(req, res) {
    return Users
    .findOne({
      where: {
        resetPasswordToken: req.params.token
      }
    })
    .then(user => {
      if (!user) {
        res.status(400).send({
          success: false,
          message: 'failed token authentication'
        });
      } else {
        console.log(Date.now());
        console.log(user.expiryTime);
        if ((Date.now()) > user.expiryTime) {
          user.update({
            resetPasswordToken: null,
            expiryTime: null
          })
          .then(() => {
            res.status(400).send({success: false});
          }, err => res.status(400).send(err.message));
        } else {
          if (req.body.newPassword &&
            req.body.newPassword.length > 7 &&
            req.body.confirmPassword &&
            req.body.confirmPassword.length > 7 &&
            (req.body.newPassword == req.body.confirmPassword)
          ) {
            user.update({
              password: bcrypt.hashSync(req.body.confirmPassword, 11),
              resetPasswordToken: null,
              expiryTime: null
            })
            .then(updatedUser => {
              sendSuccessfulResetMail(updatedUser.email);
              res.status(201).send({
                success: true,
                message: 'successfully updated password'
              });
            }, err => {
              res.status(400).send({
                success: false,
                message: err.message
              });
            });
          } else {
            res.status(400).send({
              success: false,
              message: 'invalid passwords'
            });
          }
        }
      }
    }, err => {
      res.status(400).send({
        success: false,
        message: err.message
      });
    });
  },

  authToken(req, res) {
    if (!req.body.token) {
      res.status(400).send({
        success: false,
        message: 'No token provided'
      });
    } else {
      return Users
      .findOne({
        where: {
          resetPasswordToken: req.body.token
        }
      })
      .then(user => {
        if (!user) {
          res.status(400).send({
            success: false,
            message: 'failed token authentication'
          });
        } else {
          res.status(200).send({
            success: true,
            message: 'valid token',
            UserName: user.UserName
          });
        }
      }, err => {
        res.status(400).send({
          success: false,
          message: err.message
        });
      });
    }
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
