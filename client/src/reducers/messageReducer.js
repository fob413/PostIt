import { 
  LOAD_GROUP_MESSAGES, 
  CURRENT_GROUP, 
  LOAD_PLATFORM_USERS,
  LOAD_GROUP_USERS
} from '../constants';

const initialState = {
  groupId: '',
  messages: [],
  groupUsers: [],
  PlatformUsers: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_GROUP_MESSAGES:
      return Object.assign({}, state, {
        messages: action.data
      });

      case CURRENT_GROUP:
        return Object.assign({}, state, {
          groupId: action.data
        });

      case LOAD_PLATFORM_USERS:
        return Object.assign({}, state, {
          PlatformUsers: action.data
        });

      case LOAD_GROUP_USERS:
        return Object.assign({}, state, {
          groupUsers: action.data
        });

    default:
      return state;
  }
};