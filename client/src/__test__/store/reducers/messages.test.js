import store from '../../../reducers/messageReducer';
import data from '../../__mocks__/mockData';

describe('The Message Reducer', () => {
  it('LOAD_GROUP_MESSAGES', () => {
    const state = data.loadGroupMessagesReducerInitialState;
    const action = data.loadGroupMessagesReducerAction;
    const results = store(state, action);
    expect(results).toEqual(data.loadGroupMessagesReducerExpected);
  });

  it('CURRENT_GROUP', () => {
    const state = data.loadGroupMessagesReducerInitialState;
    const action = data.currentGroupReducerAction;
    const results = store(state, action);
    expect(results).toEqual(data.currentGroupReducerExpected);
  });

  it('LOAD_PLATFORM_USERS', () => {
    const state = data.loadGroupMessagesReducerInitialState;
    const action = data.loadPlatformUsersReducerAction;
    const results = store(state, action);
    expect(results).toEqual(data.loadPlatformUsersReducerExpected);
  });

  it('LOAD_GROUP_USERS', () => {
    const state = data.loadGroupMessagesReducerInitialState;
    const action = data.loadGroupUsersReducerAction;
    const results = store(state, action);
    expect(results).toEqual(data.loadGroupUsersReducerExpected);
  });

  it('LOAD_UNREAD_MESSAGES', () => {
    const state = data.loadGroupMessagesReducerInitialState;
    const action = data.loadUnreadMessagesReducerAction;

    const results = store(state, action);
    expect(results).toEqual(data.loadUnreadMessagesReducerExpected);
  });

  it('LOAD_READ_MESSAGES', () => {
    const state = data.loadGroupMessagesReducerInitialState;
    const action = data.loadReadMessagesReducersAction;

    const results = store(state, action);
    expect(results).toEqual(data.loadReadMessagesReducersExpected);
  });

  it('LOAD_COUNT', () => {
    const state = data.loadGroupMessagesReducerInitialState;
    const action = data.loadCountReducerAction;

    const results = store(state, action);
    expect(results).toEqual(data.loadCountReducerExpected);
  });

  it('LOAD_PAGE_COUNT', () => {
    const state = data.loadGroupMessagesReducerInitialState;
    const action = data.loadPageCountReducerAction;

    const results = store(state, action);
    expect(results).toEqual(data.loadPageCountReducerExpected);
  });

  it('default', () => {
    const state = data.loadGroupMessagesReducerInitialState;
    const action = {};
    const results = store(state, action);
    expect(results).toEqual(data.defaultMessagesReducerExpected);
  });
});
