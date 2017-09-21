import axios from 'axios';
import swal from 'sweetalert2';
import {
  CURRENT_GROUP,
  LOAD_GROUP_MESSAGES,
  LOAD_PLATFORM_USERS,
  LOAD_GROUP_USERS,
  LOAD_UNREAD_MESSAGES,
  LOAD_READ_MESSAGES,
  LOAD_COUNT,
  LOAD_PAGE_COUNT
} from '../constants';


/**
 * @override reducer function
 */
const loadGroupId = data => ({
  type: CURRENT_GROUP,
  data
});

/**
 * @override reducer function
 */
const loadGroupMessagesSuccess = data => ({
  type: LOAD_GROUP_MESSAGES,
  data
});

/**
 * @override reducer function
 */
const loadGroupUnreadMessagesSuccess = data => ({
  type: LOAD_UNREAD_MESSAGES,
  data
});

/**
 * @override reducer function
 */
const loadGroupReadMessagesSuccess = data => ({
  type: LOAD_READ_MESSAGES,
  data
});

/**
 * @override reducer function
 */
const loadPlatformUsersSuccess = data => ({
  type: LOAD_PLATFORM_USERS,
  data
});

/**
 * @override reducer function
 */
const loadGroupUsersSuccess = data => ({
  type: LOAD_GROUP_USERS,
  data
});

/**
 * @override reducer function
 */
const loadCount = data => ({
  type: LOAD_COUNT,
  data
});

/**
 * @override reducer function
 */
const loadPageCount = data => ({
  type: LOAD_PAGE_COUNT,
  data
});

/**
 * filter unread messages
 * @param {array} data data gotten from api call
 * @param {string} userId current user id operating the platform
 * @return {array} array of unread messages
 */
const filterUnreadMessages = (data, userId) => {
  const unreadMessages = [];
  data.map((item) => {
    // array to hold userId that have read messages
    let readby = [];
    // boolean to check if user has read a message
    let read = false;
    // split the string of read users into an array
    readby = item.readby.split(',');
    // map through the array to check if user has read the message
    readby.map((id) => {
      if (id == userId) {
        read = true;
      }
    });
    // push message that user hasn't read into unreadMessages
    if (!read) {
      unreadMessages.push(item);
    }
  });
  return unreadMessages;
};

/**
 * filter read messages
 * @param {array} data data gotten from api call
 * @param {string} userId current user id operating the platform
 * @return {array} array of read messages
 */
const filterReadMessages = (data, userId) => {
  let readMessages = [];
  data.map((item) => {
    // array to hold userId that have read messages
    let readby = [];
    // boolean to check if user has read a message
    let read = false;
    // split the string of read users into an array
    readby = item.readby.split(',');
    // map through the array to check if user has read the message
    readby.map((id) => {
      if (id == userId) {
        read = true;
      }
    });
    // push message that user hasn't read into unreadMessages
    if (read) {
      readMessages.push(item);
    }
  });
  return readMessages;
};

/**
 * load the current group being operated on the front end
 * @param {string} groupId the current groupId
 * @return {void}
 */
export function loadCurrentGroup(groupId) {
  return dispatch => (
    dispatch(loadGroupId(groupId))
  );
}

/**
 * api to send a message
 * @param {string} message message to be sent
 * @param {stroing} groupId group id of the current group
 * @param {string} priority the priotity of the message being sent
 * @return {boolean} return if the message has been sent or not
 */
export function sendMessage(message, groupId, priority) {
  return dispatch => {
    return axios.post(
      `api/group/${groupId}/message`,
      { content: message, priority },
      { headers: { 'x-auth': localStorage.getItem('x-auth') } }
    )
    .then(({ data }) => {
      return true;
    }, (err) => {
      console.log(err.message);
    });
  };
}

export function loadGroupMessages(groupId, userId) {
  return dispatch => {
    axios.get(
      `api/group/${groupId}/messages`,
      { headers: { 'x-auth': localStorage.getItem('x-auth') } }
    )
    .then(({ data }) => {
      dispatch(loadGroupMessagesSuccess(data));
      dispatch(loadGroupUnreadMessagesSuccess(
        filterUnreadMessages(data, userId)
      ));
      dispatch(loadGroupReadMessagesSuccess(
        filterReadMessages(data, userId)
      ));
    }, err => console.log(err));
  };
}

export function loadPlatformUsers() {
  return dispatch => {
    axios.get(
      `api/users/list`,
      {headers: {'x-auth': localStorage.getItem('x-auth')}}
    )
    .then(({ data }) => {
      dispatch(loadPlatformUsersSuccess(data));
    }, err => console.log(err));
  };
}

export function searchUsers(offset, UserName) {
  return dispatch => {
    return axios.post(
      `api/users/list/${offset}`,
      {UserName},
      {headers: {'x-auth': localStorage.getItem('x-auth')}}
    )
    .then(({ data }) => {
      if (data.users.rows.length < 1) Materialize.toast('No user found', 4000, 'red');
      dispatch(loadPlatformUsersSuccess(data.users.rows));
      dispatch(loadCount(data.users.count));
      dispatch(loadPageCount(data.data.pageCount));
      return true;
    }, err => {
      console.log(err.message);
    });
  };
}

export function loadGroupUsers(groupId) {
  return dispatch => {
    axios.get(
      `api/group/${groupId}/user/list`,
      { headers: { 'x-auth': localStorage.getItem('x-auth') } }
    )
    .then(({ data }) => {
      dispatch(loadGroupUsersSuccess(data));
    }, err => console.log(err.message));
  };
}

export function addUserToGroup(userId, groupId) {
  return dispatch => {
    return axios.post(
      `api/group/${groupId}/user`,
      { userId },
      { headers: { 'x-auth': localStorage.getItem('x-auth') } }
    )
    .then(({ data }) => {
      swal('Successfully Added To Group');
    }, err => {
      swal('Oops...', err.response.data.message, 'error');
    });
  };
}

export function readMessages(groupId) {
  return dispatch => {
    axios.post(
      `api/group/${groupId}/messages/read`,
      {},
      { headers: { 'x-auth': localStorage.getItem('x-auth') } }
    )
    .then(({ data }) => {
      return;
    }, err => {
      console.log(err);
    });
  };
}
