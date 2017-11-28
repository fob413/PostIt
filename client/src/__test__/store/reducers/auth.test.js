import authReducer from '../../../reducers/auth';
import mockData from '../../__mocks__/mockData';

const { auth } = mockData.reducers;

describe('The Authentication Reducer ', () => {
  it('should handle SIGN_UP', () => {
    const state = {};
    const action = auth.signupAction;
    const results = authReducer(state, action);
    expect(results).toEqual(auth.signupExpected);
  });

  it('should handle SIGN_IN', () => {
    const state = {};
    const action = auth.signinAction;
    const results = authReducer(state, action);
    expect(results).toEqual(auth.sigininExpected);
  });

  it('should handle SIGN_OUT', () => {
    const state = {};
    const action = auth.signoutAction;
    const results = authReducer(state, action);
    expect(results).toEqual(auth.signoutExpected);
  });

  it('should handle RELOAD_USER_IN', () => {
    const state = {};
    const action = auth.reloadAction;
    const results = authReducer(state, action);
    expect(results).toEqual(auth.reloadExpected);
  });

  it('should return initial state by default', () => {
    const state = {};
    const action = {};

    const results = authReducer(state, action);
    expect(results).toEqual({});
  });
});
