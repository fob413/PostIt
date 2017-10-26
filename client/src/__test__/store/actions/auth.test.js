import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import mockLocalStorage from '../../_mocks_/mockLocalStorage';
import {
  signUserUp,
  signUserIn,
  signUserOut,
  reloadUserIn
} from '../../../actions/authActions';
import {
  SIGN_UP,
  SIGN_IN,
  SIGN_OUT,
  RELOAD_USER_IN
} from '../../../constants';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
window.localStorage = mockLocalStorage;

const initialState = {
  userName: '',
  email: '',
  telephone: '',
  userId: '',
  isLoggedIn: false,
  token: '',
  groups: []
};

describe('Sign up action ', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());
  const store = mockStore(initialState);
  const userData = {
    userName: 'Funsho',
    password: 'asdf;lkj',
    email: 'funsho@email.com',
    telephone: '12345678901'
  };

  it('should contain a sign up function', () => {
    expect(typeof (signUserUp())).toBe('function');
  });

  it('should dispatch SIGN_UP on successful sign up', (done) => {
    moxios.stubRequest('/api/user/signup', {
      status: 201,
      response: {
        success: true,
        message: 'Successfully signed up',
        token: 'abcdefghijklmnopqrstuvwxyz'
      }
    });
    const expectedActions = [
      {
        type: SIGN_UP,
        data: {
          success: true,
          message: 'Successfully signed up',
          token: 'abcdefghijklmnopqrstuvwxyz'
        }
      }
    ];
    store.dispatch(signUserUp(userData)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });
});

describe('Sign in action ', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());
  const store = mockStore(initialState);
  const userData = {
    userName: 'Funsho',
    password: 'asdf;lkj'
  };

  it('should contain a sign in function', () => {
    expect(typeof (signUserIn())).toBe('function');
  });

  it('should dispatch SIGN_IN on successful sign in', (done) => {
    moxios.stubRequest('/api/user/signin', {
      status: 200,
      response: {
        success: true,
        message: 'Successfully signed in',
        token: 'abcdefghijklmnopqrstuvwxyz'
      }
    });
    const expectedActions = [
      {
        type: SIGN_IN,
        data: {
          success: true,
          message: 'Successfully signed in',
          token: 'abcdefghijklmnopqrstuvwxyz'
        }
      }
    ];
    store.dispatch(signUserIn(userData)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });
});

describe('Sign out action ', () => {
  const token = 'abcdefghiijklmnopqrstuvqxyz';
  beforeEach(() => {
    moxios.install();
    mockLocalStorage.setItem('token', token);
  });
  afterEach(() => {
    moxios.uninstall();
    mockLocalStorage.removeItem('token');
  });
  const store = mockStore(initialState);

  it('should contain a sign out function', () => {
    expect(typeof (signUserOut())).toBe('function');
  });

  it('should dispatch SIGN_OUT on successful sign out', (done) => {
    const expectedActions = [
      {
        type: SIGN_OUT,
        data: {
          success: true,
          message: 'Successfully signed out',
          isLoggedIn: false
        }
      }
    ];
    store.dispatch(signUserOut()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });
});

describe('Reload user in action ', () => {
  const token = 'abcdefghiijklmnopqrstuvqxyz';
  beforeEach(() => {
    moxios.install();
    mockLocalStorage.setItem('token', token);
  });
  afterEach(() => {
    moxios.uninstall();
    mockLocalStorage.removeItem('token');
  });
  const store = mockStore(initialState);

  it('should contain a reloadUserIn function', () => {
    expect(typeof (reloadUserIn())).toBe('function');
  });

  it('should dispatch RELOAD_USER_IN on successful reload', (done) => {
    const expectedActions = [
      {
        type: RELOAD_USER_IN,
        userName: 'funsho',
        email: 'funsho@email.com',
        telephone: '12345678901',
        userId: undefined
      }
    ];
    store.dispatch(reloadUserIn('funsho', 'funsho@email.com', '12345678901'));
    expect(store.getActions()).toEqual(expectedActions);
    done();
  });
});
