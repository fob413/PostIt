/* global jest */
import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { shallow, mount } from 'enzyme';
import ConnectedPlatformUsers, { PlatformUsers } from '../../components/messageBoard/PlatformUsers';
import data from '../__mocks__/componentMockData';

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
    props = data.platformUsersProps;
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
    const nextProps = data.plaformUsersNextProps;
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

