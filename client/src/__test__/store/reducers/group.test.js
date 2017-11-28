import groupReducer from '../../../reducers/groupReducer';
import mockData from '../../__mocks__/mockData';

const { group } = mockData.reducers;

describe('The Group Reducer ', () => {
  it('should handle LOAD GROUP', () => {
    const state = {
      Group: []
    };
    const action = group.loadAction;
    const results = groupReducer(state, action);
    expect(results).toEqual(group.loadExpected);
  });

  it('should handle UNLOAD_GROUPS', () => {
    const state = group.unloadInitialState;
    const action = group.unloadAction;
    const results = groupReducer(state, action);
    expect(results).toEqual(group.unloadExpected);
  });

  it('should return initial state by default', () => {
    const state = {
      Groups: []
    };
    const action = {};
    const results = groupReducer(state, action);
    expect(results).toEqual({
      Groups: []
    });
  });
});
