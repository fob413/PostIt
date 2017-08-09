import C from '../constants';

export const signUp = (Username, isLoggedin) => {
  return {
    type: C.SIGN_UP,
    Username,
    isLoggedin
  };
};

export const signIn = (Username, isLoggedin) => {
  return {
    type: C.SIGN_IN,
    Username,
    isLoggedin
  };
};

export const signOut = (isLoggedin) => {
  return {
    type: C.SIGN_OUT,
    isLoggedIn: isLoggedin
  };
};
