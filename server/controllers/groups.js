const groups = require('../models').Groups;
const members = require('../models/').Members;
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
          return groups.create({
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
          .catch(error => res.status(400).send(error));
        } else {
          res.status(401).json('Not logged in');
        }
      } else {
        res.status(401).json('SignUp to access this service');
      }
    })
    .then(user => res.status(201).send(user))
    .catch(error => res.status(400).send(error));
    
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

  list(req, res) {
    return groups
    .all()
    .then(group => res.status(200).send(group))
    .catch(error => res.status(400).send(error.message));
  }

};
