import db from '../models/index';

const Users = db.Users;
const Groups = db.Groups;
const Members = db.Members;
const Messages = db.Messages;

export default {

  /**
   * create a new group
   * @param {object} req users request object
   * @param {object} res servers response
   * @return {void}
   */
  create(req, res) {
    return Users
    .findOne({
      where: {
        UserName: req.decoded.UserName
      }
    })
    .then((user) => {
      if (!user) {
        return res.status(401).send({
          success: false,
          message: 'signup to access this service'
        });
      }

      if (!req.body.GroupName || req.body.GroupName.trim().length < 1) {
        return res.status(400).send({
          success: false,
          message: 'Input a name for the group'
        });
      }

      return Groups.findOne({
        where: {
          GroupName: req.body.GroupName
        }
      })
      .then((groupExists) => {
        if (groupExists) {
          return res.status(400).send({
            success: false,
            message: 'A group already exists with the same name'
          });
        }

        Groups.create({
          GroupName: req.body.GroupName
        })
        .then((group) => {
          Members
          .create({
            userId: user.id,
            groupId: group.id
          })
          .then(res.status(201).send(group), err => res.status(500).send({
            success: false,
            message: err.message
          }));
        }, err => res.status(500).send({
          success: false,
          message: err.message
        }));
      }, err => res.status(500).send({
        success: false,
        message: err.message
      }));
    }, err => res.status(500).send({
      success: false,
      message: err.message
    }));
  },

  /**
   * list of groups a user belongs to
   * @param {object} req users request body
   * @param {object} res servers response
   * @return {void}
   */

  listGroups(req, res) {
    return Users.findOne({
      where: {
        UserName: req.decoded.UserName
      }
    })
    .then((user) => {
      if (!user) {
        return res.status(401).send({
          success: false,
          message: 'signup to access this service'
        });
      }

      return Members.findAll({
        where: {
          userId: user.id
        },
        include: [
          {
            model: Groups,
            attributes: ['id', 'GroupName'],
            include: [{
              model: Messages,
              attributes: ['id', 'content', 'authorsName', 'readby']
            }]
          }
        ]
      })
      .then((members) => {
        res.send({
          success: false,
          members
        });
      }, err => res.status(500).send({
        success: false,
        message: err.message
      }));
    }, err => res.status(500).send({
      success: false,
      message: err.message
    }));
  }
};
