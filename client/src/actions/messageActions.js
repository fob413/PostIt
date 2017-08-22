import axios from 'axios';
import { 
  CURRENT_GROUP, 
  LOAD_GROUP_MESSAGES, 
  LOAD_PLATFORM_USERS, 
  LOAD_GROUP_USERS,
  ADD_USER_TO_GROUP
} from '../constants';

const loadGroupId = data => ({
  type: CURRENT_GROUP,
  data
});

const loadGroupMessagesSuccess = data => ({
  type: LOAD_GROUP_MESSAGES,
  data
});

const loadPlatformUsersSuccess = data => ({
  type: LOAD_PLATFORM_USERS,
  data
});

const loadGroupUsersSuccess = data => ({
  type: LOAD_GROUP_USERS,
  data
});

export function loadCurrentGroup(groupId) {
  return dispatch => (
    dispatch(loadGroupId(groupId))
  );
}

export function sendMessage(message, groupId, priority) {
  return dispatch => {
    return axios.post(
      `api/group/${groupId}/message`,
      {content: message, priority: priority},
      {headers: {'x-auth': localStorage.getItem('x-auth')}}
    )
    .then(({ data }) => {
      console.log(message);
      console.log(priority);
      return true;
    }, (err) => {
      console.log(err.message);
    });
  };
}

export function loadGroupMessages(groupId) {
  return dispatch => {
    axios.get(
      `api/group/${groupId}/messages`,
      {headers: {'x-auth': localStorage.getItem('x-auth')}}
    )
    .then(({ data }) => {
      dispatch(loadGroupMessagesSuccess(data));
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
      dispatch(loadPlatformUsersSuccess(data))
    }, err => console.log(err));
  };
}

export function loadGroupUsers(groupId) {
  return dispatch => {
    axios.get(
      `api/group/${groupId}/user/list`,
      {headers: {'x-auth': localStorage.getItem('x-auth')}}
    )
    .then (({ data} ) => {
      dispatch(loadGroupUsersSuccess(data));
    }, err => console.log(err));
  };
}

export function addUserToGroup(userId, groupId) {
  return dispatch => {
    return axios.post(
      `api/group/${groupId}/user`,
      {userId},
      {headers: {'x-auth': localStorage.getItem('x-auth')}}
    )
    .then(( { data } ) => {
      console.log(data);
    }, err => {
      console.log(err.message);
    })
  };
}
