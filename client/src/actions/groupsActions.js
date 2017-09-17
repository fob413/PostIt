import axios from 'axios';
import { LOAD_GROUPS, UNLOAD_GROUPS  } from '../constants';
import swal from 'sweetalert2'

const loadGroupSuccess = data => ({
  type: LOAD_GROUPS,
  data
});

const createGroupSuccess = data => ({
  // do something
})

const unloadGroupsSuccess = data => ({
  type: UNLOAD_GROUPS
})

export function loadGroups() {
  return dispatch => {
    axios.get(
      'api/group/list',
      {headers: {'x-auth': localStorage.getItem('x-auth')}}
    )
    .then(({ data }) => {
      dispatch(loadGroupSuccess(data.members));
    }, (err) => {
      console.log(err.message);
    });
  };
}

export function createNewGroup(GroupName) {
  return dispatch => {
   return axios.post(
      'api/group',
      {GroupName},
      {headers: {'x-auth': localStorage.getItem('x-auth')}}
    )
    .then(({ data }) => {
      return true;
    }, (err) => {
      // console.log(err.message);
      swal('Oops...', err.response.data.message, 'error');
    });
  };
}

export function unloadGroups() {
  return dispatch => (
    dispatch(unloadGroupsSuccess())
  );
}
