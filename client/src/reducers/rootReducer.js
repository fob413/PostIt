import { combineReducers } from 'redux';
import MyApp from './index';
import Groups from './groupReducer';

export default combineReducers({
  MyApp,
  Groups
});