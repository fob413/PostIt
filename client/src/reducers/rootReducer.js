import { combineReducers } from 'redux';
import Auth from './auth';
import Groups from './groupReducer';
import Messages from './messageReducer';

export default combineReducers({
  Auth,
  Groups,
  Messages
});
