import { SIGN_IN, SIGN_OUT, SIGN_UP, RELOAD_USER_IN } from '../constants';

const initialState = {
  UserName: '',
  email: '',
  telephone: '',
  userId: '',
  isLoggedIn: false,
  token: '',
  groups: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGN_UP:
      return Object.assign({}, state, {
        UserName: action.data.UserName,
        isLoggedIn: action.data.isLoggedin,
        token: action.data.token,
        email: action.data.email,
        telephone: action.data.telephone,
        userId: action.data.userId
      });

    case SIGN_IN:
      return Object.assign({}, state, {
        UserName: action.data.UserName,
        isLoggedIn: action.data.isLoggedin,
        token: action.data.token,
        telephone: action.data.telephone,
        email: action.data.email,
        userId: action.data.userId
      });

    case SIGN_OUT:
      return Object.assign({}, state, {
        UserName: '',
        isLoggedIn: action.data.isLoggedIn,
        token: '',
        email: '',
        telephone: '',
        groups: [],
        userId: ''
      });

    case RELOAD_USER_IN:
      return Object.assign({}, state, {
        UserName: action.data.UserName,
        email: action.data.email,
        telephone: action.data.telephone,
        userId: action.data.userId,
        isLoggedIn: true
      });

    default:
      return state;
  }
};
