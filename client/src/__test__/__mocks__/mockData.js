import * as types from '../../helpers/constants';

export default ({
  userData: {
    userName: 'funsho',
    email: 'funsho@email.com',
    telephone: '1234567890',
    password: 'asdf;lkj'
  },

  token: 'abcdefghijklmnopqrstuvwxyz',

  id: 1,

  groupId: 1,

  priority: 'NORMAL',

  message: 'Hello World',

  emptyAction: [],

  password: 'asdf;lkj',

  messageArrayData: [
    {
      id: 1,
      message: 'Hello world',
      author: 'User 1',
      readby: '1,2'
    },

    {
      id: 2,
      message: 'Hello world',
      author: 'User 2',
      readby: '1,2'
    },
    {
      id: 1,
      message: 'Hello world',
      author: 'User 3',
      readby: '1,2'
    },

    {
      id: 2,
      message: 'Hello world',
      author: 'User 4',
      readby: '1,2'
    },
    {
      id: 1,
      message: 'Hello world',
      author: 'User 5',
      readby: '1,2'
    },

    {
      id: 2,
      message: 'Hello world',
      author: 'User 6',
      readby: '1,2'
    }
  ],

  platformUsers: [
    {
      id: 1,
      userName: 'user1'
    },
    {
      id: 2,
      userName: 'user2'
    },
    {
      id: 2,
      userName: 'user3'
    }
  ],

  offfset: 0,

  searchUser: {
    userName: 'user',
    limit: 5
  },

  userName: 'user',

  searchUserResult: {
    success: true,
    users: {
      count: 1,
      rows: [
        {
          id: 1,
          userName: 'user1'
        },
        {
          id: 2,
          userName: 'user2'
        },
        {
          id: 3,
          userName: 'user3'
        },
        {
          id: 4,
          userName: 'user4'
        }
      ]
    },
    paginateData: {
      page: 1,
      pageCount: 1,
      pageSize: 1,
      count: 1
    }
  },

  loadCurrentGroupActions: [
    {
      type: types.CURRENT_GROUP,
      payLoad: 1
    }
  ],

  actions: {
    authAction: {
      signupSuccess: [
        {
          type: types.SIGN_UP,
          payLoad: {
            success: true,
            message: 'Successfully signed user up',
            token: 'abcdefghijklmnopqrstuvwxyz'
          }
        }
      ],

      signinSuccess: [
        {
          type: types.SIGN_IN,
          payLoad: {
            success: true,
            message: 'Successfully signed user in',
            token: 'abcdefghijklmnopqrstuvwxyz'
          }
        }
      ],

      signoutSuccess: [
        {
          type: types.SIGN_OUT,
          payLoad: {
            success: true,
            isLoggedIn: false,
            message: 'Successfully logged user out'
          }
        }
      ],
    },
    groups: {
      loadGroupsResponse: {
        success: true,
        members: [
          {
            id: 1,
            groupName: 'Group One'
          },
          {
            id: 2,
            groupName: 'Group Two'
          }
        ]
      },

      loadGroupsFail: {
        success: false,
        message: 'an error occured'
      },

      loadGroupsActions: [
        {
          type: types.LOAD_GROUPS,
          payLoad: [
            {
              id: 1,
              groupName: 'Group One'
            },
            {
              id: 2,
              groupName: 'Group Two'
            }
          ]
        }
      ],

      unloadGroupsAction: [
        {
          type: types.UNLOAD_GROUPS
        }
      ],

      createGroupResponse: {
        success: true,
        message: 'New group successfully created'
      },

      createGroupFail: {
        success: false,
        message: 'An error occured'
      }
    }
  },

  reducers: {
    auth: {

      signupAction: {
        type: types.SIGN_UP,
        payLoad: {
          userName: 'funsho',
          isLoggedin: true,
          token: 'abcdefghijklmnopqrstuvwxyz',
          email: 'fob1493@gmail.com',
          telephone: '08138498175',
          userId: '1'
        }
      },

      signupExpected: {
        userName: 'funsho',
        isLoggedIn: true,
        token: 'abcdefghijklmnopqrstuvwxyz',
        email: 'fob1493@gmail.com',
        telephone: '08138498175',
        userId: '1'
      },

      signinAction: {
        type: types.SIGN_IN,
        payLoad: {
          userName: 'funsho',
          isLoggedin: true,
          token: 'abcdefghijklmnopqrstuvwxyz',
          telephone: '08138498175',
          email: 'fob1493@gmail.com',
          userId: '1'
        }
      },

      sigininExpected: {
        userName: 'funsho',
        isLoggedIn: true,
        token: 'abcdefghijklmnopqrstuvwxyz',
        telephone: '08138498175',
        email: 'fob1493@gmail.com',
        userId: '1'
      },

      signoutAction: {
        type: types.SIGN_OUT,
        payLoad: {
          isLoggedIn: false
        }
      },

      signoutExpected: {
        userName: '',
        isLoggedIn: false,
        token: '',
        email: '',
        telephone: '',
        groups: [],
        userId: ''
      },

      reloadAction: {
        type: types.RELOAD_USER_IN,
        payLoad: {
          userName: 'funsho',
          email: 'fob1493@gmail.com',
          telephone: '08138498175',
          userId: '1',
          isLoggedIn: true
        }
      },

      reloadExpected: {
        userName: 'funsho',
        email: 'fob1493@gmail.com',
        telephone: '08138498175',
        userId: '1',
        isLoggedIn: true
      },
    },

    group: {
      loadAction: {
        type: types.LOAD_GROUPS,
        payLoad: [
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
      },

      loadExpected: [
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
      ],

      unloadInitialState: {
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
      },

      unloadAction: {
        type: types.UNLOAD_GROUPS
      },

      unloadExpected: {
        Groups: []
      },
    },

    messages: {
      loadInitialState: {
        groupId: '',
        messages: [],
        unreadMessages: [],
        readMessages: [],
        groupUsers: [],
        PlatformUsers: [],
        count: 0,
        pageCount: 0
      },

      loadGroupAction: {
        type: types.LOAD_GROUP_MESSAGES,
        payLoad: [
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
      },

      loadGroupExpected: {
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
      },

      currentGroupAction: {
        type: types.CURRENT_GROUP,
        payLoad: 5
      },

      currentGroupExpected: {
        groupId: 5,
        messages: [],
        unreadMessages: [],
        readMessages: [],
        groupUsers: [],
        PlatformUsers: [],
        count: 0,
        pageCount: 0
      },

      platformUsersAction: {
        type: types.LOAD_PLATFORM_USERS,
        payLoad: [
          {
            id: 14,
            UserName: 'user3'
          },
          {
            id: 15,
            UserName: 'user4'
          }
        ]
      },

      platformUsersExpected: {
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
      },

      loadUsersAction: {
        type: types.LOAD_GROUP_USERS,
        payLoad: [
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
      },

      loadUsersExpected: {
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
      },

      unreadMessagesAction: {
        type: types.LOAD_UNREAD_MESSAGES,
        payLoad: [
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
      },

      unreadMessagesExpected: {
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
      },

      readMessagesAction: {
        type: types.LOAD_READ_MESSAGES,
        payLoad: [
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
      },

      readMessagesExpected: {
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
      },

      loadCountAction: {
        type: types.LOAD_COUNT,
        payLoad: 16
      },

      loadCountExpected: {
        groupId: '',
        messages: [],
        unreadMessages: [],
        readMessages: [],
        groupUsers: [],
        PlatformUsers: [],
        count: 16,
        pageCount: 0
      },

      loadPageCountAction: {
        type: types.LOAD_PAGE_COUNT,
        payLoad: 5
      },

      loadPageCountExpected: {
        groupId: '',
        messages: [],
        unreadMessages: [],
        readMessages: [],
        groupUsers: [],
        PlatformUsers: [],
        count: 0,
        pageCount: 5
      },

      defaultExpected: {
        groupId: '',
        messages: [],
        unreadMessages: [],
        readMessages: [],
        groupUsers: [],
        PlatformUsers: [],
        count: 0,
        pageCount: 0
      },
    }
  }

});

