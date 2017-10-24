import axios from 'axios';
import swal from 'sweetalert2';
import { LOAD_GROUPS, UNLOAD_GROUPS } from '../constants';

const loadGroupSuccess = data => ({
  type: LOAD_GROUPS,
  data
});

const unloadGroupsSuccess = () => ({
  type: UNLOAD_GROUPS
});

/**
 * api call to load groups to store
 * @return {void}
 */
export function loadGroups() {
  return (dispatch) => {
    axios.get(
      'api/group/list',
      { headers: { token: localStorage.getItem('token') } }
    )
    .then(({ data }) => {
      dispatch(loadGroupSuccess(data.members));
    }, (err) => {
      swal('Error Loading Groups...', err.response.data.message, 'error');
    });
  };
}

/**
 * api call to create new group
 * @param {string} groupName the name for the group to be created
 * @return {boolean} the response for when the call was successful or not
 */
export function createNewGroup(groupName) {
  console.log(">>>>>>>");
  return () => axios.post(
      'api/group',
      { groupName },
      { headers: { token: localStorage.getItem('token') } }
    )
    .then(() => true, (err) => {
      // console.log(err.message);
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
