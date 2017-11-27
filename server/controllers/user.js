import bcrypt from 'bcrypt';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import models from '../models';
import paginate from '../middleware/paginate';
import sendResetMail from '../middleware/resetMail';
import sendSuccessfulResetMail from '../middleware/successfulResetMail';
import validate from '../middleware/validate';

require('dotenv').config();

const secret = process.env.SECRET_TOKEN;
const Users = models.Users;

// message sent for invalid inputs
const invalid = {
  success: false,
  message: 'Invalid Credentials'
};


export default {

  /**
   * api controller to signup a new user
   * @param {object} req users object information
   * @param {object} res servers response
   * @return {void}
   */
  create(req, res) {
    // validate users input
    if (validate(req, res, 'signup')) {
      return Users.findOne({
        where: {
          userName: req.body.userName
        }
      })
      .then((username) => {
        // check if username hasn't been used
        if (username) {
          return res.status(409).send({
            success: false,
            message: 'Username has already been taken!'
          });
        }

        // check if email isn't in use
        Users.findOne({
          where: {
            email: req.body.email
          }
        })
        .then((emailUsed) => {
          if (emailUsed) {
            return res.status(409).send({
              success: false,
              message: 'Email already in use!'
            });
          }
          // check if phone number isn't in use
          Users.findOne({
            where: {
              telephone: req.body.telephone
            }
          })
          .then((telephoneUsed) => {
            if (telephoneUsed) {
              return res.status(409).send({
                success: false,
                message: 'Telephone number in use by another user!'
              });
            }
            // signup the new user
            Users.create({
              userName: req.body.userName,
              password: bcrypt.hashSync(req.body.password, 11),
              email: req.body.email,
              telephone: req.body.telephone
            })
            .then((user) => {
              // sign and return token
              const token = jwt.sign({
                userName: user.userName,
                email: user.email,
                telephone: user.telephone,
                userId: user.id
              }, secret);
              return res.status(201).json({
                success: true,
                userName: user.userName,
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
          }, (err) => {
            res.status(400).send({
              success: false,
              message: err.message
            });
          });
        }, (err) => {
          res.status(400).send({
            success: false,
            message: err.message
          });
        });
      });
    }
    // response for failed request object validation
    return res.status(400).send({
      success: false,
      message: 'Invalid credentials'
    });
  },

  /**
   * api controller to signin a user
   * @param {object} req users information object
   * @param {object} res servers response
   * @return {void}
   */
  signin(req, res) {
    // check for username and password
    if (validate(req, res, 'signin')) {
      return Users
      .findOne({
        where: {
          userName: req.body.userName
        }
      })
      .then((user) => {
        // if user exists
        if (user) {
          if (!bcrypt.compareSync(req.body.password, user.password)) {
            // response if passwords don't match
            return res.status(401).send(invalid);
          }
          return user
          .update({
            isLoggedin: true,
          })
          .then(() => {
            const token = jwt.sign({
              userName: user.userName,
              email: user.email,
              telephone: user.telephone,
              userId: user.id
            }, secret);
            res.status(200).json({
              success: true,
              userName: user.userName,
              email: user.email,
              isLoggedin: user.isLoggedin,
              telephone: user.telephone,
              token,
              userId: user.id
            });
          })
          .catch((err) => {
            res.status(500).send({
              success: false,
              message: err.message
            });
          }
        );
        }
        // response for when user isn't found
        return res.status(404).send(invalid);
      })
      .catch((error) => {
        res.status(500).send(error.message);
      });
    }
    // response for failed validation
    return res.status(400).send({
      success: false,
      message: 'Invalid Credentials'
    });
  },

  /**
   * api controller to sign out a user fron the platform
   * @param {object} req users information object
   * @param {object} res servers response
   * @return {void}
   */
  signout(req, res) {
    return Users
    .findOne({
      where: {
        userName: req.decoded.userName
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
      }), (err) => {
        res.status(500).send({
          success: false,
          message: err.message
        });
      });
    }, (err) => {
      res.status(500).send({
        success: false,
        message: err.message
      });
    });
  },

  /**
   * api controller lists all the users on the platform
   * @param {object} req users information object
   * @param {object} res
   * @return {void}
   */
  searchUsers(req, res) {
    // validate request object
    if (!req.body.userName || !req.body.limit) {
      return res.status(400).send({
        success: false,
        message: 'no search parameter/limit',
        users: []
      });
    }
    return Users
    .findAndCountAll({
      offset: req.params.offset * req.body.limit,
      limit: req.body.limit,
      where: {
        userName: { $like: `%${req.body.userName}%` }
      },
      attributes: ['id', 'userName']
    })
    .then((users) => {
      res.status(200).send({
        success: true,
        users,
        paginateData: paginate(users.count, req.body.limit, req.params.offset * 5)
      });
    }, (err) => {
      res.status(500).send({
        success: false,
        message: 'an error occured searching users',
        error: err.message,
        users: []
      });
    });
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
      return res.status(400).send({
        success: false,
        message: 'No email provided'
      });
    }
    return Users.findOne({
      where: {
        email: req.body.email
      }
    })
    .then((user) => {
      if (!user) {
        return res.status(400).send({
          success: false,
          message: 'user not found'
        });
      }
      const token = crypto.randomBytes(20).toString('hex');
      user.update({
        resetPasswordToken: token,
        expiryTime: Date.now() + 3600000
      }, (err) => {
        res.status(500).send({
          success: false,
          message: err.message
        });
      })
      .then((updatedUser) => {
        sendResetMail(updatedUser.resetPasswordToken, updatedUser.email, req.headers.host);
        if (process.env.NODE_ENV === 'test' || 'travis') {
          return res.status(200).send({
            success: true,
            message: 'reset password link has been sent to your mail',
            resetToken: token
          });
        }
        res.status(200).send({
          success: true,
          message: 'reset password link has been sent to your mail'
        });
      }, (err) => {
        res.status(500).send({
          success: false,
          message: err.message
        });
      });
    }, (err) => {
      res.status(500).send({
        success: false,
        message: err.message
      });
    });
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
        res.status(401).send({
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
            res.status(403).send({ success: false });
          }, err => res.status(500).send(err.message));
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
              res.status(500).send({
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
      res.status(500).send({
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
      res.status(401).send({
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
          res.status(403).send({
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
        res.status(500).send({
          success: false,
          message: err.message
        });
      });
    }
  }

};
