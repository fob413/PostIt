import jwt from 'jsonwebtoken';
import {secret} from './config';

export function authenticateUser() {
  return new Promise((resolve, reject) => {
    if(localStorage.getItem('x-auth')){
        let token = localStorage.getItem('x-auth');
        jwt.verify(token, secret, (err, decoded) => {
          if (err) {
            console.log(`failed to decode ${err}`);
            localStorage.removeItem('x-auth');
            localStorage.removeItem('email');
            localStorage.removeItem('telephone');
            localStorage.removeItem('username');
            reject(false);
          } else {
            // this.props.history.push('/broadpage');
            console.log('return true here');
            localStorage.setItem("username", decoded.UserName);
            localStorage.setItem("email", decoded.email);
            localStorage.setItem("telephone", decoded.telephone);
            resolve(true);
          }
        });
      } else {
        // this.props.history.push('/signin');
        reject(false);
      }
  });
}

export function test() {
  return true;
}