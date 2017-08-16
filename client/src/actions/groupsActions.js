import axios from 'axios';
import { LOAD_GROUPS } from '../constants';

const loadGroupSuccess = data => ({
  type: LOAD_GROUPS,
  data
});

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