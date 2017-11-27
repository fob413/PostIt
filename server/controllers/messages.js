import models from '../models';
import sendMail from '../middleware/sendMail';

const Users = models.Users;
const GroupMembers = models.GroupMembers;
const Message = models.Messages;
const Groups = models.Groups;

/**
 * checks if a user has read a message
 * @param {array} message array of users that have read the message
 * @param {number} id current users id
 * @return {boolean} user has either read the message or not
 */
const hasRead = (message, id) => {
  let read = false;
  message = message.split(',');
  message.map((item) => {
    if (item == id) {
      read = true;
    }
  });
  return read;
};

export default {

  /**
   * api route to send a message to a group
   * @param {object} req users request object
   * @param {object} res servers response
   * @return {void}
   */
  sendMessage(req, res) {
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
            return res.status(404).send({
              success: false,
              message: 'Group does not exist'
            });
          }
          return GroupMembers
          .findOne({
            where: {
              userId: user.id,
              groupId: req.params.groupId
            }
          })
          .then((member) => {
            if (!member) {
              return res.status(401).send({
                success: false,
                message: 'Not a member of this group'
              });
            }
            if (!req.body.content) {
              return res.status(400).send({
                success: false,
                message: 'No message to be sent'
              });
            }
            return Message
            .create({
              authorsName: user.userName,
              content: req.body.content,
              groupId: req.params.groupId,
              userId: user.id,
              priorityValue: req.body.priority
            })
            .then((messages) => {
              GroupMembers
              .findAll({
                where: {
                  groupId: req.params.groupId
                },
                attributes: ['userId'],
                include: [
                  {
                    model: Users,
                    attributes: ['userName', 'telephone', 'email']
                  }
                ]
              }).then((users) => {
                if (req.body.priority === 'URGENT') {
                  sendMail(users, messages.content, req.body.priority);
                }
                if (req.body.priority === 'CRITICAL') {
                  sendMail(users, messages.content, req.body.priority);
                }
                res.status(201).send({
                  success: true,
                  message: 'successfully sent message'
                });
              })
              .catch((err) => {
                res.status(500).send(err.message);
              });
            })
            .catch(err => res.status(500).send({
              success: false,
              message: err.message
            }));
          })
          .catch(err => res.status(500).send({
            success: false,
            message: err.message
          }));
        })
        .catch(err => res.status(500).send({
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
      res.status(500).send({
        success: false,
        message: err.message
      });
    });
  },

  /**
   * list messages in a particular group
   * @param {object} req users request object
   * @param {object} res servers response
   * @return {void}
   */
  listMessages(req, res) {
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
            return res.status(404).send({
              success: false,
              message: 'Group does not exist'
            });
          }
          return GroupMembers
          .findOne({
            where: {
              userId: user.id,
              groupId: req.params.groupId
            }
          })
          .then((member) => {
            if (!member) {
              return res.status(401).send({
                success: false,
                message: 'Not a member of this group'
              });
            }
            return Message
            .findAll({
              where: {
                groupId: req.params.groupId
              }
            })
            .then((groupMessages) => {
              res.status(200).send(groupMessages);
            })
            .catch(err => res.status(500).send({
              success: false,
              message: err.message
            }));
          })
          .catch(err => res.status(500).send({
            success: false,
            message: err.message
          }));
        })
        .catch(err => res.status(500).send({
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
      res.status(500).send({
        success: false,
        message: err.message
      });
    });
  },

  /**
   * api route to update messages a user has read
   * @param {object} req users request object
   * @param {object} res servers response
   * @return {void}
   */
  readMessages(req, res) {
    return Users.findOne({
      where: {
        userName: req.decoded.userName
      }
    })
    .then((user) => {
      if (!user) {
        return res.status(401).send({
          success: false,
          message: 'Sign Up to access this service'
        });
      }
      return GroupMembers
      .findOne({
        where: {
          userId: user.id,
          groupId: req.params.groupId
        }
      })
      .then((member) => {
        if (!member) {
          return res.status(401).send({
            success: false,
            message: 'Not a member of this group'
          });
        }
        return Message
        .findAll({
          where: {
            groupId: req.params.groupId
          }
        })
        .then((message) => {
          message.map((item) => {
            if (item.readby.length > 0) {
              if (!hasRead(item.readby, user.id)) {
                item.update(
                  {
                    readby: `${item.readby},${user.id}`
                  }
                );
              }
            } else {
              item.update(
              { readby: `${user.id}` }
            );
            }
          });
          res.status(201).send({
            success: true,
            message: 'user has read message'
          });
        });
      });
    });
  }

};
