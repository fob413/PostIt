import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import mockLocalStorage from '../../__mocks__/mockLocalStorage';
import * as types from '../../../helpers/constants';
import mockData from '../../__mocks__/mockData';
import {
  loadCurrentGroup,
  sendMessage,
  loadGroupMessages,
  loadPlatformUsers,
  searchUsers,
  loadGroupUsers,
  addUserToGroup,
  readMessages
} from '../../../actions/messageActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mock = new MockAdapter(axios);
window.localStorage = mockLocalStorage;

describe('LOAD CURRENT GROUP action', () => {
  it('should contain a loadCurrentGroup function ', () => {
    expect(typeof (loadCurrentGroup())).toBe('function');
  });

  it('should dispatch LOAD CURRENT GROUP when called', () => {
    const store = mockStore({});
    const groupId = mockData.groupId;

    const expectedAction = mockData.loadCurrentGroupActions;

    store.dispatch(loadCurrentGroup(groupId));
    expect(store.getActions()).toEqual(expectedAction);
  });
});

describe('Send Message function', () => {
  it('should contain a sendMessage function ', () => {
    expect(typeof (sendMessage())).toBe('function');
  });

  it('should contain an empty action if successful', () => {
    const store = mockStore({});
    const groupId = mockData.groupId;
    const message = mockData.message;
    const priority = mockData.priority;
    mock.onPost(`/api/v1/group/${groupId}/message`)
    .reply(201, {
      success: true,
      message: 'message sent'
    });

    const emptyAction = mockData.emptyAction;

    return store.dispatch(sendMessage(message, groupId, priority))
    .then(() => {
      expect(store.getActions()).toEqual(emptyAction);
    });
  });

  it('should contain an empty action if unsuccessful', () => {
    mock.reset();
    const store = mockStore({});
    const groupId = mockData.groupId;
    const message = mockData.message;
    const priority = mockData.priority;
    mock.onPost(`api/v1/group/${groupId}/message`)
    .reply(400, {
      success: false,
      message: 'An error has occured'
    });

    const expectedAction = mockData.emptyAction;

    return store.dispatch(sendMessage(message, groupId, priority))
    .then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });
});

describe('LOAD GROUP MESSAGES action', () => {
  it('should contain a loadGroupMessages function ', () => {
    expect(typeof (loadGroupMessages())).toBe('function');
  });

  it('should dispatch LOAD GROUP MESSAGES on successful', () => {
    const store = mockStore({});
    const groupId = mockData.groupId;
    const dataArray = mockData.messageArrayData;
    const userId = mockData.id;

    mock.onGet(`api/v1/group/${groupId}/messages`)
    .reply(200, dataArray);

    const expectedAction = [
      {
        type: types.LOAD_GROUP_MESSAGES,
        payLoad: dataArray
      },
      {
        type: types.LOAD_UNREAD_MESSAGES,
        payLoad: []
      },
      {
        type: types.LOAD_READ_MESSAGES,
        payLoad: dataArray
      }
    ];

    return store.dispatch(loadGroupMessages(groupId, userId))
    .then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });

  it('should not dispatch when unsuccessful', () => {
    mock.reset();
    const store = mockStore({});
    const groupId = mockData.groupId;
    const userId = mockData.id;

    mock.onGet(`api/v1/group/${groupId}/messages`)
    .reply(400, {
      success: false,
      message: 'An error has occured'
    });

    const emptyAction = mockData.emptyAction;

    return store.dispatch(loadGroupMessages(groupId, userId))
    .then(() => {
      expect(store.getActions()).toEqual(emptyAction);
    });
  });
});

describe('LOAD PLATFORM USERS action', () => {
  it('should contain a loadPlaatformUsers function ', () => {
    expect(typeof (loadPlatformUsers())).toBe('function');
  });

  it('should dispatch LOAD PLATFORM USERS when successful', () => {
    const store = mockStore({});
    const usersArray = mockData.platformUsers;

    mock.onGet('api/v1/users/list')
    .reply(200, usersArray);

    const expectedAction = [
      {
        type: types.LOAD_PLATFORM_USERS,
        payLoad: usersArray
      }
    ];

    return store.dispatch(loadPlatformUsers())
    .then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });

  it('should not dispatch LOAD PLATFORM USERS when unsuccessful', () => {
    mock.reset();
    const store = mockStore({});

    mock.onGet('api/v1/users/list')
    .reply(400, {
      success: false,
      message: 'An error has occured'
    });

    const emptyAction = mockData.emptyAction;

    return store.dispatch(loadPlatformUsers())
    .then(() => {
      expect(store.getActions()).toEqual(emptyAction);
    });
  });
});

describe('SEARCH USERS action', () => {
  it('should contain a search user function ', () => {
    expect(typeof (searchUsers())).toBe('function');
  });

  it('should dispatch LOAD PLATFORM USERS when successful', () => {
    const store = mockStore({});
    const searchUserResult = mockData.searchUserResult;
    const offset = mockData.offfset;
    const searchUserData = mockData.searchUser;
    const userName = mockData.userName;

    mock.onPost(`api/v1/users/list/${offset}`, searchUserData)
    .reply(200, searchUserResult);

    const expectedAction = [
      {
        type: types.LOAD_PLATFORM_USERS,
        payLoad: mockData.searchUserResult.users.rows
      },
      {
        type: types.LOAD_COUNT,
        payLoad: mockData.searchUserResult.paginateData.count
      },
      {
        type: types.LOAD_PAGE_COUNT,
        payLoad: mockData.searchUserResult.paginateData.pageCount
      }
    ];

    return store.dispatch(searchUsers(offset, userName))
    .then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });

  it('should not dispatch LOAD PLATFORM USERS when unsuccessful', () => {
    mock.reset();
    const store = mockStore({});
    const offset = mockData.offfset;
    const searchUserData = mockData.searchUser;
    const userName = mockData.userName;

    mock.onPost(`api/v1/users/list/${offset}`, searchUserData)
    .reply(400, {
      success: false,
      message: 'An error has occured'
    });

    const emptyAction = mockData.emptyAction;

    return store.dispatch(searchUsers(offset, userName))
    .then(() => {
      expect(store.getActions()).toEqual(emptyAction);
    });
  });
});

describe('LOAD GROUP USERS action', () => {
  it('should contain a loadGroupUsers function ', () => {
    expect(typeof (loadGroupUsers())).toBe('function');
  });

  it('should dispatch LOAD GROUP USERS when successful', () => {
    const store = mockStore({});
    const groupId = mockData.groupId;
    const usersArray = mockData.platformUsers;

    mock.onGet(`api/v1/group/${groupId}/user/list`)
    .reply(200, usersArray);

    const expectedAction = [
      {
        type: types.LOAD_GROUP_USERS,
        payLoad: usersArray
      }
    ];

    return store.dispatch(loadGroupUsers(groupId))
    .then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });

  it('should not dispatch a LOAD GROUP USERS when unsuccessful', () => {
    mock.reset();
    const store = mockStore({});
    const groupId = mockData.groupId;

    mock.onGet(`api/v1/group/${groupId}/user/list`)
    .reply(400, {
      success: false,
      message: 'An error has occured'
    });

    const emptyAction = mockData.emptyAction;

    return store.dispatch(loadGroupUsers(groupId))
    .then(() => {
      expect(store.getActions()).toEqual(emptyAction);
    });
  });
});

describe('ADD USER TO GROUP action', () => {
  it('should contain a addUserToGroup function ', () => {
    expect(typeof (addUserToGroup())).toBe('function');
  });

  it('should not dispatch when successful', (done) => {
    const store = mockStore({});
    const userId = mockData.id;
    const groupId = mockData.groupId;
    const response = {
      success: true,
      message: 'Successfully added to group'
    };

    mock.onPost(`/api/v1/group/${groupId}/user`)
    .reply(201, response);

    const emptyAction = mockData.emptyAction;

    return store.dispatch(addUserToGroup(userId, groupId))
    .then(() => {
      expect(store.getActions()).toEqual(emptyAction);
      done();
    });
  });

  it('should not dispatch when unsuccessful', () => {
    mock.reset();
    const store = mockStore({});
    const userId = mockData.id;
    const groupId = mockData.groupId;

    mock.onPost(`api/v1/group/${groupId}/user`)
    .reply(400, {
      success: false,
      message: 'An error has occured'
    });

    const emptyAction = mockData.emptyAction;

    return store.dispatch(addUserToGroup(userId, groupId))
    .then(() => {
      expect(store.getActions()).toEqual(emptyAction);
    });
  });
});

describe('Read Messages action', () => {
  it('should contain a readMessages function ', () => {
    expect(typeof (readMessages())).toBe('function');
  });

  it('should not dispatch when successful', () => {
    const store = mockStore({});
    const groupId = mockData.groupId;
    const response = {
      success: true,
      message: 'User has read all messages'
    };

    mock.onPost(`api/v1/group/${groupId}/messages/read`)
    .reply(201, response);

    const emptyAction = mockData.emptyAction;

    return store.dispatch(readMessages(groupId))
    .then(() => {
      expect(store.getActions()).toEqual(emptyAction);
    });
  });

  it('should not dispatch when unsuccessful', () => {
    mock.reset();
    const store = mockStore({});
    const groupId = mockData.groupId;
    const response = {
      success: false,
      message: 'An error has occured'
    };

    mock.onPost(`api/v1/group/${groupId}/messages/read`)
    .reply(400, response);

    const emptyAction = mockData.emptyAction;

    return store.dispatch(readMessages(groupId))
    .then(() => {
      expect(store.getActions()).toEqual(emptyAction);
    });
  });
});
