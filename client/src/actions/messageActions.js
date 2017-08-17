import axios from 'axios';
import { CURRENT_GROUP } from '../constants';

const loadGroupId = data => ({
  type: CURRENT_GROUP,
  data
});

export function loadCurrentGroup(groupId) {
  console.log(groupId);
  console.log('load group id');
  // return dispatchEvent(loadGroupId(groupId));
}