import store from '../../../reducers/groupReducer';
import mockData from '../../__mocks__/mockData';

describe('The Group Reducer ', () => {
  it('LOAD GROUP', () => {
    const state = {
      Group: []
    };
    const action = mockData.loadGroupReducerAction;
    const results = store(state, action);
    expect(results).toEqual(mockData.loadGroupReducerExpected);
  });

  it('UNLOAD_GROUPS', () => {
    const state = mockData.unloadGroupReducerInitialState;
    const action = mockData.unloadGroupsReducerAction;
    const results = store(state, action);
    expect(results).toEqual(mockData.unloadGroupsReducerExpected);
  });

  it('default', () => {
    const state = {
      Groups: []
    };
    const action = {};
    const results = store(state, action);
    expect(results).toEqual({
      Groups: []
    });
  });
});
