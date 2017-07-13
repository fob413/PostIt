'use strict';

var groups = require('../models').Groups;
var members = require('../models/').Members;
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
          return groups.create({
            GroupName: req.body.GroupName,
            Description: req.body.Description
          }).then(function (group) {
            members.create({
              userId: req.body.userId,
              groupId: group.id
            }).then(res.status(201).send(group));
          }).catch(function (error) {
            return res.status(400).send(error);
          });
        } else {
          res.status(401).json('Not logged in');
        }
      } else {
        res.status(401).json('SignUp to access this service');
      }
    }).then(function (user) {
      return res.status(201).send(user);
    }).catch(function (error) {
      return res.status(400).send(error);
    });

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
  },
  list: function list(req, res) {
    return groups.all().then(function (group) {
      return res.status(200).send(group);
    }).catch(function (error) {
      return res.status(400).send(error.message);
    });
  }
};