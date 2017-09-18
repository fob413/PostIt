import { combineReducers } from 'redux';
import MyApp from './index';
import Groups from './groupReducer';
import Messages from './messageReducer';

export default combineReducers({
  MyApp,
  Groups,
  Messages
});
