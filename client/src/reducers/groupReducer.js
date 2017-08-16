import { LOAD_GROUPS } from '../constants';

const initialState = {
  Groups: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_GROUPS:
      return [
        ...action.data
      ];

    default:
      return state;
  }
};
