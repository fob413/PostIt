import {
  LOAD_GROUP_MESSAGES,
  CURRENT_GROUP,
  LOAD_PLATFORM_USERS,
  LOAD_GROUP_USERS,
  LOAD_UNREAD_MESSAGES,
  LOAD_READ_MESSAGES,
  LOAD_COUNT,
  LOAD_PAGE_COUNT
} from '../helpers/constants';

const initialState = {
  groupId: '',
  messages: [],
  unreadMessages: [],
  readMessages: [],
  groupUsers: [],
  PlatformUsers: [],
  count: 0,
  pageCount: 0
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

    case LOAD_UNREAD_MESSAGES:
      return Object.assign({}, state, {
        unreadMessages: action.data
      });

    case LOAD_READ_MESSAGES:
      return Object.assign({}, state, {
        readMessages: action.data
      });

    case LOAD_COUNT:
      return Object.assign({}, state, {
        count: action.data
      });

    case LOAD_PAGE_COUNT:
      return Object.assign({}, state, {
        pageCount: action.data
      });

    default:
      return state;
  }
};
