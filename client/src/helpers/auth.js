import jwt from 'jsonwebtoken';
import { RELOAD_USER_IN } from '../helpers/constants';

/**
 * authentication function
 * @param {string} token users token to be authenticated
 * @param {function} dispatch function to dispatch to store
 * @return {void}
 */
export function authenticateUser(token, dispatch) {
  const payLoad = {
    userName: jwt.decode(token).userName,
    email: jwt.decode(token).email,
    telephone: jwt.decode(token).telephone,
    userId: jwt.decode(token).userId
  };
  dispatch({
    type: RELOAD_USER_IN,
    payLoad
  });
}
