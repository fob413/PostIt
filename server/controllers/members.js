import db from '../models/index';

const Members = db.Members;

// const members = require('../models/').Members;

module.exports = {
  list(req, res) {
    return Members.all()
    .then(group => res.status(200).send(group))
    .catch(error => res.status(400).send(error));
  },

  create(req, res) {
    return Members
    .create({
      userId: req.body.userId,
      groupId: req.params.groupId
    })
    .then(member => res.status(201).send(member))
    .catch(error => res.status(400).send(error));
  }
};
