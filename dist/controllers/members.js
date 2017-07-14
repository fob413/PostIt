'use strict';

var members = require('../models/').Members;

module.exports = {
  list: function list(req, res) {
    return members.all().then(function (group) {
      return res.status(200).send(group);
    }).catch(function (error) {
      return res.status(400).send(error);
    });
  },
  create: function create(req, res) {
    return members.create({
      userId: req.body.userId,
      groupId: req.params.groupId
    }).then(function (member) {
      return res.status(201).send(member);
    }).catch(function (error) {
      return res.status(400).send(error);
    });
  }
};