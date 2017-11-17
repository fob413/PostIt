import db from '../models';

const Users = db.Users;
const Groups = db.Groups;
const GroupMembers = db.GroupMembers;
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
        userName: req.decoded.userName
      }
    })
    .then((user) => {
      if (!user) {
        return res.status(401).send({
          success: false,
          message: 'signup to access this service'
        });
      }

      if (!req.body.groupName || req.body.groupName.trim().length < 1) {
        return res.status(400).send({
          success: false,
          message: 'Input a name for the group'
        });
      }

      // groupName characters should not be more than 20
      if (req.body.groupName.trim().length > 14) {
        return res.status(400).send({
          success: false,
          message: 'GroupName should not be more than 14 characters'
        });
      }

      return Groups.findOne({
        where: {
          groupName: req.body.groupName
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
          groupName: req.body.groupName
        })
        .then((group) => {
          GroupMembers
          .create({
            userId: user.id,
            groupId: group.id
          })
          .then(res.status(201).send({
            success: true,
            message: 'new group created',
            id: group.id,
            groupName: group.groupName
          }), err => res.status(500).send({
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
        userName: req.decoded.userName
      }
    })
    .then((user) => {
      if (!user) {
        return res.status(401).send({
          success: false,
          message: 'signup to access this service'
        });
      }

      return GroupMembers.findAll({
        where: {
          userId: user.id
        },
        include: [
          {
            model: Groups,
            attributes: ['id', 'groupName'],
            include: [{
              model: Messages,
              attributes: ['id', 'content', 'authorsName', 'readby']
            }]
          }
        ]
      })
      .then((members) => {
        res.status(200).send({
          success: true,
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
