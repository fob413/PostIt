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

  create(req, res) {
    return Groups
    .findOne({
      where: {
        id: req.params.groupId
      }
    })
    .then((group) => {
      if (!group) {
        res.status(400).send({
          message: 'Group does not exist'
        });
      } else {
        return Users
        .findOne({
          where: {
            id: req.body.userId
          }
        })
        .then((user) => {
          if (!user) {
            res.status(401).send({
              message: 'User does not exist'
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
              if (member) {
                res.status(401).send({
                  message: 'User already in group'
                });
              } else {
                Members
                .create({
                  userId: req.body.userId,
                  groupId: req.params.groupId
                })
                .then(addedMember => res.status(201).send(addedMember))
                .catch(error => res.status(400).send(error));
              }
            })
            .catch(error => res.status(400).send(error));
          }
        });
      }
    })
    .catch(error => res.status(400).send(error));
  },

  listGroupUsers(req, res) {
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
  }
};
