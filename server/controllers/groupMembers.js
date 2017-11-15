import db from '../models';

const GroupMembers = db.GroupMembers;
const Users = db.Users;
const Groups = db.Groups;

// const members = require('../models/').Members;

export default {

  /**
   * add a user to a new group
   * @param {object} req users request object
   * @param {object} res servers response
   * @return {void}
   */
  create(req, res) {
    if (req.body.userId) {
      return Users.findOne({
        where: {
          userName: req.decoded.userName
        }
      })
      .then((user) => {
        if (!user) {
          return res.status(400).send({
            success: false,
            message: 'Sign up to access this service'
          });
        }

        return Groups.findOne({
          where: {
            id: req.params.groupId
          }
        })
        .then((group) => {
          if (!group) {
            return res.status(400).send({
              success: false,
              message: 'Group does not exist'
            });
          }

          return GroupMembers.findOne({
            where: {
              userId: req.body.userId,
              groupId: req.params.groupId
            }
          })
          .then((member) => {
            if (member) {
              return res.status(401).send({
                success: false,
                message: 'User already in group'
              });
            }
            GroupMembers.create({
              userId: req.body.userId,
              groupId: req.params.groupId
            })
            .then((addedMember) => {
              res.status(201).send({
                success: true,
                message: 'successfully added to group',
                id: addedMember.id
              });
            }, err => res.status(400).send({
              success: false,
              message: err.message
            }));
          }, err => res.status(400).send({
            success: false,
            message: err.message
          }));
        }, err => res.status(400).send({
          success: false,
          message: err.message
        }));
      }, err => res.status(400).send({
        success: false,
        message: err.message
      }));
    }
    return res.status(400).send({
      success: false,
      message: 'no user id for user to be added to the group'
    });
  },


  /**
   * api route for array of users in a group
   * @param {object} req users request object
   * @param {object} res servers reponse
   * @return {void}
   */
  listGroupUsers(req, res) {
    return Users
    .findOne({
      where: {
        userName: req.decoded.userName
      }
    })
    .then((user) => {
      if (user) {
        return Groups.findOne({
          where: {
            id: req.params.groupId
          }
        })
        .then((group) => {
          if (!group) {
            return res.status(400).send({
              success: false,
              message: 'Group does not exist'
            });
          }
          return GroupMembers
          .findAll({
            where: {
              groupId: req.params.groupId
            },
            attributes: ['id', 'userId', 'groupId'],
            include: [
              {
                model: Users,
                attributes: ['id', 'userName']
              }
            ]
          })
          .then(users => res.status(200).send(users));
        })
        .catch(err => res.status(400).send({
          success: false,
          message: err.message
        }));
      }
      return res.status(401).send({
        success: false,
        message: 'Sign Up to access this service'
      });
    })
    .catch((err) => {
      res.status(400).send({
        success: false,
        message: err.message
      });
    });
  }
};
