/* global jest */
import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { shallow, mount } from 'enzyme';
import ConnectedPlatformUsers, { PlatformUsers } from '../../components/messagePage/PlatformUsers';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const store = mockStore({
  auth: { isLoggedin: false }
});

describe('PlatformUsers', () => {
  let props;
  let mountedPlatformUsers;

  const mountPlatformUsers = () => {
    if (!mountedPlatformUsers) {
      mountedPlatformUsers = mount(
        <PlatformUsers {...props} />
      );
    }
    return mountedPlatformUsers;
  };

  beforeEach(() => {
    props = {
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
    };
  });

  it('always renders a li', () => {
    const component = mountPlatformUsers().find('li');
    expect(component.length).toBeGreaterThan(0);
  });

  it('calls the componentWillReceiveProps method', () => {
    const component = mountPlatformUsers();
    const componentWillReceivePropsSpy = jest.spyOn(
      component.instance(), 'componentWillReceiveProps'
    );
    const nextProps = {
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
    };
    component.instance().componentWillReceiveProps(nextProps);
    expect(componentWillReceivePropsSpy).toHaveBeenCalled();
  });

  it('calls addUser method', () => {
    const component = mountPlatformUsers();
    const addUserSpy = jest.spyOn(component.instance(), 'addUser');
    const event = {
      preventDefault: jest.fn()
    };
    component.instance().addUser(event);
    expect(addUserSpy).toHaveBeenCalled();
  });

  it('has map state to props', () => {
    const component = shallow(<ConnectedPlatformUsers {...props} store={store} />);
    expect(component.length).toBe(1);
  });
});

