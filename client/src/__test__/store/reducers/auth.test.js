import {
  SIGN_UP,
  SIGN_IN,
  SIGN_OUT,
  RELOAD_USER_IN
} from '../../../helpers/constants';
import store from '../../../reducers/auth';

describe('The Index Reducer ', () => {
  it('SIGN_UP', () => {
    const state = {
      userName: '',
      email: '',
      telephone: '',
      userId: '',
      isLoggedIn: false,
      token: '',
      groups: []
    };
    const action = {
      type: SIGN_UP,
      data: {
        userName: 'funsho',
        isLoggedin: true,
        token: 'abcdefghijklmnopqrstuvwxyz',
        email: 'fob1493@gmail.com',
        telephone: '08138498175',
        userId: '1'
      }
    };
    const results = store(state, action);
    expect(results).toEqual({
      userName: 'funsho',
      isLoggedIn: true,
      token: 'abcdefghijklmnopqrstuvwxyz',
      email: 'fob1493@gmail.com',
      telephone: '08138498175',
      userId: '1',
      groups: []
    });
  });

  it('SIGN_IN', () => {
    const state = {};
    const action = {
      type: SIGN_IN,
      data: {
        userName: 'funsho',
        isLoggedin: true,
        token: 'abcdefghijklmnopqrstuvwxyz',
        telephone: '08138498175',
        email: 'fob1493@gmail.com',
        userId: '1'
      }
    };
    const results = store(state, action);
    expect(results).toEqual({
      userName: 'funsho',
      isLoggedIn: true,
      token: 'abcdefghijklmnopqrstuvwxyz',
      telephone: '08138498175',
      email: 'fob1493@gmail.com',
      userId: '1'
    });
  });

  it('SIGN_OUT', () => {
    const state = {};
    const action = {
      type: SIGN_OUT,
      data: {
        isLoggedIn: false
      }
    };
    const results = store(state, action);
    expect(results).toEqual({
      userName: '',
      isLoggedIn: false,
      token: '',
      email: '',
      telephone: '',
      groups: [],
      userId: ''
    });
  });

  it('RELOAD_USER_IN', () => {
    const state = {};
    const action = {
      type: RELOAD_USER_IN,
      data: {
        userName: 'funsho',
        email: 'fob1493@gmail.com',
        telephone: '08138498175',
        userId: '1',
        isLoggedIn: true
      }
    };
    const results = store(state, action);
    expect(results).toEqual({
      userName: 'funsho',
      email: 'fob1493@gmail.com',
      telephone: '08138498175',
      userId: '1',
      isLoggedIn: true
    });
  });

  it('default', () => {
    const state = {};
    const action = {};

    const results = store(state, action);
    expect(results).toEqual({});
  });
});
