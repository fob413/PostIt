import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import mockLocalStorage from '../../_mocks_/mockLocalStorage';
import * as types from '../../../helpers/constants';
import data from '../../_mocks_/mockData';
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

describe('Sign up action', () => {
  beforeEach(() => {
    mock.reset();
  });
  const user = data.userData;
  const token = data.token;
  const store = mockStore({});

  it('should contain a sign up function', () => {
    expect(typeof (signUserUp())).toBe('function');
  });

  it('should dispatch SIGN UP on successful sign up', () => {
    mock.onPost('api/user/signup', user)
    .reply(201, {
      token,
      message: 'Successfully signed user up',
      success: true
    });

    const expectedAction = [
      {
        type: types.SIGN_UP,
        data: {
          success: true,
          message: 'Successfully signed user up',
          token
        }
      }
    ];

    return store.dispatch(signUserUp(user))
    .then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });

  it('should not dispatch SIGN UP when unsuccessful', () => {
    mock.reset();
    const stores = mockStore({});
    mock.onPost('api/user/signup')
    .reply(400, {
      message: 'An error occured',
      success: false
    });

    const expectedAction = data.emptyAction;

    return stores.dispatch(signUserUp(user))
    .then(() => {
      expect(stores.getActions()).toEqual(expectedAction);
    });
  });
});

describe('Sign in action', () => {
  const user = data.userData;
  const token = data.token;
  const store = mockStore({});

  it('should contain a sign in function', () => {
    expect(typeof (signUserIn())).toBe('function');
  });

  it('should dispatch SIGN IN on successful sign in', () => {
    mock.onPost('api/user/signin', user)
    .reply(200, {
      token,
      message: 'Successfully signed user in',
      success: true
    });

    const expectedAction = [
      {
        type: types.SIGN_IN,
        data: {
          success: true,
          message: 'Successfully signed user in',
          token
        }
      }
    ];

    return store.dispatch(signUserIn(user))
    .then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });

  it('should not dispatch SIGN IN on unsuccessful sign in', () => {
    const stores = mockStore({});
    mock.reset();
    mock.onPost('api/user/signin', user)
    .reply(400, {
      message: 'An error has occured',
      success: false
    });

    const expectedAction = data.emptyAction;

    return stores.dispatch(signUserIn(user))
    .then(() => {
      expect(stores.getActions()).toEqual(expectedAction);
    });
  });
});

describe('Sign out aciton', () => {
  const store = mockStore({});

  it('should contain a sign out function', () => {
    expect(typeof (signUserOut())).toBe('function');
  });

  it('should dispatch SIGN OUT on successful sign out', () => {
    mock.onGet('api/user/signout')
    .reply(200, {
      success: true,
      isLoggedIn: false,
      message: 'Successfully logged user out'
    });

    const expectedAction = [
      {
        type: types.SIGN_OUT,
        data: {
          success: true,
          isLoggedIn: false,
          message: 'Successfully logged user out'
        }
      }
    ];

    return store.dispatch(signUserOut())
    .then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });

  it('should not dispatch SIGN OUT on unsuccessful sign out', () => {
    mock.reset();
    const stores = mockStore({});
    mock.onGet('api/user/signout')
    .reply(400, {
      success: false,
      message: 'An error has occured'
    });

    const expectedAction = data.emptyAction;

    return stores.dispatch(signUserOut())
    .then(() => {
      expect(stores.getActions()).toEqual(expectedAction);
    });
  });
});

describe('Reload user in action', () => {
  const store = mockStore({});

  it('should contain a reload user in function', () => {
    expect(typeof (reloadUserIn())).toBe('function');
  });

  it('should dispatch RELOAD_USER_IN when called', () => {
    const user = data.userData;
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
