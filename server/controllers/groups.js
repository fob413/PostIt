import db from '../models/index';

const Users = db.Users;
const Groups = db.Groups;
const Members = db.Members;

export default {

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
          if (req.body.GroupName.length > 0) {
            return Groups
            .create({
              GroupName: req.body.GroupName,
              Description: req.body.Description,
            })
            .then((group) => {
              Members
              .create({
                userId: req.body.userId,
                groupId: group.id,
              })
              .then(res.status(201).send(group));
            })
            .catch(error => res.status(400).send(error));
          } else {
            res.status(400).send({
              message: 'Input a name for the group'
            });
          }
        } else {
          res.status(401).json('Not logged in');
        }
      } else {
        res.status(401).json('SignUp to access this service');
      }
    })
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
    return Groups
    .all()
    .then(group => res.status(200).send(group))
    .catch(error => res.status(400).send(error.message));
  },
};
