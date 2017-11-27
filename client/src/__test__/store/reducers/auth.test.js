import store from '../../../reducers/auth';
import mockData from '../../__mocks__/mockData';

describe('The Index Reducer ', () => {
  it('SIGN_UP', () => {
    const state = mockData.signupReducerInitialState;
    const action = mockData.signupReducerAction;
    const results = store(state, action);
    expect(results).toEqual(mockData.signupReducerExpected);
  });

  it('SIGN_IN', () => {
    const state = {};
    const action = mockData.signinReducerAction;
    const results = store(state, action);
    expect(results).toEqual(mockData.signinReducerExpected);
  });

  it('SIGN_OUT', () => {
    const state = {};
    const action = mockData.signoutReducerAction;
    const results = store(state, action);
    expect(results).toEqual(mockData.signoutReducerExpected);
  });

  it('RELOAD_USER_IN', () => {
    const state = {};
    const action = mockData.reloadUserInReducerAction;
    const results = store(state, action);
    expect(results).toEqual(mockData.reloadUserInReducerExpected);
  });

  it('default', () => {
    const state = {};
    const action = {};

    const results = store(state, action);
    expect(results).toEqual({});
  });
});
