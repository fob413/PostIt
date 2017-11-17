import axios from 'axios';

/**
 * api call to request a change in password
 * @export
 * @param {any} email users email
 * @return {void}
 */
export function forgotPassword(email) {
  return () => (
    axios.post('/api/v1/forgot/password', { email })
  ).then(({ data }) => data,
    err => err.response.data);
}

/**
 * authenticate that the user has access to the page
 * @export
 * @param {any} token authenticated token
 * @return {void}
 */
export function authToken(token) {
  return () => (
    axios.post('/api/v1/reset/token', { token })
  ).then(({ data }) => data,
  err => err.response.data
  );
}

/**
 * change the users password
 * @export
 * @param {any} token authenticate the user
 * @param {any} newPassword users new password
 * @param {any} confirmPassword confirm the new password
 * @return {void}
 */
export function resetPassword(token, newPassword, confirmPassword) {
  return () => axios.post(
      `/api/v1/reset/password/${token}`,
      { newPassword, confirmPassword }
    ).then(({ data }) => data,
    err => err.response.data);
}
