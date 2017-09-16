import db from '../models/index';
import jwt from 'jsonwebtoken';

const Users = db.Users;
const Groups = db.Groups;
const Members = db.Members;
const Messages = db.Messages;
const secret = process.env.SECRET_TOKEN;

export default {

  create(req, res) {
    if (req.header('x-auth')) {
      const token = req.header('x-auth');
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
            if (user) {
              if (user.isLoggedin) {
                if (req.body.GroupName.length > 0) {
                  return Groups
                  .create({
                    GroupName: req.body.GroupName,
                    Description: req.body.Description
                  })
                  .then((group) => {
                    Members
                    .create({
                      userId: user.id,
                      groupId: group.id
                    })
                    .then(res.status(201).send(group));
                  })
                  .catch(err => res.status(400).send({
                    success: false,
                    message: err.message
                  }));
                } else {
                  res.status(400).send({
                    success: false,
                    message: 'Input a name for the group'
                  });
                }
              } else {
                res.status(401).send({
                  success: false,
                  message: 'Sign in to access this service'
                });
              }
            } else {
              res.status(401).json({
                success: false,
                message: 'Signup to access this service'
              });
            }
          })
          .catch(err => res.status(400).send({
            success: false,
            message: err.message
          }));
        }
      })
    } else {
      return res.status(403).send({
        success: false,
        message: 'no token provided'
      });
    }
  },

  listGroups(req, res) {
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
              return Members
              .findAll({
                where: {
                  userId: user.id
                },
                include: [
                  { 
                    model: Groups, 
                    attributes: ['id', 'GroupName'],
                    include: [{
                      model: Messages,
                      attributes: ['id', 'content', 'authorsName']
                    }]
                  }
                ]
              })
              .then(members => {
                res.send({
                  success: true,
                  members
                });
              })
              .catch( err => res.status(400).send({
                success: false,
                error: err.message
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

    /*
    groups
    .create({
      GroupName: req.body.GroupName,
      Description: req.body.Description,
    })
    .then((group) => {
      members
      .create({
        userId: req.body.userId,
        groupId: group.id,
      })
      .then(res.status(201).send(group));
    })
    .catch(error => res.status(400).send(error));*/

  list(req, res) {
    return Groups
    .all()
    .then(group => res.status(200).send(group))
    .catch(error => res.status(400).send(error.message));
  },
};
