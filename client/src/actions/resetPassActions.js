import axios from 'axios';
import { RESET_PASSWORD } from '../helpers/constants';

export function forgotPassword ( email ) {
  return dispatch => (
    axios.post('/api/forgot/password', {email})
  ).then(({ data }) => {
    return data;
  }, err => {
    return err.response.data;
  });
}

export function authToken( token ) {
  return dispatch => (
    axios.post('/api/reset/token', {token})
  ).then(({ data }) => {
    return data;
  }, err => {
    return err.response.data;
  });
}

export function resetPassword ( token, newPassword, confirmPassword ) {
  return dispatch => {
    return axios.post (
      `/api/reset/password/${token}`, 
      {newPassword, confirmPassword}
    ).then (({ data }) => {
      return data;
    }, err => {
      console.log(err.response.data);
      return err.response.data;
    })
  }
}
