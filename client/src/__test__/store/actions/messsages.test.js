import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import mockLocalStorage from '../../_mocks_/mockLocalStorage';
import * as types from '../../../helpers/constants';
import datas from '../../_mocks_/mockData';
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

  it('should dispatch loadGroupId when called', () => {
    const store = mockStore({});
    const groupId = datas.groupId;

    const expectedAction = [
      {
        type: types.CURRENT_GROUP,
        data: groupId
      }
    ];

    store.dispatch(loadCurrentGroup(groupId));
    expect(store.getActions()).toEqual(expectedAction);
  });
});

describe('Send Message function', () => {
  it('should contain a sendMessage function ', () => {
    expect(typeof (sendMessage())).toBe('function');
  });

  it('should have a success of true when successful', () => {
    const store = mockStore({});
    const groupId = datas.groupId;
    const message = datas.message;
    const priority = datas.priority;
    mock.onPost(`api/group/${groupId}/message`)
    .reply(201, {
      success: true,
      message: 'message sent'
    });

    const expectedAction = datas.emptyAction;

    return store.dispatch(sendMessage(message, groupId, priority))
    .then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });

  it('should have a success of false when unsuccessful', () => {
    mock.reset();
    const store = mockStore({});
    const groupId = datas.groupId;
    const message = datas.message;
    const priority = datas.priority;
    mock.onPost(`api/group/${groupId}/message`)
    .reply(400, {
      success: true,
      message: 'An error has occured'
    });

    const expectedAction = datas.emptyAction;

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
    const groupId = datas.groupId;
    const dataArray = datas.messageArrayData;
    const userId = datas.id;

    mock.onGet(`api/group/${groupId}/messages`)
    .reply(200, dataArray);

    const expectedAction = [
      {
        type: types.LOAD_GROUP_MESSAGES,
        data: dataArray
      },
      {
        type: types.LOAD_UNREAD_MESSAGES,
        data: []
      },
      {
        type: types.LOAD_READ_MESSAGES,
        data: dataArray
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
    const groupId = datas.groupId;
    const userId = datas.id;

    mock.onGet(`api/group/${groupId}/messages`)
    .reply(400, {
      success: false,
      message: 'An error has occured'
    });

    const expectedAction = datas.emptyAction;

    return store.dispatch(loadGroupMessages(groupId, userId))
    .then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });
});

describe('LOAD PLATFORM USERS action', () => {
  it('should contain a loadPlaatformUsers function ', () => {
    expect(typeof (loadPlatformUsers())).toBe('function');
  });

  it('should dispatch loadPlatformUsers when successful', () => {
    const store = mockStore({});
    const usersArray = datas.platformUsers;

    mock.onGet('api/users/list')
    .reply(200, usersArray);

    const expectedAction = [
      {
        type: types.LOAD_PLATFORM_USERS,
        data: usersArray
      }
    ];

    return store.dispatch(loadPlatformUsers())
    .then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });

  it('should not dispatch loadPlatformUsers when unsuccessful', () => {
    mock.reset();
    const store = mockStore({});

    mock.onGet('api/users/list')
    .reply(400, {
      success: false,
      message: 'An error has occured'
    });

    const expectedAction = datas.emptyAction;

    return store.dispatch(loadPlatformUsers())
    .then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });
});

describe('SEARCH USERS action', () => {
  it('should contain a search user function ', () => {
    expect(typeof (searchUsers())).toBe('function');
  });

  it('should dispatch loadPlatformUsers when successful', () => {
    const store = mockStore({});
    const searchUserResult = datas.searchUserResult;
    const offset = datas.offfset;
    const searchUserData = datas.searchUser;
    const userName = datas.userName;

    mock.onPost(`api/users/list/${offset}`, searchUserData)
    .reply(200, searchUserResult);

    const expectedAction = [
      {
        type: types.LOAD_PLATFORM_USERS,
        data: datas.searchUserResult.users.rows
      },
      {
        type: types.LOAD_COUNT,
        data: datas.searchUserResult.data.count
      },
      {
        type: types.LOAD_PAGE_COUNT,
        data: datas.searchUserResult.data.pageCount
      }
    ];

    return store.dispatch(searchUsers(offset, userName))
    .then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });

  it('should not dispatch loadPlatformUsers when unsuccessful', () => {
    mock.reset();
    const store = mockStore({});
    const offset = datas.offfset;
    const searchUserData = datas.searchUser;
    const userName = datas.userName;

    mock.onPost(`api/users/list/${offset}`, searchUserData)
    .reply(400, {
      success: false,
      message: 'An error has occured'
    });

    const expectedAction = datas.emptyAction;

    return store.dispatch(searchUsers(offset, userName))
    .then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });
});

describe('LOAD GROUP USERS action', () => {
  it('should contain a loadGroupUsers function ', () => {
    expect(typeof (loadGroupUsers())).toBe('function');
  });

  it('should dispatch a loadGroupUsersSuccess when successful', () => {
    const store = mockStore({});
    const groupId = datas.groupId;
    const usersArray = datas.platformUsers;

    mock.onGet(`api/group/${groupId}/user/list`)
    .reply(200, usersArray);

    const expectedAction = [
      {
        type: types.LOAD_GROUP_USERS,
        data: usersArray
      }
    ];

    return store.dispatch(loadGroupUsers(groupId))
    .then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });

  it('should not dispatch a loadGroupUsersSuccess when unsuccessful', () => {
    mock.reset();
    const store = mockStore({});
    const groupId = datas.groupId;

    mock.onGet(`api/group/${groupId}/user/list`)
    .reply(400, {
      success: false,
      message: 'An error has occured'
    });

    const expectedAction = datas.emptyAction;

    return store.dispatch(loadGroupUsers(groupId))
    .then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });
});

describe('ADD USER TO GROUP action', () => {
  it('should contain a addUserToGroup function ', () => {
    expect(typeof (addUserToGroup())).toBe('function');
  });

  it('should have a success of true when successful', () => {
    const store = mockStore({});
    const userId = datas.id;
    const groupId = datas.groupId;
    const data = {
      success: true,
      message: 'Successfully added to group'
    };

    mock.onPost(`api/group/${groupId}/user`)
    .reply(201, data);

    const expectedAction = datas.emptyAction;

    return store.dispatch(addUserToGroup(userId, groupId))
    .then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });

  it('should have a success of false when successful', () => {
    mock.reset();
    const store = mockStore({});
    const userId = datas.id;
    const groupId = datas.groupId;

    mock.onPost(`api/group/${groupId}/user`)
    .reply(400, {
      success: false,
      message: 'An error has occured'
    });

    const expectedAction = datas.emptyAction;

    return store.dispatch(addUserToGroup(userId, groupId))
    .then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });
});

describe('Read Messages action', () => {
  it('should contain a readMessages function ', () => {
    expect(typeof (readMessages())).toBe('function');
  });

  it('should have a success of true when successful', () => {
    const store = mockStore({});
    const groupId = datas.groupId;
    const data = {
      success: true,
      message: 'User has read all messages'
    };

    mock.onPost(`api/group/${groupId}/messages/read`)
    .reply(201, data);

    const expectedAction = datas.emptyAction;

    return store.dispatch(readMessages(groupId))
    .then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });

  it('should have a success of false when unsuccessful', () => {
    mock.reset();
    const store = mockStore({});
    const groupId = datas.groupId;
    const data = {
      success: false,
      message: 'An error has occured'
    };

    mock.onPost(`api/group/${groupId}/messages/read`)
    .reply(400, data);

    const expectedAction = datas.emptyAction;

    return store.dispatch(readMessages(groupId))
    .then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });
});
