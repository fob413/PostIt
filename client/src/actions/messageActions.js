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
} from '../helpers/constants';


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
      `api/v1/group/${groupId}/message`,
      { content: message, priority },
      { headers: { token: localStorage.getItem('token') } }
    )
    .then(({ data }) => {
      return true;
    }, (err) => {
      // console.log(err.message);
    });
  };
}


/**
 * load messages in a particular group
 * @export
 * @param {any} groupId group id of the group in view
 * @param {any} userId uses id
 * @return{void}
 */
export function loadGroupMessages(groupId, userId) {
  return (dispatch) => {
    return axios.get(
      `api/v1/group/${groupId}/messages`,
      { headers: { token: localStorage.getItem('token') } }
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


/**
 * load users on the platform
 * @export
 * @return{void}
 */
export function loadPlatformUsers() {
  return (dispatch) => {
    return axios.get(
      'api/v1/users/list',
      { headers: { token: localStorage.getItem('token') } }
    )
    .then(({ data }) => {
      dispatch(loadPlatformUsersSuccess(data));
    }, err => console.log(err));
  };
}


/**
 * search for users ono the platform
 * @export
 * @param {any} offset maximum number of list length
 * @param {any} userName the name of the user being search for
 * @return {void}
 */
export function searchUsers(offset, userName) {
  return (dispatch) => {
    return axios.post(
      `api/v1/users/list/${offset}`,
      { userName, limit: 5 },
      { headers: { token: localStorage.getItem('token') } }
    )
    .then(({ data }) => {
      if (data.users.rows.length < 1) Materialize.toast('No user found', 4000, 'red');
      dispatch(loadPlatformUsersSuccess(data.users.rows));
      dispatch(loadCount(data.users.count));
      dispatch(loadPageCount(data.data.pageCount));
      return true;
    }, (err) => {
      console.log(err.message);
    });
  };
}


/**
 * load users in a particular group
 * @export
 * @param {any} groupId id of group in view
 * @return {void}
 */
export function loadGroupUsers(groupId) {
  return (dispatch) => {
    return axios.get(
      `api/v1/group/${groupId}/user/list`,
      { headers: { token: localStorage.getItem('token') } }
    )
    .then(({ data }) => {
      dispatch(loadGroupUsersSuccess(data));
    }, err => console.log(err.message));
  };
}


/**
 * add user to a particular group
 * @export
 * @param {any} userId id of the user to be added to the group
 * @param {any} groupId id of the group in view
 * @return {void}
 */
export function addUserToGroup(userId, groupId) {
  return () => {
    return axios.post(
      `api/v1/group/${groupId}/user`,
      { userId },
      { headers: { token: localStorage.getItem('token') } }
    )
    .then(() => {
      swal('Successfully Added To Group');
    }, (err) => {
      swal('Oops...', err.response.data.message, 'error');
    });
  };
}


/**
 * read messages that the user has already seen
 * @export
 * @param {any} groupId id of the group in view
 * @return {void}
 */
export function readMessages(groupId) {
  return () => {
    return axios.post(
      `api/v1/group/${groupId}/messages/read`,
      {},
      { headers: { token: localStorage.getItem('token') } }
    )
    .then(() => {
      return;
    }, (err) => {
      console.log(err);
    });
  };
}
