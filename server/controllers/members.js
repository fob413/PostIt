import db from '../models/index';
import jwt from 'jsonwebtoken';

const Members = db.Members;
const Users = db.Users;
const Groups = db.Groups;
const secret = process.env.SECRET_TOKEN;

// const members = require('../models/').Members;

export default {
  list(req, res) {
    return Members.all()
    .then(group => res.status(200).send(group))
    .catch(error => res.status(400).send(error));
  },

  // create(req, res) {
  //   if (req.header('x-auth')) {
  //     const token = req.header('x-auth');
  //     jwt.verify(token, secret, (err, decoded) => {
  //       if(err) {
  //         return res.status(403).send({
  //           success: false,
  //           message: 'failed to authenticate token'
  //         });
  //       } else {
  //         req.decoded = decoded;
  //         return Users
  //         .findOne({
  //           where: {
  //             UserName: req.decoded.UserName
  //           }
  //         })
  //         .then((user) => {
  //           if(user) {
  //             if (user.isLoggedin) {
  //               return Groups
  //               .findOne({
  //                 where: {
  //                   id: req.params.groupId
  //                 }
  //               })
  //               .then((group) => {
  //                 if (!group) {
  //                   return res.status(400).send({
  //                     success: false,
  //                     message: 'Group does not exist'
  //                   });
  //                 } else {
  //                   return Members
  //                   .findOne({
  //                     where: {
  //                       userId: req.body.userId,
  //                       groupId: req.params.groupId
  //                     }
  //                   })
  //                   .then(member => {
  //                     if (member) {
  //                       res.status(401).send({
  //                         success: false,
  //                         message: 'User already in group'
  //                       });
  //                     } else {
  //                       Members
  //                       .create({
  //                         userId: req.body.userId,
  //                         groupId: req.params.groupId
  //                       })
  //                       .then(addedMember => {
  //                         res.status(201).send(addedMember);
  //                       })
  //                       .catch(err => {
  //                         res.status(400).send(err);
  //                       });
  //                     }
  //                   })
  //                   .catch(err => {
  //                     return res.status(400).send({
  //                       success: false,
  //                       message: err.message
  //                     });
  //                   });
  //                 }
  //               })
  //               .catch(err => res.status(400).send({
  //                 success: false,
  //                 message: err.message
  //               }));
  //             } else {
  //               return res.status(401).send({
  //                 success: false,
  //                 message: 'Signin to access this service'
  //               });
  //             }
  //           } else {
  //             return res.status(401).send({
  //               success: false,
  //               message: 'Sign Up to access this service'
  //             });
  //           }
  //         })
  //         .catch((err) => {
  //           return res.status(400).send({
  //             success: false,
  //             message: err.message
  //           });
  //         });
  //       }
  //     });
  //   } else {
  //     return res.status(403).send({
  //       success: false,
  //       message: 'no token provided'
  //     });
  //   }
  // },

  /**
   * add a user to a new group
   * @param {object} req users request object
   * @param {object} res servers response
   * @return {void}
   */
  create(req, res) {
    return Users.findOne({
      where: {
        UserName: req.decoded.UserName
      }
    })
    .then((user) => {
      if (!user) {
        return res.status(400).send({
          success: false,
          message: 'Sign up to access this service'
        });
      }

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
        }

        return Members.findOne({
          where: {
            userId: req.body.userId,
            groupId: req.params.groupId
          }
        })
        .then((member) => {
          if (member) {
            return res.status(401).send({
              success: false,
              message: 'User already in group'
            });
          }
          Members.create({
            userId: req.body.userId,
            groupId: req.params.groupId
          })
          .then((addedMember) => {
            res.status(201).send(addedMember);
          }, err => res.status(400).send({
            success: false,
            message: err.message
          }));
        }, err => res.status(400).send({
          success: false,
          message: err.message
        }));
      }, err => res.status(400).send({
        success: false,
        message: err.message
      }));
    }, err => res.status(400).send({
      success: false,
      message: err.message
    }));
  },


  /**
   * api route for list of users in a group
   * @param {object} req users request object
   * @param {object} res servers reponse
   * @return {void}
   */
  listGroupUsers(req, res) {
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
                    .findAll({
                      where: {
                        groupId: req.params.groupId
                      },
                      attributes:['id', 'userId', 'groupId'],
                      include: [
                        {
                          model: Users,
                          attributes: ['id', 'UserName']
                        }
                      ]
                    })
                      .then(users => res.status(200).send(users));
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
          .catch((err) => {
            return res.status(400).send({
              success: false,
              message: err.message
            });
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
