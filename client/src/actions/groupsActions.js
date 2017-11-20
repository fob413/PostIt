import axios from 'axios';
import swal from 'sweetalert2';
import { LOAD_GROUPS, UNLOAD_GROUPS } from '../helpers/constants';

/**
 * action creator that sets the groups the user belongs to the store
 * @param {object} payLoad response from api call
 * @return {object} action object of groups and action type
 */
const loadGroupSuccess = payLoad => ({
  type: LOAD_GROUPS,
  payLoad
});

/**
 * action creator that unload groups from the store
 * @return {object} action object of action type
 */
const unloadGroupsSuccess = () => ({
  type: UNLOAD_GROUPS
});

/**
 * api call to load groups to store
 * @return {void}
 */
export function loadGroups() {
  return dispatch => axios.get(
      'api/v1/group/list',
      { headers: { token: localStorage.getItem('token') } }
    )
    .then(({ data }) => {
      dispatch(loadGroupSuccess(data.members));
    }, (err) => {
      swal('Error Loading Groups...', err.response.data.message, 'error');
    });
}

/**
 * api call to create new group
 * @param {string} groupName the name for the group to be created
 * @return {boolean} the response for when the call was successful or not
 */
export function createNewGroup(groupName) {
  return () => axios.post(
      'api/v1/group',
      { groupName },
      { headers: { token: localStorage.getItem('token') } }
    )
    .then(() => true, (err) => {
      swal('Oops...', err.response.data.message, 'error');
      return false;
    });
}

/**
 * function to unloadgroups from the store
 * @return {void}
 */
export function unloadGroups() {
  return dispatch => (
    dispatch(unloadGroupsSuccess())
  );
}
