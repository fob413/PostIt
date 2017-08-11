import C from '../constants';

export const signUp = (Username, isLoggedin, token) => {
  return {
    type: C.SIGN_UP,
    Username,
    isLoggedin,
    token
  };
};

export const signIn = (Username, isLoggedin, token) => {
  return {
    type: C.SIGN_IN,
    Username,
    isLoggedin,
    token
  };
};

export const signOut = (isLoggedIn) => {
  return {
    type: C.SIGN_OUT,
    isLoggedIn
  };
};
