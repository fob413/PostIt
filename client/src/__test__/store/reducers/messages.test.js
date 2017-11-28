import messageReducer from '../../../reducers/messageReducer';
import mockData from '../../__mocks__/mockData';

const { messages } = mockData.reducers;

describe('The Message Reducer', () => {
  it('should handle LOAD_GROUP_MESSAGES', () => {
    const state = messages.loadInitialState;
    const action = messages.loadGroupAction;
    const results = messageReducer(state, action);
    expect(results).toEqual(messages.loadGroupExpected);
  });

  it('should handle CURRENT_GROUP', () => {
    const state = messages.loadInitialState;
    const action = messages.currentGroupAction;
    const results = messageReducer(state, action);
    expect(results).toEqual(messages.currentGroupExpected);
  });

  it('should handle LOAD_PLATFORM_USERS', () => {
    const state = messages.loadInitialState;
    const action = messages.platformUsersAction;
    const results = messageReducer(state, action);
    expect(results).toEqual(messages.platformUsersExpected);
  });

  it('should handle LOAD_GROUP_USERS', () => {
    const state = messages.loadInitialState;
    const action = messages.loadUsersAction;
    const results = messageReducer(state, action);
    expect(results).toEqual(messages.loadUsersExpected);
  });

  it('should handle LOAD_UNREAD_MESSAGES', () => {
    const state = messages.loadInitialState;
    const action = messages.unreadMessagesAction;

    const results = messageReducer(state, action);
    expect(results).toEqual(messages.unreadMessagesExpected);
  });

  it('should handle LOAD_READ_MESSAGES', () => {
    const state = messages.loadInitialState;
    const action = messages.readMessagesAction;

    const results = messageReducer(state, action);
    expect(results).toEqual(messages.readMessagesExpected);
  });

  it('should handle LOAD_COUNT', () => {
    const state = messages.loadInitialState;
    const action = messages.loadCountAction;

    const results = messageReducer(state, action);
    expect(results).toEqual(messages.loadCountExpected);
  });

  it('should handle LOAD_PAGE_COUNT', () => {
    const state = messages.loadInitialState;
    const action = messages.loadPageCountAction;

    const results = messageReducer(state, action);
    expect(results).toEqual(messages.loadPageCountExpected);
  });

  it('should return an initial state by default', () => {
    const state = messages.loadInitialState;
    const action = {};
    const results = messageReducer(state, action);
    expect(results).toEqual(messages.defaultExpected);
  });
});
