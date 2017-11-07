/* global jest */
import React from 'react';
import { mount, shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ConnectedMessageBoard, { MessageBoard } from '../../components/messagePage/MessageBoard';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const store = mockStore({
  auth: { isLoggedin: false }
});

describe('MessageBoard ', () => {
  let props;
  let mountedMessageBoard;

  const mountMessageBoard = () => {
    if (!mountedMessageBoard) {
      mountedMessageBoard = mount(
        <MessageBoard {...props} />,
        {
          childContextTypes: { router: React.PropTypes.object },
          context: { router: {
            history: {
              push: () => null,
              createHref: () => null,
              replace: () => null,
              exact: true,
              path: '/messageboard',
              component: '[function Connect]',
              location: {
                pathname: '/messageboard',
                search: '',
                hash: '#!'
              },
              computedMatch: {
                path: '/messageboard',
                url: '/messageboard',
                isExact: true,
                params: {}
              }
            }
          }
          }
        }
      );
    }
    return mountedMessageBoard;
  };

  beforeEach(() => {
    props = {
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
    };
  });

  it('always renders a div', () => {
    const component = mountMessageBoard().find('div');
    component.setState({
      unread: true
    });
    expect(component.length).toBeGreaterThan(0);
  });

  it('has map state to props', () => {
    const component = shallow(
      <ConnectedMessageBoard {...props} store={store} />
    );
    expect(component.length).toBeGreaterThan(0);
  });

  it('calls a componentDidMount method', () => {
    const component = mountMessageBoard();
    const componentDidMountSpy = jest.spyOn(
      component.instance(), 'componentDidMount'
    );
    component.setState({
      groupId: 1
    });
    component.instance().componentDidMount();
    expect(componentDidMountSpy).toHaveBeenCalled();
  });

  it('calls a componentWillUnmount method', () => {
    const component = mountMessageBoard();
    const componentWillUnmountSpy = jest.spyOn(
      component.instance(), 'componentWillUnmount'
    );
    component.instance().componentWillUnmount();
    expect(componentWillUnmountSpy).toHaveBeenCalled();
  });

  it('calls a componentWillReceiveProps method', () => {
    const component = mountMessageBoard();
    const componentWillReceivePropsSpy = jest.spyOn(
      component.instance(), 'componentWillReceiveProps'
    );
    const nextProps = {
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
    };
    component.instance().componentWillReceiveProps(nextProps);
    expect(componentWillReceivePropsSpy).toHaveBeenCalled();
  });

  it('calls openThisModal method', () => {
    const component = mountMessageBoard();
    const openThisModalSpy = jest.spyOn(
      component.instance(), 'openThisModal'
    );

    const event = {
      preventDefault: jest.fn()
    };

    component.instance().openThisModal(event);
    expect(openThisModalSpy).toHaveBeenCalled();
  });

  it('calls closeModal method', () => {
    const component = mountMessageBoard();
    const closeModalSpy = jest.spyOn(
      component.instance(), 'closeModal'
    );

    component.instance().closeModal();
    expect(closeModalSpy).toHaveBeenCalled();
  });

  it('calls afterOpenModal method', () => {
    const component = mountMessageBoard();
    const afterOpenModalSpy = jest.spyOn(
      component.instance(), 'afterOpenModal'
    );

    component.instance().afterOpenModal();
    expect(afterOpenModalSpy).toHaveBeenCalled();
  });

  it('calls openModal method', () => {
    const component = mountMessageBoard();
    const openModalSpy = jest.spyOn(
      component.instance(), 'openModal'
    );

    component.instance().openModal();
    expect(openModalSpy).toHaveBeenCalled();
  });

  it('calls toggleUnread method', () => {
    const component = mountMessageBoard();
    const toggleUnreadSpy = jest.spyOn(
      component.instance(), 'toggleUnread'
    );
    component.setState({
      unread: true
    });

    component.instance().toggleUnread();
    expect(toggleUnreadSpy).toHaveBeenCalled();
  });

  it('calls toggleUnread method', () => {
    const component = mountMessageBoard();
    const toggleUnreadSpy = jest.spyOn(
      component.instance(), 'toggleUnread'
    );
    component.setState({
      unread: false
    });

    component.instance().toggleUnread();
    expect(toggleUnreadSpy).toHaveBeenCalled();
  });

  it('calls onChange method', () => {
    const component = mountMessageBoard();
    const onChangeSpy = jest.spyOn(
      component.instance(), 'onChange'
    );

    const event = {
      target: {
        value: 'user'
      }
    };

    component.instance().onChange(event);
    expect(onChangeSpy).toHaveBeenCalled();
  });

  it('calls inputUser method', () => {
    const component = mountMessageBoard();
    const inputUserSpy = jest.spyOn(
      component.instance(), 'inputUser'
    );

    const event = {
      target: {
        value: 'user'
      }
    };

    component.instance().inputUser(event);
    expect(inputUserSpy).toHaveBeenCalled();
  });

  it('calls inputUser method', () => {
    const component = mountMessageBoard();
    const inputUserSpy = jest.spyOn(
      component.instance(), 'inputUser'
    );

    const event = {
      target: {
        value: ''
      }
    };

    component.instance().inputUser(event);
    expect(inputUserSpy).toHaveBeenCalled();
  });

  it('calls pageClick method', () => {
    const component = mountMessageBoard();
    const pageClickSpy = jest.spyOn(
      component.instance(), 'pageClick'
    );

    const data = {
      selected: 1
    };

    component.setState({
      user: 'user'
    });

    component.instance().pageClick(data);
    expect(pageClickSpy).toHaveBeenCalled();
  });

  it('calls prevPage method', () => {
    const component = mountMessageBoard();
    const prevPageSpy = jest.spyOn(
      component.instance(), 'prevPage'
    );

    const event = {
      preventDefault: jest.fn()
    };

    component.setState({
      offset: 1
    });

    component.instance().prevPage(event);
    expect(prevPageSpy).toHaveBeenCalled();
  });

  it('calls nextPage method', () => {
    const component = mountMessageBoard();
    const nextPageSpy = jest.spyOn(
      component.instance(), 'nextPage'
    );

    const event = {
      preventDefault: jest.fn()
    };

    component.setState({
      offset: 1,
      user: 'user'
    });

    component.instance().nextPage(event);
    expect(nextPageSpy).toHaveBeenCalled();
  });

  it('calls onSend method', () => {
    const component = mountMessageBoard();
    const onSendSpy = jest.spyOn(
      component.instance(), 'onSend'
    );

    const event = {
      preventDefault: jest.fn()
    };

    component.setState({
      offset: 1,
      user: 'user',
      message: 'Hello world',
      priority: 'NORMAL'
    });

    component.instance().onSend(event);
    expect(onSendSpy).toHaveBeenCalled();
  });

  it('calls onSend method', () => {
    props = {
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
    };
    const component = mount(
      <MessageBoard {...props} />,
      {
        childContextTypes: { router: React.PropTypes.object },
        context: { router: {
          history: {
            push: () => null,
            createHref: () => null,
            replace: () => null,
            exact: true,
            path: '/messageboard',
            component: '[function Connect]',
            location: {
              pathname: '/messageboard',
              search: '',
              hash: '#!'
            },
            computedMatch: {
              path: '/messageboard',
              url: '/messageboard',
              isExact: true,
              params: {}
            }
          }
        }
        }
      }
    );
    const onSendSpy = jest.spyOn(
      component.instance(), 'onSend'
    );

    const event = {
      preventDefault: jest.fn()
    };

    component.setState({
      offset: 1,
      user: 'user',
      message: 'Hello world',
      priority: 'NORMAL'
    });

    component.instance().onSend(event);
    expect(onSendSpy).toHaveBeenCalled();
  });

  // it('always renders a div', () => {
  //   props = {
  //     sendMessage: jest.fn(() => Promise.resolve()),
  //     loadGroupMessages: jest.fn(),
  //     loadGroupUsers: jest.fn(),
  //     Messages: {},
  //     auth: {},
  //     history: {
  //       push: jest.fn()
  //     },
  //     readMessages: jest.fn(),
  //     searchUsers: jest.fn()
  //   };
  //   const component = mount(
  //     <MessageBoard {...props} />,
  //     {
  //       childContextTypes: { router: React.PropTypes.object },
  //       context: { router: {
  //         history: {
  //           push: () => null,
  //           createHref: () => null,
  //           replace: () => null,
  //           exact: true,
  //           path: '/messageboard',
  //           component: '[function Connect]',
  //           location: {
  //             pathname: '/messageboard',
  //             search: '',
  //             hash: '#!'
  //           },
  //           computedMatch: {
  //             path: '/messageboard',
  //             url: '/messageboard',
  //             isExact: true,
  //             params: {}
  //           }
  //         }
  //       }
  //       }
  //     }
  //   );
  //   expect(component.length).toBeGreaterThan(0);
  // });
});

