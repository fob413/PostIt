export default ({
  auth: {
    email: 'fob1493@gmail.com',
    groups: [],
    isLoggedIn: true,
    telephone: '12345678901',
    token: '',
    userId: 3,
    userName: 'user'
  },

  dashBoardProps: {
    auth: {
      email: 'fob1493@gmail.com',
      groups: [],
      isLoggedIn: true,
      telephone: '12345678901',
      token: '',
      userId: 3,
      userName: 'user'
    },
    createNewGroup: jest.fn(() => Promise.resolve()),
    groups: [],
    history: {
      push: jest.fn()
    },
    loadGroups: jest.fn()
  },

  dashBoardProps2: {
    auth: {
      email: 'fob1493@gmail.com',
      groups: [],
      isLoggedIn: false,
      telephone: '12345678901',
      token: '',
      userId: 3,
      userName: 'user'
    },
    createNewGroup: jest.fn(() => Promise.resolve()),
    groups: [],
    history: {
      push: jest.fn()
    },
    loadGroups: jest.fn()
  },

  dashBoardNextProps: {
    groups: [],
    auth: {
      isLoggedIn: true
    }
  },

  groupName: 'groupName',

  displayMessageProps: {
    author: 'user',
    content: 'Hello World'
  },

  footerProps: {
    auth: undefined
  },

  footerProps2: {
    auth: {
      isLoggedin: true
    }
  },

  footerProps3: {
    auth: {
      isLoggedin: false
    }
  },

  groupProps: {
    auth: {
      userId: 1
    },
    showGroup: {
      id: 2
    },
    history: {
      push: jest.fn()
    },
    loadCurrentGroup: jest.fn()
  },

  groupsProps: {
    groups: [
      {
        Group: {
          Messages: [],
          groupName: 'First Group',
          id: 2
        },
        createdAt: '2017-10-30T13:49:12.143Z',
        groupId: 2,
        id: 2,
        updatedAt: '2017-10-30T13:49:12.143Z',
        userId: 3
      }
    ],
    search: ''
  },

  groupsNextProps: {
    groups: [],
    search: ''
  },

  messageProps: {
    messageContent: 'Hello World',
    messageAuthor: 'User'
  },

  messageBoardProps: {
    sendMessage: jest.fn(() => Promise.resolve()),
    loadGroupMessages: jest.fn(),
    loadGroupUsers: jest.fn(),
    Messages: {
      readMessages: [
        {
          authorsName: 'user1',
          content: 'Hello world',
          createdAt: '2017-11-01T12:47:39.925Z',
          groupId: 2,
          id: 2,
          priorityValue: 'URGENT',
          readby: '3',
          updatedAt: '2017-11-01T12:4740.032Z',
          userId: 3
        },
        {
          authorsName: 'user2',
          content: 'Hello back at you',
          createdAt: '2017-11-01T12:47:39.925Z',
          groupId: 2,
          id: 2,
          priorityValue: 'URGENT',
          readby: '3',
          updatedAt: '2017-11-01T12:4740.032Z',
          userId: 3
        }
      ],
      unreadMessages: [
        {
          authorsName: 'user2',
          content: 'Hello back at you',
          createdAt: '2017-11-01T12:47:39.925Z',
          groupId: 2,
          id: 2,
          priorityValue: 'URGENT',
          readby: '3',
          updatedAt: '2017-11-01T12:4740.032Z',
          userId: 3
        }
      ]
    },
    auth: {},
    history: {
      push: jest.fn()
    },
    readMessages: jest.fn(),
    searchUsers: jest.fn()
  },

  messageBoardProps2: {
    sendMessage: jest.fn(() => Promise.reject()),
    loadGroupMessages: jest.fn(),
    loadGroupUsers: jest.fn(),
    Messages: {},
    auth: {},
    history: {
      push: jest.fn()
    },
    readMessages: jest.fn(),
    searchUsers: jest.fn()
  },

  messageBoardNextProps: {
    auth: {
      isloggedIn: true
    },
    Messages: {
      messages: [],
      unreadMessages: [],
      readMessages: [],
      PlatformUsers: [],
      groupUsers: [],
      pageCount: 2
    }
  },

  messageBoardEvent1: {
    target: {
      value: 'user'
    }
  },

  messageBoardEvent2: {
    target: {
      value: ''
    }
  },

  messageBoardEvent3: {
    preventDefault: jest.fn()
  },

  messageBoardData: {
    selected: 1
  },

  messageBoardSetState: {
    offset: 1,
    user: 'user',
    message: 'Hello world',
    priority: 'NORMAL'
  },

  navbarProps: {
    auth: {
      isLoggedin: true
    },
    signUserOut: jest.fn(() => Promise.resolve({
      res: {}
    })),
    unloadGroups: jest.fn(() => Promise.resolve()),
    history: {
      push: jest.fn()
    }
  },

  navbarNextProps: {
    auth: {
      isLoggedIn: false
    }
  },

  newGroupsProps: {
    createGroup: true,
    toggleCreateGroup: jest.fn(),
    onCreateGroup: jest.fn()
  },

  newGroupsProps2: {
    createGroup: false,
    toggleCreateGroup: jest.fn(),
    onCreateGroup: jest.fn()
  },

  newGroupsEvent: {
    target: { groupName: 'group' }
  },

  newGroupsSetState: {
    groupName: 'Group'
  },

  pageNotFoundProps: {
    history: {
      push: jest.fn()
    }
  },

  platformUsersProps: {
    platformUser: {
      id: 1,
      userName: 'user'
    },
    addUserToGroup: jest.fn(() => Promise.resolve()),
    Messages: {},
    loadGroupUsers: jest.fn(() => Promise.resolve()),
    groupUsers: [
      {
        id: 2,
        userId: 3,
        groupId: 2,
        User: {
          id: 3,
          userName: 'user1'
        }
      },
      {
        id: 3,
        userId: 4,
        groupId: 2,
        User: {
          id: 4,
          userName: 'user2'
        }
      }
    ]
  },

  plaformUsersNextProps: {
    groupUsers: [
      {
        id: 2,
        userId: 1,
        groupId: 2,
        User: {
          id: 1,
          userName: 'user1'
        }
      },
      {
        id: 3,
        userId: 4,
        groupId: 2,
        User: {
          id: 4,
          userName: 'user2'
        }
      }
    ]
  },

  profileProps: {
    auth: {
      userName: 'User',
      email: 'user@email.com',
      telephone: '1234567890',
      isLoggedIn: true
    },
    history: {
      push: jest.fn()
    },
  },

  profileProps2: {
    auth: {
      userName: 'User',
      email: 'user@email.com',
      telephone: '1234567890',
      isLoggedIn: false
    },
    history: {
      push: jest.fn()
    },
  },

  profileNextProps: {
    auth: {
      userName: 'User',
      email: 'user@email.com',
      telephone: '1234567890',
      isLoggedIn: false
    }
  },

  mockStore: {
    auth: {
      isLoggedin: false
    }
  },

  resetProps: {
    forgotPassword: jest.fn(() => Promise.resolve({
      res: { success: true }
    }))
  },

  resetProps2: {
    forgotPassword: jest.fn(() => Promise.reject())
  },

  resetSetState: {
    email: 'user@email.com'
  },

  resetEvent: {
    target: { email: 'funsho@email.com' }
  },

  resetPasswordProps: {
    auth: {
      isLoggedIn: false
    },
    history: { push: jest.fn() },
    router: {
      history: { push: jest.fn() },
    },
    authToken: jest.fn(() => Promise.resolve({
      res: {
        success: true
      }
    })),
    match: {
      params: {
        token: '82b786eb6e8e63c74814a74dc7445eb61eb19c41'
      }
    },
    resetPassword: jest.fn(() => Promise.resolve({
      res: {
        success: true
      }
    }))
  },

  resetPasswordProps2: {
    auth: {
      isLoggedIn: true
    },
    history: { push: jest.fn() },
    router: {
      history: { push: jest.fn() },
    },
    authToken: jest.fn(() => Promise.resolve({
      res: {
        userName: 'user',
        success: true
      }
    })),
    match: {
      params: {
        token: '82b786eb6e8e63c74814a74dc7445eb61eb19c41'
      }
    },
    resetPassword: jest.fn(() => Promise.resolve())
  },

  resetPasswordProps3: {
    auth: {
      isLoggedIn: true
    },
    history: { push: jest.fn() },
    router: {
      history: { push: jest.fn() },
    },
    authToken: jest.fn(() => Promise.reject({
      res: {
        success: false,
        message: 'an error occured'
      }
    })),
    match: {
      params: {
        token: '82b786eb6e8e63c74814a74dc7445eb61eb19c41'
      }
    },
    resetPassword: jest.fn(() => Promise.resolve())
  },

  resetPasswordProps4: {
    auth: {
      isLoggedIn: false
    },
    history: { push: jest.fn() },
    router: {
      history: { push: jest.fn() },
    },
    authToken: jest.fn(() => Promise.resolve()),
    match: {
      params: {
        token: '82b786eb6e8e63c74814a74dc7445eb61eb19c41'
      }
    },
    resetPassword: jest.fn(() => Promise.reject())
  },

  resetPasswordNextProps: {
    auth: {
      isLoggedIn: true
    }
  },

  resetPasswordEvent: {
    target: {
      newPassword: 'asdf;lkj'
    }
  },

  resetPasswordSetState: {
    newPassword: 'asdf;lkj',
    confirmPassword: 'asdf;lkj'
  },

  resetPasswordSetState2: {
    newPassword: 'asdf;lkj',
    confirmPassword: 'asdf;lk'
  },

  searchGroupsProps: {
    showSearchGroups: true,
    onSearchGroups: jest.fn()
  },

  searchGroupNextProps: {
    showSearchGroups: false
  },

  searchGroupEvent: {
    preventDefault: jest.fn(),
    target: {
      searchValue: 'group'
    }
  },

  signinProps: {
    auth: {
      isLoggedIn: false
    },
    history: { push: jest.fn() },
    router: {
      history: { push: jest.fn() },
    },
    signUserIn: jest.fn(() => Promise.resolve({
      res: {}
    }))
  },

  signinProps2: {
    auth: {
      isLoggedIn: true
    },
    history: { push: jest.fn() },
    router: {
      history: { push: jest.fn() },
    },
    signUserIn: jest.fn(() => Promise.resolve())
  },

  signinProps3: {
    auth: {
      isLoggedIn: false
    },
    history: { push: jest.fn() },
    router: {
      history: { push: jest.fn() },
    },
    signUserIn: jest.fn(() => Promise.reject())
  },

  signinNextProps: {
    auth: {
      isLoggedIn: true
    }
  },

  signinEvent: {
    target: { userName: 'FOB' }
  },

  signupProps: {
    auth: {
      isLoggedIn: false
    },
    history: { push: jest.fn() },
    router: {
      history: { push: jest.fn() },
    },
    signUserUp: jest.fn(() => Promise.resolve({
      res: {}
    }))
  },

  signupProps2: {
    auth: {
      isLoggedIn: true
    },
    history: { push: jest.fn() },
    router: {
      history: { push: jest.fn() },
    },
    signUserUp: jest.fn(() => Promise.resolve())
  },

  signupNextProps: {
    auth: {
      isLoggedIn: true
    }
  },

  signupEvent: {
    target: { userName: 'User' }
  },

  signupSetState: {
    userName: 'funsho',
    email: 'funsho@email.com',
    password: 'asdf;lkj',
    confirmPassword: 'asdf;lkj',
    telephone: '1234567890'
  },

  signupSetState2: {
    password: 'asdf;lkj',
    confirmPassword: 'asdf;lkj',
    telephone: 'asdfghjkl;'
  },

  signupSetState3: {
    password: 'asdf;lkj',
    confirmPassword: 'asdf;lk',
    telephone: 'asdfghjkl;'
  },

  searchGroupLabel: 'Search Groups',

  resetPasswordLabel: 'New Password',

  groupIconName: 'group',

  displayMessageIcon: 'message'


});
