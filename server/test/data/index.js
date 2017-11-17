export default ({
  user1: {
    userName: 'user1',
    password: 'asdf;lkj',
    email: 'user1@email.com',
    telephone: '1234567890'
  },
  errorUser1: {
    userName: null,
    password: 'asdf;lkj',
    email: 'user@email.com',
    telephone: '1234567890'
  },
  errorUser2: {
    userName: 'user',
    password: null,
    email: 'user@email.com',
    telephone: '1234567890'
  },
  errorUser3: {
    userName: 'user',
    password: 'asdf;lkj',
    email: null,
    telephone: '1234567890'
  },
  errorUser4: {
    userName: 'user',
    password: 'asdf;lkj',
    email: 'user@email.com',
    telephone: null
  },
  newPassword: ';lkjasdf',
  message1: {
    content: 'Hello World',
    authorsName: 'User',
    priorityValue: 'URGENT',
    groupId: 1,
    userId: 1
  },
  message2: {
    content: null,
    authorsName: 'User',
    priorityValue: 'URGENT',
    groupId: 1,
    userId: 1
  },
  message3: {
    content: 'Hello world',
    authorsName: null,
    priorityValue: 'URGENT',
    groupId: 1,
    userId: 1
  },
  message4: {
    content: 'Hello World',
    authorsName: 'user',
    groupId: 1,
    userId: 1
  },
  group1: {
    groupName: 'Group one'
  },
  group2: {
    groupName: null
  },
  groupMember1: {
    userId: 1,
    groupId: 1
  },
  groupMember2: {
    userId: null,
    groupId: 1
  },
  groupMember3: {
    userId: 1,
    groupId: null
  }
});

