import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import mockLocalStorage from '../../_mocks_/mockLocalStorage';
import * as types from '../../../helpers/constants';
import data from '../../_mocks_/mockData';
import {
  forgotPassword,
  authToken,
  resetPassword
} from '../../../actions/resetPassActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mock = new MockAdapter(axios);
window.localStorage = mockLocalStorage;

describe('forgotPassword action', () => {
  it('should contain a forgotPassword function', () => {
    expect(typeof (forgotPassword())).toBe('function');
  });

  it('should have a success of true when successful', () => {
    const store = mockStore({});
    const email = data.email;

    mock.onPost('/api/forgot/password')
    .reply(200, {
      success: true,
      message: 'Reset password link has been sent to your mail'
    });

    const expectedAction = data.emptyAction;

    return store.dispatch(forgotPassword(email))
    .then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });

  it('should have a success of false when unsuccessful', () => {
    mock.reset();
    const store = mockStore({});
    const email = data.email;

    mock.onPost('/api/forgot/password')
    .reply(400, {
      success: false,
      message: 'An error has occured'
    });

    const expectedAction = data.emptyAction;

    return store.dispatch(forgotPassword(email))
    .then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });
});

describe('authToken action', () => {
  it('should contain a authToken function', () => {
    expect(typeof (authToken())).toBe('function');
  });

  it('should have a success of true when successful', () => {
    const store = mockStore({});
    const token = data.token;

    mock.onPost('/api/reset/token')
    .reply(200, {
      success: true,
      message: 'Authenticated to change password'
    });

    const expectedAction = data.emptyAction;

    return store.dispatch(authToken(token))
    .then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });

  it('should have a success of true when successful', () => {
    mock.reset();
    const store = mockStore({});
    const token = data.token;

    mock.onPost('/api/reset/token')
    .reply(400, {
      success: false,
      message: 'Not authenticated to change password'
    });

    const expectedAction = data.emptyAction;

    return store.dispatch(authToken(token))
    .then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });
});

describe('resetPassword action', () => {
  it('should contain a forgotPassword function', () => {
    expect(typeof (resetPassword())).toBe('function');
  });

  it('should have a success of true when successful', () => {
    const store = mockStore({});
    const token = data.token;
    const newPassword = data.password;
    const confirmPassword = data.password;

    mock.onPost(`/api/reset/password/${token}`)
    .reply(200, {
      success: true,
      message: 'Successfully changed password'
    });

    const expectedAction = data.emptyAction;

    return store.dispatch(resetPassword(token, newPassword, confirmPassword))
    .then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });

  it('should have a success of true when successful', () => {
    const store = mockStore({});
    const token = data.token;
    const newPassword = data.password;
    const confirmPassword = data.password;

    mock.onPost(`/api/reset/password/${token}`)
    .reply(200, {
      success: true,
      message: 'Successfully changed password'
    });

    const expectedAction = data.emptyAction;

    return store.dispatch(resetPassword(token, newPassword, confirmPassword))
    .then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });

  it('should have a success of true when successful', () => {
    mock.reset();
    const store = mockStore({});
    const token = data.token;
    const newPassword = data.password;
    const confirmPassword = data.password;

    mock.onPost(`/api/reset/password/${token}`)
    .reply(400, {
      success: false,
      message: 'An error has occured'
    });

    const expectedAction = data.emptyAction;

    return store.dispatch(resetPassword(token, newPassword, confirmPassword))
    .then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });
});

