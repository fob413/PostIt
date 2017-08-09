import C from '../constants';

const initialState = {
  UserName: '',
  email: '',
  isLoggedIn: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case C.SIGN_UP:
      console.log('attempting to sign up');
      return;

    case C.SIGN_IN:
      console.log('attempting to sign in');
      return Object.assign({}, state, {
        UserName: action.Username,
        isLoggedIn: action.isLoggedin
      });

    default:
      return state;
  }
}