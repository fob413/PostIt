import C from '../constants';

const initialState = {
  UserName: '',
  email: '',
  telephone: '',
  isLoggedIn: true,
  token: '',
  groups: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case C.SIGN_UP:
      return Object.assign({}, state, {
        UserName: action.Username,
        isLoggedIn: action.isLoggedin,
        token: action.token,
        email: action.email,
        telephone: action.telephone
      });

    case C.SIGN_IN:
      return Object.assign({}, state, {
        UserName: action.Username,
        isLoggedIn: action.isLoggedin,
        token: action.token,
        telephone: action.telephone,
        email: action.email
      });

    case C.SIGN_OUT:
    return Object.assign({}, state, {
      UserName: '',
      isLoggedIn: action.isLoggedIn,
      token: '',
      email: '',
      telephone: '',
      groups: []
    });

    case C.GROUPS_LIST:
      return Object.assign({}, state, {
        groups: action.groups
      });

    default:
      return state;
  }
};
