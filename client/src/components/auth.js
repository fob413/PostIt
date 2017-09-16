import jwt from 'jsonwebtoken';
import {secret} from './config';
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

export function authenticateUser(token, dispatch) {
  jwt.verify(token, secret, (err, decoded) => {
    if (!err) {
      const data = {
        UserName : decoded.UserName,
        email : decoded.email,
        telephone : decoded.telephone
      };
      dispatch({
        type: RELOAD_USER_IN,
        data
      });
    }
  });
}

export function test() {
  return true;
}