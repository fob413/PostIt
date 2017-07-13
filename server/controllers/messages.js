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
        console.log('===============>>>>>>>>>>>>>' + user.id);
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

  list(req, res) {
    return messages
    .all()
    .then(message => res.status(200).send(message))
    .catch(error => res.status(400).send(error.message));
  }

}