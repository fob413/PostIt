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
 * action creator that loads the current group being viewed
 * @param {object} payLoad the current groups id
 * @return {object} action object of current group id and action type
 */
const loadGroupId = payLoad => ({
  type: CURRENT_GROUP,
  payLoad
});

/**
 * action creator that sets the group messages to the store
 * @param {object} payLoad response from api call
 * @return {object} action object of group messages and action type
 */
const loadGroupMessagesSuccess = payLoad => ({
  type: LOAD_GROUP_MESSAGES,
  payLoad
});

/**
 * action creator that sets the unread messages to the store
 * @param {object} payLoad response from api call
 * @return {object} action object of unread messages and action type
 */
const loadGroupUnreadMessagesSuccess = payLoad => ({
  type: LOAD_UNREAD_MESSAGES,
  payLoad
});

/**
 * action creator that sets the read messages to the store
 * @param {object} payLoad response from api call
 * @return {object} action object of read messages and action type
 */
const loadGroupReadMessagesSuccess = payLoad => ({
  type: LOAD_READ_MESSAGES,
  payLoad
});

/**
 * action creator that sets the searched user api result to the store
 * @param {object} payLoad response from api call
 * @return {object} action object of search result and action type
 */
const loadPlatformUsersSuccess = payLoad => ({
  type: LOAD_PLATFORM_USERS,
  payLoad
});

/**
 * action creator that sets the users in a group to the store
 * @param {object} payLoad response from api call
 * @return {object} action object of user in a group and action type
 */
const loadGroupUsersSuccess = payLoad => ({
  type: LOAD_GROUP_USERS,
  payLoad
});

/**
 * action creator that sets the count of searched users to the store
 * @param {object} payLoad response from api call
 * @return {object} action object of search result count and action type
 */
const loadCount = payLoad => ({
  type: LOAD_COUNT,
  payLoad
});

/**
 * action creator that sets the pagecount of the searched result to the store
 * @param {object} payLoad response from api call
 * @return {object} action object of search result pagecount and action type
 */
const loadPageCount = payLoad => ({
  type: LOAD_PAGE_COUNT,
  payLoad
});

/**
 * filter unread messages
 * @param {array} payLoad payLoad gotten from api call
 * @param {string} userId current user id operating the platform
 * @return {array} array of unread messages
 */
const filterUnreadMessages = (payLoad, userId) => {
  const unreadMessages = [];
  payLoad.map((item) => {
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
 * @param {array} payLoad payLoad gotten from api call
 * @param {string} userId current user id operating the platform
 * @return {array} array of read messages
 */
const filterReadMessages = (payLoad, userId) => {
  let readMessages = [];
  payLoad.map((item) => {
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
    .then(() => {
      return true;
    }, (err) => {
      swal('Oops...', err.message, 'error');
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
    }, (err) => {
      swal('Oops', err.message, 'error');
    });
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
    }, (err) => {
      swal('Oops...', err.message, 'error');
    });
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
      dispatch(loadPageCount(data.paginateData.pageCount));
      return true;
    }, (err) => {
      swal('Oops...', err.message, 'error');
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
    }, (err) => {
      swal('Oops...', err.message, 'error');
    });
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
      swal('Oops...', err.response.data.message, 'error');
    });
  };
}
