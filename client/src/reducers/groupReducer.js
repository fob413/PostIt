import { LOAD_GROUPS, UNLOAD_GROUPS } from '../helpers/constants';

const initialState = {
  Groups: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_GROUPS:
      return [
        ...action.payLoad
      ];

    case UNLOAD_GROUPS:
      return {
        Groups: []
      };

    default:
      return state;
  }
};
