import jwt from 'jsonwebtoken';
import { secret } from './config';
import { RELOAD_USER_IN } from '../constants';

// export function authenticateUser() {
//   return new Promise((resolve, reject) => {
//     if(localStorage.getItem('x-auth')){
//         let token = localStorage.getItem('x-auth');
//         jwt.verify(token, secret, (err, decoded) => {
//           if (err) {
//             localStorage.removeItem('x-auth');
//             reject(false);
//           } else {
//             resolve(decoded);
//           }
//         });
//       } else {
//         localStorage.removeItem('x-auth');
//         reject(false);
//       }
//   });
// }

/**
 * authentication function
 * @param {string} token users token to be authenticated
 * @param {function} dispatch function to dispatch to store
 * @return {void}
 */
export function authenticateUser(token, dispatch) {
  jwt.verify(token, secret, (err, decoded) => {
    if (!err) {
      const data = {
        userName: decoded.userName,
        email: decoded.email,
        telephone: decoded.telephone,
        userId: decoded.userId
      };
      dispatch({
        type: RELOAD_USER_IN,
        data
      });
    }
  });
}

/**
 * @return {void}
 */
export function test() {
  return true;
}
