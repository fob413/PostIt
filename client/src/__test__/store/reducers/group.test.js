import {
  LOAD_GROUPS,
  UNLOAD_GROUPS
} from '../../../helpers/constants';
import store from '../../../reducers/groupReducer';

describe('The Group Reducer ', () => {
  it('LOAD GROUP', () => {
    const state = {
      Group: []
    };
    const action = {
      type: LOAD_GROUPS,
      data: [
        {
          id: 1,
          userId: 1,
          groupId: 1,
          createdAt: '2017-09-16T11:28:13.182Z',
          updatedAt: '2017-09-16T11:28:13.182Z'
        },
        {
          id: 2,
          userId: 2,
          groupId: 2,
          createdAt: '2017-09-16T11:28:13.182Z',
          updatedAt: '2017-09-16T11:28:13.182Z'
        }
      ]
    };
    const results = store(state, action);
    expect(results).toEqual(
      [
        {
          id: 1,
          userId: 1,
          groupId: 1,
          createdAt: '2017-09-16T11:28:13.182Z',
          updatedAt: '2017-09-16T11:28:13.182Z'
        },
        {
          id: 2,
          userId: 2,
          groupId: 2,
          createdAt: '2017-09-16T11:28:13.182Z',
          updatedAt: '2017-09-16T11:28:13.182Z'
        }
      ]
    );
  });

  it('UNLOAD_GROUPS', () => {
    const state = {
      Groups: [
        {
          id: 1,
          userId: 1,
          groupId: 1,
          createdAt: '2017-09-16T11:28:13.182Z',
          updatedAt: '2017-09-16T11:28:13.182Z'
        },
        {
          id: 2,
          userId: 2,
          groupId: 2,
          createdAt: '2017-09-16T11:28:13.182Z',
          updatedAt: '2017-09-16T11:28:13.182Z'
        }
      ]
    };
    const action = {
      type: UNLOAD_GROUPS
    };
    const results = store(state, action);
    expect(results).toEqual({
      Groups: []
    });
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
