import C from '../constants';

const initialState = {
  UserName: '',
  email: '',
  isLoggedIn: false,
  token: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case C.SIGN_UP:
      return Object.assign({}, state, {
        UserName: action.Username,
        isLoggedIn: action.isLoggedin,
        token: action.token
      });

    case C.SIGN_IN:
      return Object.assign({}, state, {
        UserName: action.Username,
        isLoggedIn: action.isLoggedin,
        token: action.token
      });

    case C.SIGN_OUT:
    return Object.assign({}, state, {
      UserName: '',
      isLoggedIn: action.isLoggedIn,
      token: ''
    });

    default:
      return state;
  }
};
