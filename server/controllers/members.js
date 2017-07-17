import db from '../models/index';

const Members = db.Members;
const Users = db.Users;

// const members = require('../models/').Members;

module.exports = {
  list(req, res) {
    return Members.all()
    .then(group => res.status(200).send(group))
    .catch(error => res.status(400).send(error));
  },

  create(req, res) {
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
};
