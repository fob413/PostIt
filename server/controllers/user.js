import bcrypt from 'bcrypt';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import db from '../models/index';
import paginate from '../middleware/paginate';
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
  /**
   * api controller lists all the users on the platform
   * @param {object} req users information object
   * @param {object} res servers response
   * @return {void}
   */
  // list(req, res) {
  //   // token authentication
  //   if (req.header('x-auth')) {
  //     const token = req.header('x-auth');
  //     jwt.verify(token, secret, (err, decoded) => {
  //       if (err) {
  //         // response for failed authentication
  //         return res.json({
  //           success: false,
  //           message: 'failed to authenticaate token'
  //         });
  //       } else {
  //         req.decoded = decoded;
  //         return Users
  //         .findOne({
  //           where: {
  //             UserName: req.decoded.UserName
  //           }
  //         })
  //         .then(user => {
  //           if(user.isLoggedin){
  //             Users.all( {
  //               attributes:['id','UserName']
  //             })
  //             .then(allUsers => res.status(200).send(allUsers))
  //             .catch(err => res.status(400).send({
  //               success: false,
  //               message: err.message
  //             }));
  //           } else {
  //             return res.status(401).send({
  //               success: false,
  //               message: 'Login to access this service'
  //             });
  //           }
  //         })
  //         .catch(err => res.status(400).send({
  //           success: false,
  //           error: err.message
  //         }));
  //       }
  //     });
  //   } else {
  //     // response for failed authentication
  //     return res.status(403).send({
  //       success: false,
  //       message: 'no token provided'
  //     });
  //   }
  // },

  /**
   * api controller lists all the users on the platform
   * @param {object} req users information object
   * @param {object} res
   * @return {void}
   */
  searchUsers(req, res) {
    if (!req.header('x-auth')) {
      return res.status(403).send({
        success: false,
        message: 'no token provided'
      });
    } else {
      if (!req.body.UserName) {
        return res.status(400).send({
          success: false,
          message: 'no search parameter',
          users: []
        });
      } else {
        const token = req.header('x-auth');
        jwt.verify(token, secret, (err, decoded) => {
          if (err) {
            return res.status(403).send({
              success: false,
              message: 'failed to authenticate token'
            });
          } else {
            req.decoded = decoded;
            return Users
            .findAndCountAll({
              offset: req.params.offset * 5,
              limit: 5,
              where: {
                UserName: { $like: `%${req.body.UserName}%` }
              },
              attributes: ['id', 'UserName']
            })
            .then((users) => {
              res.status(200).send({
                success: true,
                users,
                data: paginate(users.count, 5, req.params.offset * 5)
              });
            }, (err) => {
              res.status(400).send({
                success: false,
                message: 'an error occured searching users',
                error: err.message,
                users: []
              });
            });
          }
        });
      }
    }
  },

  /**
   * api controller to signup a new user
   * @param {object} req users object information
   * @param {object} res servers response
   * @return {void}
   */
  create(req, res) {
    // validate users input
    if (
      req.body.UserName &&
      req.body.UserName.length > 0 &&
      req.body.password &&
      req.body.password.length > 7 &&
      req.body.email &&
      req.body.telephone &&
      req.body.telephone.length > 0 &&
      !isNaN(req.body.telephone)
    ) {
      return Users.findOne({
        where: {
          UserName: req.body.UserName
        }
      })
      .then((username) => {
        // check if username is hasn't been used
        if (username) {
          res.status(400).send({
            success: false,
            message: 'Username has already been taken!'
          });
        } else {
          // check if email isn't in use
          Users.findOne({
            where: {
              email: req.body.email
            }
          })
          .then((emailUsed) => {
            if (emailUsed) {
              res.status(400).send({
                success: false,
                message: 'Email already in use!'
              });
            } else {
              // check if phone number isn't in use
              Users.findOne({
                where: {
                  telephone: req.body.telephone
                }
              })
              .then((telephoneUsed) => {
                if (telephoneUsed) {
                  res.status(400).send({
                    success: false,
                    message: 'Telephone number in use by another user!'
                  });
                } else {
                  // signup the new user
                  Users.create({
                    UserName: req.body.UserName,
                    password: bcrypt.hashSync(req.body.password, 11),
                    email: req.body.email,
                    telephone: req.body.telephone
                  })
                  .then((user) => {
                    // sign and return token
                    const token = jwt.sign({
                      UserName: user.UserName,
                      email: user.email,
                      telephone: user.telephone,
                      userId: user.id
                    }, secret);
                    res.status(201).json({
                      success: true,
                      UserName: user.UserName,
                      email: user.email,
                      isLoggedin: user.isLoggedin,
                      telephone: user.telephone,
                      token,
                      userId: user.id
                    });
                  }, (err) => {
                    res.status(400).send({
                      success: false,
                      message: err.message
                    });
                  });
                }
              }, (err) => {
                res.status(400).send({
                  success: false,
                  message: err.message
                });
              });
            }
          }, (err) => {
            res.status(400).send({
              success: false,
              message: err.message
            });
          });
        }
      }, (err) => {
        res.status(400).send({
          success: false,
          message: err.message
        });
      });
    } else {
      res.status(400).send({
        success: false,
        message: 'Invalid credentials'
      });
    }
  },

  /**
   * api controller to signin a user
   * @param {object} req users information object
   * @param {object} res servers response
   * @return {void}
   */
  signin(req, res) {
    // check for username and password
    if (req.body.UserName && req.body.password) {
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
                  telephone: user.telephone,
                  userId: user.id
                }, secret);
                res.status(200).json({
                  success: true,
                  UserName: user.UserName,
                  email: user.email,
                  isLoggedin: user.isLoggedin,
                  telephone: user.telephone,
                  token,
                  userId: user.id
                });
              })
              .catch((err) => {
                res.status(400).send({
                  success: false,
                  message: err.message
                });
              }
            );
            }
          } else {
            res.status(401).json(invalid);
          }
        } else {
          res.status(401).send(invalid);
        }
      })
      .catch((error) => {
        res.status(400).send(error.message);
      });
    } else {
      res.status(400).send({
        // response for failed signin
        success: false,
        message: 'Invalid Credentials'
      });
    }
  },

  /**
   * api controller to sign out a user fron the platform
   * @param {object} req users information object
   * @param {object} res servers response
   * @return {void}
   */
  signout(req, res) {
    // authentication. Check and confirm token
    if (req.header('x-auth')) {
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
          .then((user) => {
            user.update({
              isLoggedin: false
            })
            .then(res.status(200).send({
              // response for successful signout
              success: true,
              message: 'successfully logged out',
              isLoggedin: user.isLoggedin
            }))
            .catch(err => res.status(400).send(err.message));
          })
          .catch(err => res.status(400).send(err.message));
        }
      });
    } else {
      return res.status(403).send({
        // response for failed authentication
        success: false,
        message: 'no token provided'
      });
    }
  },

  /**
   * api controller to send reset password link to mail
   * @param {object} req users information object
   * @param {object} res servers response
   * @return {void}
   */
  forgot(req, res) {
    // check for email
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
      .then((user) => {
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
          }, (err) => {
            res.status(400).send({
              success: false,
              message: err.message
            });
          })
          .then((updatedUser) => {
            res.status(200).send({
              success: true
            });
            sendResetMail(updatedUser.resetPasswordToken, updatedUser.email, req.headers.host);
          }, (err) => {
            res.status(400).send({
              success: false,
              message: err.message
            });
          });
        }
      }, (err) => {
        res.status(400).send({
          success: false,
          message: err.message
        });
      });
    }
  },

  /**
   * api controller to reset password
   * @param {object} req users information object
   * @param {object} res servers response
   * @return {void}
   */
  reset(req, res) {
    return Users
    .findOne({
      where: {
        resetPasswordToken: req.params.token
      }
    })
    .then((user) => {
      if (!user) {
        res.status(400).send({
          success: false,
          message: 'failed token authentication'
        });
      } else {
        if ((Date.now()) > user.expiryTime) {
          user.update({
            resetPasswordToken: null,
            expiryTime: null
          })
          .then(() => {
            res.status(400).send({ success: false });
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
            .then((updatedUser) => {
              sendSuccessfulResetMail(updatedUser.email);
              res.status(201).send({
                success: true,
                message: 'successfully updated password'
              });
            }, (err) => {
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
    }, (err) => {
      res.status(400).send({
        success: false,
        message: err.message
      });
    });
  },

  /**
   * api controller to authenticate token on resetting password
   * @param {object} req users information obect
   * @param {object} res servers response
   * @return {void}
   */
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
      .then((user) => {
        if (!user) {
          res.status(400).send({
            success: false,
            message: 'failed token authentication'
          });
        } else {
          res.status(200).send({
            success: true,
            UserName: user.UserName
          });
        }
      }, (err) => {
        res.status(400).send({
          success: false,
          message: err.message
        });
      });
    }
  }

};
