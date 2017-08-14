import db from '../models/index';
import jwt from 'jsonwebtoken';

const Users = db.Users;
const Members = db.Members;
const Message = db.Messages;
const Groups = db.Groups;
const secret = process.env.SECRET_TOKEN;

// const message = require('../models').Messages;
// const Users = require('../models/').Users;

module.exports = {

  // create(req, res) {
  //   return Users
  //   .findOne({
  //     where: {
  //       id: req.body.userId
  //     }
  //   })
  //   .then((user) => {
  //     if (user) {
  //       if (user.isLoggedin) {
  //         return message
  //         .create({
  //           authorsName: user.UserName,
  //           content: req.body.content,
  //           groupId: req.params.groupId,
  //           userId: user.id
  //         })
  //         .then(messages => res.status(201).send(messages));
  //       }
  //     } else {
  //       res.status(401).send('Signup to access this service');
  //     }
  //   }).then(messages => res.status(201).send(messages))
  //   .catch(error => res.status(400).send(error.message));
  // },

  sendMessage(req, res) {
    return Users
    .findOne({
      where: {
        id: req.body.userId
      }
    })
    .then((user) => {
      if (!user) {
        res.status(401).send({
          message: 'Signup to access this service'
        });
      } else {
        if (!user.isLoggedin) {
          res.status(401).send({
            message: 'Signin to access this service'
          });
        } else {
          return Members
          .findOne({
            where: {
              userId: req.body.userId,
              groupId: req.params.groupId
            }
          })
          .then((member) => {
            if (!member) {
              res.status(400).send({
                message: 'Not in the group'
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
              .catch(error => res.status.send(error.message));
            }
          });
        }
      }
    });
  },

  // create(req, res) {
  //   return Members
  //   .findOne({
  //     where: {
  //       userId: req.body.userId,
  //       groupId: req.params.groupId
  //     }
  //   })
  //   .then((member) => {
  //     if (!member) {
  //       res.status(400).send({
  //         message: 'Not in the Group'
  //       });
  //     } else {
  //       Users
  //       .findOne({
  //         where: {
  //           id: req.body.userId
  //         }
  //       })
  //       .then((user) => {
  //         if (user) {
  //           if (user.isLoggedin) {
  //             return Message
  //             .create({
  //               authorsName: user.UserName,
  //               content: req.body.content,
  //               groupId: req.params.groupId,
  //               userId: user.id
  //             })
  //             .then(messages => res.status(201).send(messages));
  //           }
  //         } else {
  //           res.status(401).send('Signup to access this service');
  //         }
  //       }).then(messages => res.status(201).send(messages))
  //       .catch(error => res.status(400).send(error.message));
  //     }
  //   });
  // },

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

  // listMessages(req, res) {
  //   return Groups
  //   .findOne({
  //     where: {
  //       id: req.params.groupId
  //     }
  //   })
  //   .then((group) => {
  //     if (!group) {
  //       res.status(400).send({
  //         message: 'Group does not exist'
  //       });
  //     } else {
  //       return Users
  //       .findOne({
  //         where: {
  //           id: req.headers['user-id']
  //         }
  //       })
  //       .then((user) => {
  //         if (user) {
  //           if (user.isLoggedin) {
  //             return Members
  //             .findOne({
  //               where: {
  //                 groupId: req.params.groupId,
  //                 userId: req.headers['user-id']
  //               }
  //             }).then((member) => {
  //               if (!member) {
  //                 res.status(400).send({
  //                   message: 'Not a member of this group'
  //                 });
  //               } else {
  //                 Message.findAll({
  //                   where: {
  //                     groupId: req.params.groupId
  //                   }
  //                 })
  //                 .then((groupMessages) => {
  //                   res.status(200).send(groupMessages);
  //                 })
  //                 .catch((error) => {
  //                   res.status(400).send(error.message);
  //                 });
  //               }
  //             });
  //           } else {
  //             res.status(400).json({
  //               message: 'Sign in to access this service',
  //             });
  //           }
  //         } else {
  //           res.status(401).send({
  //             message: 'Sign up to access this service'
  //           });
  //         }
  //       });
  //     }
  //   });
  // },

  list(req, res) {
    return Message
    .all()
    .then(messages => res.status(200).send(messages))
    .catch(error => res.status(400).send(error.message));
  }

};
