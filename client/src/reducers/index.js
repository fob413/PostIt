import { SIGN_IN, SIGN_OUT, SIGN_UP, GROUPS_LIST } from '../constants';

const initialState = {
  UserName: '',
  email: '',
  telephone: '',
  isLoggedIn: false,
  token: '',
  groups: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGN_UP:
      return Object.assign({}, state, {
        UserName: action.data.Username,
        isLoggedIn: action.data.isLoggedin,
        token: action.data.token,
        email: action.data.email,
        telephone: action.data.telephone
      });

    case SIGN_IN:
      return Object.assign({}, state, {
        UserName: action.data.Username,
        isLoggedIn: action.data.isLoggedin,
        token: action.data.token,
        telephone: action.data.telephone,
        email: action.data.email
      });

    case SIGN_OUT:
    return Object.assign({}, state, {
      UserName: '',
      isLoggedIn: action.data.isLoggedIn,
      token: '',
      email: '',
      telephone: '',
      groups: []
    });

    case GROUPS_LIST:
      return Object.assign({}, state, {
        groups: action.groups
      });

    default:
      return state;
  }
};
