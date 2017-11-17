import store from '../../../reducers/groupReducer';
import datas from '../../__mocks__/mockData';

describe('The Group Reducer ', () => {
  it('LOAD GROUP', () => {
    const state = {
      Group: []
    };
    const action = datas.loadGroupReducerAction;
    const results = store(state, action);
    expect(results).toEqual(datas.loadGroupReducerExpected);
  });

  it('UNLOAD_GROUPS', () => {
    const state = datas.unloadGroupReducerInitialState;
    const action = datas.unloadGroupsReducerAction;
    const results = store(state, action);
    expect(results).toEqual(datas.unloadGroupsReducerExpected);
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
