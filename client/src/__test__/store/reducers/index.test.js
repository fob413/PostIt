import { SIGN_UP, SIGN_IN } from '../../../constants';
import store from '../../../reducers/index';

describe('The Index test', () => {
  it('SIGN_UP success', () => {
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
        isLoggedIn: true,
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
      userId: '1'
    });
  });

  it('SIGN_IN success', () => {
    const state = {};
    const action = {
      type: SIGN_IN,
      data: {
        UserName: 'funsho',
        isLoggedIn: true,
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
});
