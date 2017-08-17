import { LOAD_GROUP_MESSAGES, CURRENT_GROUP } from '../constants';

const initialState = {
  groupId: '',
  messages: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_GROUP_MESSAGES:
      return Object.assign({}, state, {
        messages: action.groups
      });

      case CURRENT_GROUP:
        return Object.assign({}, state, {
          groupId: action.data
        });

    default:
      return state;
  }
};
