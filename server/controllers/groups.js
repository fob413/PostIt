const groups = require('../models').Groups;
const members = require('../models/').Members;


module.exports = {

  create(req, res) {
    return groups
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
    .catch(error => res.status(400).send(error));
  },

  list(req, res) {
    return groups
    .all()
    .then(group => res.status(200).send(group))
    .catch(error => res.status(400).send(error.message));
  }

};
