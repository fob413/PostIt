'use strict';

var message = require('../models').Messages;
var Users = require('../models/').Users;

module.exports = {
  create: function create(req, res) {
    return Users.findOne({
      where: {
        id: req.body.userId
      }
    }).then(function (user) {
      if (user) {
        if (user.isLoggedin) {
          return message.create({
            authorsName: user.UserName,
            content: req.body.content,
            groupId: req.params.groupId,
            userId: user.id
          }).then(function (messages) {
            return res.status(201).send(messages);
          });
        }
      } else {
        res.status(401).send('Signup to access this service');
      }
    }).then(function (messages) {
      return res.status(201).send(messages);
    }).catch(function (error) {
      return res.status(400).send(error.message);
    });
  },
  listMessages: function listMessages(req, res) {
    return Users.findOne({
      where: {
        id: req.body.userId
      }
    }).then(function (user) {
      if (user) {
        if (user.isLoggedin) {
          message.findOne({
            where: {
              groupId: req.params.groupId
            }
          }).then(function (groupMessages) {
            res.status(200).send(groupMessages);
          });
        } else {
          res.status(401).json({
            message: 'No messages found for users'
          });
        }
      } else {
        res.status(401);
      }
    });
  },
  list: function list(req, res) {
    return message.all().then(function (messages) {
      return res.status(200).send(messages);
    }).catch(function (error) {
      return res.status(400).send(error.message);
    });
  }
};