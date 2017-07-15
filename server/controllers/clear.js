import db from '../models/index';

const Users = db.Users;
const Groups = db.Groups;
const Members = db.Members;
const Messages = db.Messages;

export default {

  clearUsers(req, res) {
    return Users
    .all({
      include: [{
        model: Messages
      }]
    })
    .then(users => res.status(200).send(users));
  },

  clearGroups(req, res) {
    return Groups
    .all()
    .then(groups => res.status(200).send(groups));
  },

  clearMembers(req, res) {
    return Members
    .all()
    .then(members => res.status(200).send(members));
  },

  clearMessages(req, res) {
    return Messages
    .all()
    .then(messages => res.status(200).send(messages));
  }
};
