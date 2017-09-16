import axios from 'axios';
import { SIGN_UP, SIGN_IN, SIGN_OUT, RELOAD_USER_IN } from '../constants';
import swal from 'sweetalert2';

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

const reloadUserInSuccess = (UserName, email, telephone, userId) => ({
  type: RELOAD_USER_IN,
  UserName,
  email,
  telephone,
  userId
});

export function signUserUp(user) {
  return dispatch => (
    axios.post('/api/user/signup', user)
  ).then(({ data }) => {
    localStorage.setItem('x-auth', data.token);
    dispatch(signUpSuccess(data));
    return true;
  }, (err) => {
    swal('Oops...', err.response.data.message, 'error');
    // console.log(err.message);
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
      localStorage.setItem('x-auth', data.token);
      dispatch(signInSuccess(data));
      return true;
    }, (err) => {
      swal('Oops...', err.response.data.message, 'error');
    });
}

export function reloadUserIn(UserName, email, telephone) {
  return dispatch => (
    dispatch(reloadUserInSuccess(UserName, email, telephone))
  );
}
