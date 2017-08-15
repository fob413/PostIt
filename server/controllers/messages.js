import db from '../models/index';
import jwt from 'jsonwebtoken';

const Users = db.Users;
const Members = db.Members;
const Message = db.Messages;
const Groups = db.Groups;
const secret = process.env.SECRET_TOKEN;

// const message = require('../models').Messages;
// const Users = require('../models/').Users;

export default {

  sendMessage(req, res) {
    if (req.header('x-auth')) {
      const token = req.header('x-auth');
      jwt.verify(token, secret, (err, decoded) => {
        if(err) {
          return res.status(403).send({
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
            if (user) {
              if (user.isLoggedin) {
                return Groups.findOne({
                  where: {
                    id: req.params.groupId
                  }
                })
                .then((group) => {
                  if (!group) {
                    return res.status(400).send({
                      success: false,
                      message: 'Group does not exist'
                    });
                  } else {
                    return Members
                    .findOne({
                      where: {
                        userId: user.id,
                        groupId: req.params.groupId
                      }
                    })
                    .then((member) => {
                      if(!member) {
                        return res.status(400).send({
                          success: false,
                          message: 'Not a member of this group'
                        });
                      } else {
                        return Message
                        .create({
                          authorsName: user.UserName,
                          content: req.body.content,
                          groupId: req.params.groupId,
                          userId: user.id
                        })
                        .then(messages => res.status(201).send(messages))
                        .catch(err => res.status(400).send({
                          success: false,
                          message: err.message
                        }));
                      }
                    })
                    .catch(err => res.status(400).send({
                      success: false,
                      message: err.message
                    }));
                  }
                })
                .catch(err => res.status(400).send({
                  success: false,
                  message: err.message
                }));
              } else {
                return res.status(401).send({
                  success: false,
                  message: 'Sign in to access this service'
                });
              }
            } else {
              return res.status(401).send({
                success: false,
                message: 'Sign Up to access this service'
              });
            }
          })
          .catch(err => {
            return res.status(400).send({
              success: false,
              message: err.message
            });
          });
        }
      })
    } else {
      return res.status(403).send({
        success: false,
        message: 'no token provided'
      });
    }
  },

  listMessages(req, res) {
    if (req.header('x-auth')) {
      const token = req.header('x-auth');
      jwt.verify(token, secret, (err, decoded) => {
        if(err) {
          return res.status(403).send({
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
            if (user) {
              if (user.isLoggedin) {
                return Groups.findOne({
                  where: {
                    id: req.params.groupId
                  }
                })
                .then((group) => {
                  if (!group) {
                    return res.status(400).send({
                      success: false,
                      message: 'Group does not exist'
                    });
                  } else {
                    return Members
                    .findOne({
                      where: {
                        userId: user.id,
                        groupId: req.params.groupId
                      }
                    })
                    .then((member) => {
                      if(!member) {
                        return res.status(400).send({
                          success: false,
                          message: 'Not a member of this group'
                        });
                      } else {
                        return Message
                        .findAll({
                          where: {
                            groupId: req.params.groupId
                          }
                        })
                        .then((groupMessages) => {
                          res.status(200).send(groupMessages);
                        })
                        .catch(err => res.status(400).send({
                          success: false,
                          message: err.message
                        }));
                      }
                    })
                    .catch(err => res.status(400).send({
                      success: false,
                      message: err.message
                    }));
                  }
                })
                .catch(err => res.status(400).send({
                  success: false,
                  message: err.message
                }));
              } else {
                return res.status(401).send({
                  success: false,
                  message: 'Sign in to access this service'
                });
              }
            } else {
              return res.status(401).send({
                success: false,
                message: 'Sign Up to access this service'
              });
            }
          })
          .catch(err => {
            return res.status(400).send({
              success: false,
              message: err.message
            });
          });
        }
      })
    } else {
      return res.status(403).send({
        success: false,
        message: 'no token provided'
      });
    }
  },

  list(req, res) {
    return Message
    .all()
    .then(messages => res.status(200).send(messages))
    .catch(error => res.status(400).send(error.message));
  }

};
