const message = require('../models').Messages;
const Users = require('../models/').Users;

module.exports = {

  create(req, res) {
    return Users
    .findOne({
      where: {
        id: req.body.userId
      }
    })
    .then((user) => {
      if (user) {
        if (user.isLoggedin) {
          return message
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
          message
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
    return message
    .all()
    .then(messages => res.status(200).send(messages))
    .catch(error => res.status(400).send(error.message));
  }

};
