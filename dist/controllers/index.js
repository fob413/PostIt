'use strict';

var users = require('./user');
var groups = require('./groups');
var members = require('./members');
var messages = require('./messages');

module.exports = {
  users: users,
  groups: groups,
  members: members,
  messages: messages
};