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
    props = mockData.messageBoardProps;
  });

  it('always renders a div', () => {
    const component = mountMessageBoard();
    component.setState({
      unread: true
    });
    expect(component.find('div').length).toBeGreaterThan(0);
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

  it('calls a componentWillReceiveProps method', () => {
    const component = mountMessageBoard();
    const componentWillReceivePropsSpy = jest.spyOn(
      component.instance(), 'componentWillReceiveProps'
    );
    const nextProps = mockData.messageBoardNextProps;
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

    const event = mockData.messageBoardEvent1;

    component.instance().inputUser(event);
    expect(inputUserSpy).toHaveBeenCalled();
  });

  it('calls inputUser method', () => {
    const component = mountMessageBoard();
    const inputUserSpy = jest.spyOn(
      component.instance(), 'inputUser'
    );

    const event = mockData.messageBoardEvent2;

    component.instance().inputUser(event);
    expect(inputUserSpy).toHaveBeenCalled();
  });

  it('calls pageClick method', () => {
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

  it('calls prevPage method', () => {
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

  it('calls nextPage method', () => {
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

  it('calls onSend method', () => {
    const component = mountMessageBoard();
    const onSendSpy = jest.spyOn(
      component.instance(), 'onSend'
    );

    const event = mockData.messageBoardEvent3;

    component.setState(mockData.messageBoardSetState);

    component.instance().onSend(event);
    expect(onSendSpy).toHaveBeenCalled();
  });

  it('calls onSend method', () => {
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
  });
});

