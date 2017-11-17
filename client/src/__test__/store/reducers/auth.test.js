import store from '../../../reducers/auth';
import data from '../../__mocks__/mockData';

describe('The Index Reducer ', () => {
  it('SIGN_UP', () => {
    const state = data.signupReducerInitialState;
    const action = data.signupReducerAction;
    const results = store(state, action);
    expect(results).toEqual(data.signupReducerExpected);
  });

  it('SIGN_IN', () => {
    const state = {};
    const action = data.signinReducerAction;
    const results = store(state, action);
    expect(results).toEqual(data.signinReducerExpected);
  });

  it('SIGN_OUT', () => {
    const state = {};
    const action = data.signoutReducerAction;
    const results = store(state, action);
    expect(results).toEqual(data.signoutReducerExpected);
  });

  it('RELOAD_USER_IN', () => {
    const state = {};
    const action = data.reloadUserInReducerAction;
    const results = store(state, action);
    expect(results).toEqual(data.reloadUserInReducerExpected);
  });

  it('default', () => {
    const state = {};
    const action = {};

    const results = store(state, action);
    expect(results).toEqual({});
  });
});
