import axios from 'axios';
import { SIGN_UP, SIGN_IN, SIGN_OUT } from '../constants';

const signUpSuccess = data => ({
  type: SIGN_UP,
  data
});

const signInSuccess = data => ({
  type: SIGN_IN,
  data
});

const signOutSuccess = data => ({
  type: SIGN_OUT,
  data
});

export function signUserUp(user) {
  return dispatch => (
    axios.post('/api/user/signup', user)
  ).then(({ data }) => {
    dispatch(signUpSuccess(data));
    localStorage.setItem('x-auth', data.token);
    localStorage.setItem('username', data.UserName);
    localStorage.setItem('email', data.email);
    localStorage.setItem('telephone', data.telephone);
    return true;
  }, (err) => {
    console.log(err.message);
  });
}

export function signUserOut() {
  return dispatch => (
   axios.get(
    'api/user/signout',
    {headers: {'x-auth': localStorage.getItem('x-auth')}}
  )
  .then(({ data }) => {
    localStorage.removeItem('x-auth');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    localStorage.removeItem('telephone');
    dispatch(signOutSuccess(data));
    return true;
  }, (err) => {
    console.log(err.message);
  }) 
  );
}

export function signUserIn(user) {
  return dispatch => (
    axios.post('api/user/signin', user))
    .then(({ data }) => {
      dispatch(signInSuccess(data));
      localStorage.setItem('x-auth', data.token);
      localStorage.setItem('username', data.UserName);
      localStorage.setItem('email', data.email);
      localStorage.setItem('telephone', data.telephone);
      return true;
    }, (err) => {
      console.log(err.message);
    });
}