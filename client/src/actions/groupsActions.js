import axios from 'axios';
import { LOAD_GROUPS } from '../constants';

const loadGroupSuccess = data => ({
  type: LOAD_GROUPS,
  data
});

const createGroupSuccess = data => ({
  // do something
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
    axios.post(
      'api/group',
      {GroupName},
      {headers: {'x-auth': localStorage.getItem('x-auth')}}
    )
    .then(({ data }) => {
      console.log(data);
      return true;
    }, (err) => {
      console.log(err.message);
    });
  };
}

export function unloadGroups() {
  console.log('time to unload groups');
}