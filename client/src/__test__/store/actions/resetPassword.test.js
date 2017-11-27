import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import mockLocalStorage from '../../__mocks__/mockLocalStorage';
import mockData from '../../__mocks__/mockData';
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
    const email = mockData.email;

    mock.onPost('/api/v1/forgot/password')
    .reply(200, {
      success: true,
      message: 'Reset password link has been sent to your mail'
    });

    const expectedAction = mockData.emptyAction;

    return store.dispatch(forgotPassword(email))
    .then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });

  it('should have a success of false when unsuccessful', () => {
    mock.reset();
    const store = mockStore({});
    const email = mockData.email;

    mock.onPost('/api/v1/forgot/password')
    .reply(400, {
      success: false,
      message: 'An error has occured'
    });

    const expectedAction = mockData.emptyAction;

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
    const token = mockData.token;

    mock.onPost('/api/v1/reset/token')
    .reply(200, {
      success: true,
      message: 'Authenticated to change password'
    });

    const expectedAction = mockData.emptyAction;

    return store.dispatch(authToken(token))
    .then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });

  it('should have a success of true when successful', () => {
    mock.reset();
    const store = mockStore({});
    const token = mockData.token;

    mock.onPost('/api/v1/reset/token')
    .reply(400, {
      success: false,
      message: 'Not authenticated to change password'
    });

    const expectedAction = mockData.emptyAction;

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
    const token = mockData.token;
    const newPassword = mockData.password;
    const confirmPassword = mockData.password;

    mock.onPost(`/api/v1/reset/password/${token}`)
    .reply(200, {
      success: true,
      message: 'Successfully changed password'
    });

    const expectedAction = mockData.emptyAction;

    return store.dispatch(resetPassword(token, newPassword, confirmPassword))
    .then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });

  it('should have a success of true when successful', () => {
    const store = mockStore({});
    const token = mockData.token;
    const newPassword = mockData.password;
    const confirmPassword = mockData.password;

    mock.onPost(`/api/v1/reset/password/${token}`)
    .reply(200, {
      success: true,
      message: 'Successfully changed password'
    });

    const expectedAction = mockData.emptyAction;

    return store.dispatch(resetPassword(token, newPassword, confirmPassword))
    .then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });

  it('should have a success of true when successful', () => {
    mock.reset();
    const store = mockStore({});
    const token = mockData.token;
    const newPassword = mockData.password;
    const confirmPassword = mockData.password;

    mock.onPost(`/api/v1/reset/password/${token}`)
    .reply(400, {
      success: false,
      message: 'An error has occured'
    });

    const expectedAction = mockData.emptyAction;

    return store.dispatch(resetPassword(token, newPassword, confirmPassword))
    .then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });
});

