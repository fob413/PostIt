import store from '../../../reducers/messageReducer';
import {
  LOAD_GROUP_MESSAGES,
  CURRENT_GROUP,
  LOAD_PLATFORM_USERS,
  LOAD_GROUP_USERS,
  LOAD_UNREAD_MESSAGES,
  LOAD_READ_MESSAGES,
  LOAD_COUNT,
  LOAD_PAGE_COUNT
} from '../../../constants';

describe('The Message Reducer', () => {
  it('LOAD_GROUP_MESSAGES', () => {
    const state = {
      groupId: '',
      messages: [],
      unreadMessages: [],
      readMessages: [],
      groupUsers: [],
      PlatformUsers: [],
      count: 0,
      pageCount: 0
    };
    const action = {
      type: LOAD_GROUP_MESSAGES,
      data: [
        {
          id: 2,
          content: 'second message sent to this group',
          authorsName: 'tititawa',
          priorityValue: 'NORMAL',
          readby: '3,1',
          createdAt: '2017-09-16T11:27:46.739Z',
          updatedAt: '2017-09-16T11:29:16.282Z',
          groupId: 1,
          userId: 3
        },
        {
          id: 3,
          content: 'Third message sent to this group',
          authorsName: 'funsho',
          priorityValue: 'URGENT',
          readby: '3,1',
          createdAt: '2017-09-16T11:27:46.739Z',
          updatedAt: '2017-09-16T11:29:16.282Z',
          groupId: 1,
          userId: 1
        }
      ]
    };
    const results = store(state, action);
    expect(results).toEqual({
      groupId: '',
      messages: [
        {
          id: 2,
          content: 'second message sent to this group',
          authorsName: 'tititawa',
          priorityValue: 'NORMAL',
          readby: '3,1',
          createdAt: '2017-09-16T11:27:46.739Z',
          updatedAt: '2017-09-16T11:29:16.282Z',
          groupId: 1,
          userId: 3
        },
        {
          id: 3,
          content: 'Third message sent to this group',
          authorsName: 'funsho',
          priorityValue: 'URGENT',
          readby: '3,1',
          createdAt: '2017-09-16T11:27:46.739Z',
          updatedAt: '2017-09-16T11:29:16.282Z',
          groupId: 1,
          userId: 1
        }
      ],
      unreadMessages: [],
      readMessages: [],
      groupUsers: [],
      PlatformUsers: [],
      count: 0,
      pageCount: 0
    });
  });

  it('CURRENT_GROUP', () => {
    const state = {
      groupId: '',
      messages: [],
      unreadMessages: [],
      readMessages: [],
      groupUsers: [],
      PlatformUsers: [],
      count: 0,
      pageCount: 0
    };
    const action = {
      type: CURRENT_GROUP,
      data: 5
    };
    const results = store(state, action);
    expect(results).toEqual({
      groupId: 5,
      messages: [],
      unreadMessages: [],
      readMessages: [],
      groupUsers: [],
      PlatformUsers: [],
      count: 0,
      pageCount: 0
    });
  });

  it('LOAD_PLATFORM_USERS', () => {
    const state = {
      groupId: '',
      messages: [],
      unreadMessages: [],
      readMessages: [],
      groupUsers: [],
      PlatformUsers: [],
      count: 0,
      pageCount: 0
    };
    const action = {
      type: LOAD_PLATFORM_USERS,
      data: [
        {
          id: 14,
          UserName: 'user3'
        },
        {
          id: 15,
          UserName: 'user4'
        }
      ]
    };
    const results = store(state, action);
    expect(results).toEqual({
      groupId: '',
      messages: [],
      unreadMessages: [],
      readMessages: [],
      groupUsers: [],
      PlatformUsers: [
        {
          id: 14,
          UserName: 'user3'
        },
        {
          id: 15,
          UserName: 'user4'
        }
      ],
      count: 0,
      pageCount: 0
    });
  });

  it('LOAD_GROUP_USERS', () => {
    const state = {
      groupId: '',
      messages: [],
      unreadMessages: [],
      readMessages: [],
      groupUsers: [],
      PlatformUsers: [],
      count: 0,
      pageCount: 0
    };
    const action = {
      type: LOAD_GROUP_USERS,
      data: [
        {
          id: 1,
          userId: 3,
          groupId: 1,
          user: {
            id: 3,
            UserName: 'tititawa'
          }
        },
        {
          id: 1,
          userId: 4,
          groupId: 1,
          user: {
            id: 4,
            UserName: 'funsho'
          }
        }
      ]
    };
    const results = store(state, action);
    expect(results).toEqual({
      groupId: '',
      messages: [],
      unreadMessages: [],
      readMessages: [],
      groupUsers: [
        {
          id: 1,
          userId: 3,
          groupId: 1,
          user: {
            id: 3,
            UserName: 'tititawa'
          }
        },
        {
          id: 1,
          userId: 4,
          groupId: 1,
          user: {
            id: 4,
            UserName: 'funsho'
          }
        }
      ],
      PlatformUsers: [],
      count: 0,
      pageCount: 0
    });
  });

  it('LOAD_UNREAD_MESSAGES', () => {
    const state = {
      groupId: '',
      messages: [],
      unreadMessages: [],
      readMessages: [],
      groupUsers: [],
      PlatformUsers: [],
      count: 0,
      pageCount: 0
    };
    const action = {
      type: LOAD_UNREAD_MESSAGES,
      data: [
        {
          id: 2,
          content: 'second message sent to this group',
          authorsName: 'tititawa',
          priorityValue: 'NORMAL',
          readby: '3,1',
          createdAt: '2017-09-16T11:27:46.739Z',
          updatedAt: '2017-09-16T11:29:16.282Z',
          groupId: 1,
          userId: 3
        },
        {
          id: 3,
          content: 'third message sent to this group',
          authorsName: 'Bunmi',
          priorityValue: 'CRITICAL',
          readby: '3,1',
          createdAt: '2017-09-16T11:27:46.739Z',
          updatedAt: '2017-09-16T11:29:16.282Z',
          groupId: 1,
          userId: 4
        }
      ]
    };

    const results = store(state, action);
    expect(results).toEqual({
      groupId: '',
      messages: [],
      unreadMessages: [
        {
          id: 2,
          content: 'second message sent to this group',
          authorsName: 'tititawa',
          priorityValue: 'NORMAL',
          readby: '3,1',
          createdAt: '2017-09-16T11:27:46.739Z',
          updatedAt: '2017-09-16T11:29:16.282Z',
          groupId: 1,
          userId: 3
        },
        {
          id: 3,
          content: 'third message sent to this group',
          authorsName: 'Bunmi',
          priorityValue: 'CRITICAL',
          readby: '3,1',
          createdAt: '2017-09-16T11:27:46.739Z',
          updatedAt: '2017-09-16T11:29:16.282Z',
          groupId: 1,
          userId: 4
        }
      ],
      readMessages: [],
      groupUsers: [],
      PlatformUsers: [],
      count: 0,
      pageCount: 0
    });
  });

  it('LOAD_READ_MESSAGES', () => {
    const state = {
      groupId: '',
      messages: [],
      unreadMessages: [],
      readMessages: [],
      groupUsers: [],
      PlatformUsers: [],
      count: 0,
      pageCount: 0
    };
    const action = {
      type: LOAD_READ_MESSAGES,
      data: [
        {
          id: 2,
          content: 'second message sent to this group',
          authorsName: 'tititawa',
          priorityValue: 'NORMAL',
          readby: '3,1',
          createdAt: '2017-09-16T11:27:46.739Z',
          updatedAt: '2017-09-16T11:29:16.282Z',
          groupId: 1,
          userId: 3
        },
        {
          id: 3,
          content: 'third message sent to this group',
          authorsName: 'Bunmi',
          priorityValue: 'CRITICAL',
          readby: '3,1',
          createdAt: '2017-09-16T11:27:46.739Z',
          updatedAt: '2017-09-16T11:29:16.282Z',
          groupId: 1,
          userId: 4
        }
      ]
    };

    const results = store(state, action);
    expect(results).toEqual({
      groupId: '',
      messages: [],
      unreadMessages: [],
      readMessages: [
        {
          id: 2,
          content: 'second message sent to this group',
          authorsName: 'tititawa',
          priorityValue: 'NORMAL',
          readby: '3,1',
          createdAt: '2017-09-16T11:27:46.739Z',
          updatedAt: '2017-09-16T11:29:16.282Z',
          groupId: 1,
          userId: 3
        },
        {
          id: 3,
          content: 'third message sent to this group',
          authorsName: 'Bunmi',
          priorityValue: 'CRITICAL',
          readby: '3,1',
          createdAt: '2017-09-16T11:27:46.739Z',
          updatedAt: '2017-09-16T11:29:16.282Z',
          groupId: 1,
          userId: 4
        }
      ],
      groupUsers: [],
      PlatformUsers: [],
      count: 0,
      pageCount: 0
    });
  });

  it('LOAD_COUNT', () => {
    const state = {
      groupId: '',
      messages: [],
      unreadMessages: [],
      readMessages: [],
      groupUsers: [],
      PlatformUsers: [],
      count: 0,
      pageCount: 0
    };
    const action = {
      type: LOAD_COUNT,
      data: 16
    };

    const results = store(state, action);
    expect(results).toEqual({
      groupId: '',
      messages: [],
      unreadMessages: [],
      readMessages: [],
      groupUsers: [],
      PlatformUsers: [],
      count: 16,
      pageCount: 0
    });
  });

  it('LOAD_PAGE_COUNT', () => {
    const state = {
      groupId: '',
      messages: [],
      unreadMessages: [],
      readMessages: [],
      groupUsers: [],
      PlatformUsers: [],
      count: 0,
      pageCount: 0
    };
    const action = {
      type: LOAD_PAGE_COUNT,
      data: 5
    };

    const results = store(state, action);
    expect(results).toEqual({
      groupId: '',
      messages: [],
      unreadMessages: [],
      readMessages: [],
      groupUsers: [],
      PlatformUsers: [],
      count: 0,
      pageCount: 5
    });
  });
});
