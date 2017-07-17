import db from '../models/index';

const Users = db.Users;
const Members = db.Members;
const Message = db.Messages;

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
    console.log('==============>>>>>>>>>>>>>>>>>>>>', Message);
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

  create(req, res) {
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
          message: 'Not in the Group'
        });
      } else {
        Users
        .findOne({
          where: {
            id: req.body.userId
          }
        })
        .then((user) => {
          if (user) {
            if (user.isLoggedin) {
              return Message
              .create({
                authorsName: user.UserName,
                content: req.body.content,
                groupId: req.params.groupId,
                userId: user.id
              })
              .then(messages => res.status(201).send(messages));
            }
          } else {
            res.status(401).send('Signup to access this service');
          }
        }).then(messages => res.status(201).send(messages))
        .catch(error => res.status(400).send(error.message));
      }
    });
  },

  listMessages(req, res) {
    return Users
    .findOne({
      where: {
        id: req.headers['user-id']
      }
    })
    .then((user) => {
      if (user) {
        if (user.isLoggedin) {
          Message
          .findAll({
            where: {
              groupId: req.params.groupId,
            }
          })
          .then((groupMessages) => {
            res.status(200).send(groupMessages);
          });
        } else {
          res.status(401).json({
            message: 'No messages found for users',
          });
        }
      } else {
        res.status(401);
      }
    });
  },

  list(req, res) {
    return Message
    .all()
    .then(messages => res.status(200).send(messages))
    .catch(error => res.status(400).send(error.message));
  }

};
