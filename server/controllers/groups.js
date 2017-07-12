const groups = require('../models').Groups;


module.exports = {

  create(req, res) {
    return groups
    .create({
      GroupName: req.body.GroupName,
      Description: req.body.Description,
    })
    .then(user => res.status(
      201).send(user))
    .catch(error => res.status(400).send(error.message));
  },

  list(req, res) {
    return groups
    .all()
    .then(group => res.status(200).send(group))
    .catch(error => res.status(400).send(error.message));
  }

};
