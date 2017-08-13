import C from '../constants';

export const signUp = (Username, isLoggedin, token, email, telephone) => {
  return {
    type: C.SIGN_UP,
    Username,
    isLoggedin,
    token,
    email,
    telephone
  };
};

export const signIn = (Username, isLoggedin, token, email, telephone) => {
  return {
    type: C.SIGN_IN,
    Username,
    isLoggedin,
    token,
    telephone,
    email
  };
};

export const signOut = (isLoggedIn) => {
  return {
    type: C.SIGN_OUT,
    isLoggedIn
  };
};

export const groupList = (group) => {
  return {
    type: C.GROUPS_LIST,
    group
  };
};