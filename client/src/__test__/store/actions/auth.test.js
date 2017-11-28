import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import mockLocalStorage from '../../__mocks__/mockLocalStorage';
import * as types from '../../../helpers/constants';
import mockData from '../../__mocks__/mockData';
import {
  signUserUp,
  signUserIn,
  signUserOut,
  reloadUserIn
} from '../../../actions/authActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mock = new MockAdapter(axios);
window.localStorage = mockLocalStorage;
const { authAction } = mockData.actions;

describe('Sign up action', () => {
  beforeEach(() => {
    mock.reset();
  });
  const user = mockData.userData;
  const token = mockData.token;
  const store = mockStore({});

  it('should contain a sign up function', () => {
    expect(typeof (signUserUp())).toBe('function');
  });

  it('should dispatch SIGN UP on successful sign up', () => {
    mock.onPost('api/v1/user/signup', user)
    .reply(201, {
      token,
      message: 'Successfully signed user up',
      success: true
    });

    const expectedAction = authAction.signupSuccess;

    return store.dispatch(signUserUp(user))
    .then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });

  it('should not dispatch SIGN UP when unsuccessful', () => {
    mock.reset();
    const stores = mockStore({});
    mock.onPost('api/v1/user/signup')
    .reply(400, {
      message: 'An error occured',
      success: false
    });

    const emptyAction = mockData.emptyAction;

    return stores.dispatch(signUserUp(user))
    .then(() => {
      expect(stores.getActions()).toEqual(emptyAction);
    });
  });
});

describe('Sign in action', () => {
  const user = mockData.userData;
  const token = mockData.token;
  const store = mockStore({});

  it('should contain a sign in function', () => {
    expect(typeof (signUserIn())).toBe('function');
  });

  it('should dispatch SIGN IN on successful sign in', () => {
    mock.onPost('api/v1/user/signin', user)
    .reply(200, {
      token,
      message: 'Successfully signed user in',
      success: true
    });

    const expectedAction = authAction.signinSuccess;

    return store.dispatch(signUserIn(user))
    .then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });

  it('should not dispatch SIGN IN on unsuccessful sign in', () => {
    const stores = mockStore({});
    mock.reset();
    mock.onPost('api/v1/user/signin', user)
    .reply(400, {
      message: 'An error has occured',
      success: false
    });

    const emptyAction = mockData.emptyAction;

    return stores.dispatch(signUserIn(user))
    .then(() => {
      expect(stores.getActions()).toEqual(emptyAction);
    });
  });
});

describe('Sign out aciton', () => {
  const store = mockStore({});

  it('should contain a sign out function', () => {
    expect(typeof (signUserOut())).toBe('function');
  });

  it('should dispatch SIGN OUT on successful sign out', () => {
    mock.onGet('api/v1/user/signout')
    .reply(200, {
      success: true,
      isLoggedIn: false,
      message: 'Successfully logged user out'
    });

    const expectedAction = authAction.signoutSuccess;

    return store.dispatch(signUserOut())
    .then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });

  it('should not dispatch SIGN OUT on unsuccessful sign out', () => {
    mock.reset();
    const stores = mockStore({});
    mock.onGet('api/v1/user/signout')
    .reply(400, {
      success: false,
      message: 'An error has occured'
    });

    const emptyAction = mockData.emptyAction;

    return stores.dispatch(signUserOut())
    .then(() => {
      expect(stores.getActions()).toEqual(emptyAction);
    });
  });
});

describe('Reload user in action', () => {
  const store = mockStore({});

  it('should contain a reload user in function', () => {
    expect(typeof (reloadUserIn())).toBe('function');
  });

  it('should dispatch RELOAD_USER_IN when called', () => {
    const user = mockData.userData;
    const expectedAction = [
      {
        type: types.RELOAD_USER_IN,
        userName: user.userName,
        email: user.email,
        telephone: user.telephone
      }
    ];

    store.dispatch(reloadUserIn(user.userName, user.email, user.telephone));
    expect(store.getActions()).toEqual(expectedAction);
  });
});
