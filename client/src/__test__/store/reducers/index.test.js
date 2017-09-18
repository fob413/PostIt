import {
  SIGN_UP,
  SIGN_IN,
  SIGN_OUT,
  RELOAD_USER_IN
} from '../../../constants';
import store from '../../../reducers/index';

describe('The Index Reducer ', () => {
  it('SIGN_UP', () => {
    const state = {
      UserName: '',
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
        UserName: 'funsho',
        isLoggedin: true,
        token: 'abcdefghijklmnopqrstuvwxyz',
        email: 'fob1493@gmail.com',
        telephone: '08138498175',
        userId: '1'
      }
    };
    const results = store(state, action);
    expect(results).toEqual({
      UserName: 'funsho',
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
        UserName: 'funsho',
        isLoggedin: true,
        token: 'abcdefghijklmnopqrstuvwxyz',
        telephone: '08138498175',
        email: 'fob1493@gmail.com',
        userId: '1'
      }
    };
    const results = store(state, action);
    expect(results).toEqual({
      UserName: 'funsho',
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
      UserName: '',
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
        UserName: 'funsho',
        email: 'fob1493@gmail.com',
        telephone: '08138498175',
        userId: '1',
        isLoggedIn: true
      }
    };
    const results = store(state, action);
    expect(results).toEqual({
      UserName: 'funsho',
      email: 'fob1493@gmail.com',
      telephone: '08138498175',
      userId: '1',
      isLoggedIn: true
    });
  });
});
