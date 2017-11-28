/* global jest */
import React from 'react';
import { mount, shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ConnectedMessageBoard, { MessageBoard } from '../../components/messageBoard/MessageBoard';
import mockData from '../__mocks__/componentMockData';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const store = mockStore({
  auth: { isLoggedin: false }
});

describe('MessageBoard component', () => {
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
    props = mockData.messageBoardProps;
  });

  it('should always render a div', () => {
    const component = mountMessageBoard();
    component.setState({
      unread: true
    });
    expect(component.find('div').length).toBeGreaterThan(0);
  });

  it('should render the connected component', () => {
    const component = shallow(
      <ConnectedMessageBoard {...props} store={store} />
    );
    expect(component.length).toBeGreaterThan(0);
  });

  it('should contain a componentDidMount method', () => {
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

  it('should contain a componentWillReceiveProps method', () => {
    const component = mountMessageBoard();
    const componentWillReceivePropsSpy = jest.spyOn(
      component.instance(), 'componentWillReceiveProps'
    );
    const nextProps = mockData.messageBoardNextProps;
    component.instance().componentWillReceiveProps(nextProps);
    expect(componentWillReceivePropsSpy).toHaveBeenCalled();
  });

  it('should contain an openThisModal method', () => {
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

  it('should contain a closeModal method', () => {
    const component = mountMessageBoard();
    const closeModalSpy = jest.spyOn(
      component.instance(), 'closeModal'
    );

    component.instance().closeModal();
    expect(closeModalSpy).toHaveBeenCalled();
  });

  it('should contain an afterOpenModal method', () => {
    const component = mountMessageBoard();
    const afterOpenModalSpy = jest.spyOn(
      component.instance(), 'afterOpenModal'
    );

    component.instance().afterOpenModal();
    expect(afterOpenModalSpy).toHaveBeenCalled();
  });

  it('should contain an openModal method', () => {
    const component = mountMessageBoard();
    const openModalSpy = jest.spyOn(
      component.instance(), 'openModal'
    );

    component.instance().openModal();
    expect(openModalSpy).toHaveBeenCalled();
  });

  it('should contain a toggleUnread method which toggles state.unread to false', () => {
    const component = mountMessageBoard();
    const toggleUnreadSpy = jest.spyOn(
      component.instance(), 'toggleUnread'
    );
    component.setState({
      unread: true
    });

    component.instance().toggleUnread();
    expect(toggleUnreadSpy).toHaveBeenCalled();
    expect(component.instance().state.unread).toBe(false);
  });

  it('should contain a toggleUnread method which toggles state.unread to true', () => {
    const component = mountMessageBoard();
    const toggleUnreadSpy = jest.spyOn(
      component.instance(), 'toggleUnread'
    );
    component.setState({
      unread: false
    });

    component.instance().toggleUnread();
    expect(toggleUnreadSpy).toHaveBeenCalled();
    expect(component.instance().state.unread).toBe(true);
  });

  it('should contain an onChange method', () => {
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

  it('should contain an empty addUser state if username is empty', () => {
    const component = mountMessageBoard();
    const event = mockData.messageBoardEvent2;
    component.instance().inputUser(event);
    expect(component.instance().state.addUser).toEqual('');
  });

  it('should contain an inputUser method', () => {
    const component = mountMessageBoard();
    const inputUserSpy = jest.spyOn(
      component.instance(), 'inputUser'
    );

    const event = mockData.messageBoardEvent1;

    component.instance().inputUser(event);
    expect(inputUserSpy).toHaveBeenCalled();
  });

  it('should contain a pageClick method', () => {
    const component = mountMessageBoard();
    const pageClickSpy = jest.spyOn(
      component.instance(), 'pageClick'
    );

    const simulateData = mockData.messageBoardData;

    component.setState({
      user: 'user'
    });

    component.instance().pageClick(simulateData);
    expect(pageClickSpy).toHaveBeenCalled();
  });

  it('should contain a prevPage method', () => {
    const component = mountMessageBoard();
    const prevPageSpy = jest.spyOn(
      component.instance(), 'prevPage'
    );

    const event = mockData.messageBoardEvent3;

    component.setState({
      offset: 1
    });

    component.instance().prevPage(event);
    expect(prevPageSpy).toHaveBeenCalled();
  });

  it('should contain a nextPage method', () => {
    const component = mountMessageBoard();
    const nextPageSpy = jest.spyOn(
      component.instance(), 'nextPage'
    );

    const event = mockData.messageBoardEvent3;

    component.setState({
      offset: 1,
      user: 'user'
    });

    component.instance().nextPage(event);
    expect(nextPageSpy).toHaveBeenCalled();
  });

  it('should contain an onSend method', () => {
    const component = mountMessageBoard();
    const onSendSpy = jest.spyOn(
      component.instance(), 'onSend'
    );

    const event = mockData.messageBoardEvent3;

    component.setState(mockData.messageBoardSetState);

    component.instance().onSend(event);
    expect(onSendSpy).toHaveBeenCalled();
  });

  it('should empty out state.message after a message has been sent', () => {
    props = mockData.messageBoardProps2;
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

    component.setState(mockData.messageBoardSetState);

    component.instance().onSend(event);
    expect(onSendSpy).toHaveBeenCalled();
    expect(component.instance().state.message).toBe('');
  });
});

