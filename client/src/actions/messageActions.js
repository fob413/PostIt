import axios from 'axios';
import { CURRENT_GROUP } from '../constants';

const loadGroupId = data => ({
  type: CURRENT_GROUP,
  data
});

export function loadCurrentGroup(groupId) {
  return dispatch => (
    dispatch(loadGroupId(groupId))
  );
  // return dispatchEvent(loadGroupId(groupId));
}
