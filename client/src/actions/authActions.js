import axios from 'axios';
import swal from 'sweetalert2';
import { SIGN_UP, SIGN_IN, SIGN_OUT, RELOAD_USER_IN } from '../helpers/constants';

/**
 * action creator that sets current user to the store
 * @param {object} payLoad response from siginup api call
 * @return {object} action object of current user and action type
 */
const signUpSuccess = payLoad => ({
  type: SIGN_UP,
  payLoad
});

/**
 * action creator that sets current user to the store
 * @param {object} payLoad response from signin api call
 * @return {object} action object of current user and action type
 */
const signInSuccess = payLoad => ({
  type: SIGN_IN,
  payLoad
});

/**
 * action creator that clears the store on user signout
 * @param {object} payLoad response from signout api call
 * @return {object} cleared data object and action type
 */
const signOutSuccess = payLoad => ({
  type: SIGN_OUT,
  payLoad
});

/**
 * action creator that sets current user to the store
 * @param {string} userName current user's name
 * @param {string} email current user's email
 * @param {Number} telephone current user's telephone number
 * @param {Number} userId current user's id
 * @return {object} action object of current user and action type
 */
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
