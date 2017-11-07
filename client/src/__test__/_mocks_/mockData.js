const data = {
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
    data: {
      page: 1,
      pageCount: 1,
      pageSize: 1,
      count: 1
    }
  }
};

export default data;
