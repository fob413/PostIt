import store from '../../../reducers/messageReducer';
import mockData from '../../__mocks__/mockData';

describe('The Message Reducer', () => {
  it('LOAD_GROUP_MESSAGES', () => {
    const state = mockData.loadGroupMessagesReducerInitialState;
    const action = mockData.loadGroupMessagesReducerAction;
    const results = store(state, action);
    expect(results).toEqual(mockData.loadGroupMessagesReducerExpected);
  });

  it('CURRENT_GROUP', () => {
    const state = mockData.loadGroupMessagesReducerInitialState;
    const action = mockData.currentGroupReducerAction;
    const results = store(state, action);
    expect(results).toEqual(mockData.currentGroupReducerExpected);
  });

  it('LOAD_PLATFORM_USERS', () => {
    const state = mockData.loadGroupMessagesReducerInitialState;
    const action = mockData.loadPlatformUsersReducerAction;
    const results = store(state, action);
    expect(results).toEqual(mockData.loadPlatformUsersReducerExpected);
  });

  it('LOAD_GROUP_USERS', () => {
    const state = mockData.loadGroupMessagesReducerInitialState;
    const action = mockData.loadGroupUsersReducerAction;
    const results = store(state, action);
    expect(results).toEqual(mockData.loadGroupUsersReducerExpected);
  });

  it('LOAD_UNREAD_MESSAGES', () => {
    const state = mockData.loadGroupMessagesReducerInitialState;
    const action = mockData.loadUnreadMessagesReducerAction;

    const results = store(state, action);
    expect(results).toEqual(mockData.loadUnreadMessagesReducerExpected);
  });

  it('LOAD_READ_MESSAGES', () => {
    const state = mockData.loadGroupMessagesReducerInitialState;
    const action = mockData.loadReadMessagesReducersAction;

    const results = store(state, action);
    expect(results).toEqual(mockData.loadReadMessagesReducersExpected);
  });

  it('LOAD_COUNT', () => {
    const state = mockData.loadGroupMessagesReducerInitialState;
    const action = mockData.loadCountReducerAction;

    const results = store(state, action);
    expect(results).toEqual(mockData.loadCountReducerExpected);
  });

  it('LOAD_PAGE_COUNT', () => {
    const state = mockData.loadGroupMessagesReducerInitialState;
    const action = mockData.loadPageCountReducerAction;

    const results = store(state, action);
    expect(results).toEqual(mockData.loadPageCountReducerExpected);
  });

  it('default', () => {
    const state = mockData.loadGroupMessagesReducerInitialState;
    const action = {};
    const results = store(state, action);
    expect(results).toEqual(mockData.defaultMessagesReducerExpected);
  });
});
