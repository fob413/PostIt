import db from '../models/index';
import jwt from 'jsonwebtoken';
import { sendMail, sendSMS } from './priority';

const Users = db.Users;
const Members = db.Members;
const Message = db.Messages;
const Groups = db.Groups;
const secret = process.env.SECRET_TOKEN;

// const message = require('../models').Messages;
// const Users = require('../models/').Users;

/**
 * checks if a user has read a message
 * @param {array} message array of users that have read the message
 * @param {number} id current users id
 * @return {boolean} user has either read the message of not
 */
const hasRead = (message,id) => {
  let read = false;
  message = message.split(",");
  message.map(item => {
    if (item == id){
      read = true;
    }
  });
  return read;
};

export default {

  /**
   * api route to send a message to a group
   * @param {object} req 
   * @param {object} res 
   * @return {void}
   */
  sendMessage(req, res) {
    // authentication
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
                      console.log(req.body.priority);
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
                          userId: user.id,
                          priorityValue: req.body.priority
                        })
                        .then(messages => {
                          Members
                          .findAll({
                            where: {
                              groupId: req.params.groupId
                            },
                            attributes: ['userId'],
                            include: [
                              {
                                model: Users,
                                attributes: ['UserName', 'telephone', 'email']
                              }
                            ]
                          }).then((users) => {
                            if ( req.body.priority == 'URGENT' ){
                              sendMail(users, messages.content);
                            }
                            if (req.body.priority == 'CRITICAL') {
                              sendMail(users, messages.content);
                              sendSMS(users, messages.content);
                            }
                            res.status(201).send(messages);
                          })
                          .catch(err => {
                            res.status(400).send(err.message);
                          });
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

  /**
   * list messages in a particular group
   * @param {object} req 
   * @param {object} res 
   * @return {void}
   */
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
  },

  /**
   * api route to update messages a user has read
   * @param {object} req 
   * @param {object} res 
   * @return {void}
   */
  readMessages(req, res) {
    if (req.header('x-auth')) {
      const token = req.header('x-auth');
      jwt.verify(token, secret, (err, decoded) => {
        if (err) {
          return res.status(403).send({
            success: false,
            message: 'failed to authenticate token'
          });
        } else {
          req.decoded = decoded;
          return Users.findOne({
            where: {
              UserName: req.decoded.UserName
            }
          })
          .then ((user) => {
            if (!user) {
              return res.status(401).send({
                success: false,
                message: 'Sign Up to access this service'
              });
            } else {
              if (!user.isLoggedin) {
                return res.status(401).send({
                  success: false,
                  message: 'Sign in to access this service'
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
                  if (!member) {
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
                    .then((message) => {
                      message.map(item => {
                        if (item.readby.length > 0) {
                          if (!hasRead(item.readby, user.id)) {
                            item.update(
                              {readby: `${item.readby},${user.id}`}
                            );
                          }
                        } else {
                          item.update(
                          {readby: `${user.id}`}
                        );
                        }
                      });
                      res.status(201).send({
                        success: true
                      });
                    }, err => {
                      console.log(err);
                    });
                  }
                }, err => {
                  console.log(err);
                });
              }
            }
          }, err => {
            console.log(err);
          });
        }
      });
    } else {
      return res.status(403).send({
        success: false,
        message: 'no token provided'
      });
    }
  }

};
