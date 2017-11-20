import { SIGN_IN, SIGN_OUT, SIGN_UP, RELOAD_USER_IN } from '../helpers/constants';

const initialState = {
  userName: '',
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
        userName: action.payLoad.userName,
        isLoggedIn: action.payLoad.isLoggedin,
        token: action.payLoad.token,
        email: action.payLoad.email,
        telephone: action.payLoad.telephone,
        userId: action.payLoad.userId
      });

    case SIGN_IN:
      return Object.assign({}, state, {
        userName: action.payLoad.userName,
        isLoggedIn: action.payLoad.isLoggedin,
        token: action.payLoad.token,
        telephone: action.payLoad.telephone,
        email: action.payLoad.email,
        userId: action.payLoad.userId
      });

    case SIGN_OUT:
      return Object.assign({}, state, {
        userName: '',
        isLoggedIn: action.payLoad.isLoggedIn,
        token: '',
        email: '',
        telephone: '',
        groups: [],
        userId: ''
      });

    case RELOAD_USER_IN:
      return Object.assign({}, state, {
        userName: action.payLoad.userName,
        email: action.payLoad.email,
        telephone: action.payLoad.telephone,
        userId: action.payLoad.userId,
        isLoggedIn: true
      });

    default:
      return state;
  }
};
