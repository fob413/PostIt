import C from '../constants';

export const signUp = () => {
  return {
    type: C.SIGN_UP
  };
};

export const signIn = (Username, isLoggedin) => {
  return {
    type: C.SIGN_IN,
    Username,
    isLoggedin
  };
};
