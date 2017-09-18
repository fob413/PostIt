import { SIGN_UP, SIGN_IN, SIGN_OUT, GROUPS_LIST } from '../constants';

export const signUp = (Username, isLoggedin, token, email, telephone) => ({
  type: SIGN_UP,
  Username,
  isLoggedin,
  token,
  email,
  telephone
});

export const signIn = (Username, isLoggedin, token, email, telephone) => ({
  type: SIGN_IN,
  Username,
  isLoggedin,
  token,
  telephone,
  email
});

export const signOut = isLoggedIn => ({
  type: SIGN_OUT,
  isLoggedIn
});

export const groupList = groups => ({
  type: GROUPS_LIST,
  groups
});
