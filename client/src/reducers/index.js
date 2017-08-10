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
        isLoggedIn: action.isLoggedin
      });

    case C.SIGN_IN:
      return Object.assign({}, state, {
        UserName: action.Username,
        isLoggedIn: action.isLoggedin
      });

    case C.SIGN_OUT:
    console.log(action.isLoggedIn);
    return Object.assign({}, state, {
      isLoggedIn: action.isLoggedIn
    });

    default:
      return state;
  }
}