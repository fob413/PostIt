import axios from 'axios';
import swal from 'sweetalert2';
import { SIGN_UP, SIGN_IN, SIGN_OUT, RELOAD_USER_IN } from '../helpers/constants';

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

const reloadUserInSuccess = (userName, email, telephone, userId) => ({
  type: RELOAD_USER_IN,
  userName,
  email,
  telephone,
  userId
});

/**
 * api call to sign up a new user
 * @param {object} user object of users information
 * @return {boolean} returns if the call is successful or not
 */
export function signUserUp(user) {
  return dispatch => (
    axios.post('/api/v1/user/signup', user)
  ).then(({ data }) => {
    localStorage.setItem('token', data.token);
    dispatch(signUpSuccess(data));
    return true;
  }, (err) => {
    swal('Oops...', err.response.data.message, 'error');
    return false;
  });
}

/**
 * api call to sign a user out of the platform
 * @return {boolean} returns if the call is successful
 */
export function signUserOut() {
  return dispatch => (
   axios.get(
    'api/v1/user/signout',
    { headers: { token: localStorage.getItem('token') } }
  )
  .then(({ data }) => {
    localStorage.removeItem('token');
    dispatch(signOutSuccess(data));
    return true;
  }, (err) => {
    swal('Oops...', err.response.data.message, 'error');
    return false;
  })
  );
}

/**
 * api call to sign a user in
 * @param {object} user object of users information
 * @return {boolean} returns if the call is successful
 */
export function signUserIn(user) {
  return dispatch => (
    axios.post('api/v1/user/signin', user))
    .then(({ data }) => {
      localStorage.setItem('token', data.token);
      dispatch(signInSuccess(data));
      return true;
    }, (err) => {
      swal('Oops...', err.response.data.message, 'error');
      return false;
    });
}

/**
 * reload user into the store
 * @param {string} userName the users username
 * @param {string} email the users email
 * @param {string} telephone the users telephone number
 * @return {void}
 */
export function reloadUserIn(userName, email, telephone) {
  return dispatch => (
    dispatch(reloadUserInSuccess(userName, email, telephone))
  );
}
