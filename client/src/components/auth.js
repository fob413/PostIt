import jwt from 'jsonwebtoken';
import {secret} from './config';

export function authenticateUser() {
  return new Promise((resolve, reject) => {
    if(localStorage.getItem('x-auth')){
        let token = localStorage.getItem('x-auth');
        jwt.verify(token, secret, (err, decoded) => {
          if (err) {
            localStorage.removeItem('x-auth');
            reject(false);
          } else {
            resolve(decoded);
          }
        });
      } else {
        localStorage.removeItem('x-auth');
        reject(false);
      }
  });
}

export function test() {
  return true;
}