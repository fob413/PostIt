/* global jest */
import React from 'react';
import { shallow, mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ConnectedProfile, { Profile } from '../../components/navbar/Profile';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const store = mockStore({
  auth: { isLoggedin: false }
});

describe('Profile ', () => {
  let props;
  let mountedProfile;

  const mountProfile = () => {
    if (!mountedProfile) {
      mountedProfile = mount(
        <Profile {...props} />,
      );
    }
    return mountedProfile;
  };

  beforeEach(() => {
    props = {
      auth: {
        userName: 'User',
        email: 'user@email.com',
        telephone: '1234567890',
        isLoggedIn: true
      },
      history: {
        push: jest.fn()
      },
    };
  });

  it('always renders a div', () => {
    const component = mountProfile().find('div');
    expect(component.length).toBeGreaterThan(0);
  });

  it('has map state to props', () => {
    const component = shallow(<ConnectedProfile {...props} store={store} />);
    expect(component.length).toBe(1);
  });

  it('has componentWillMount method', () => {
    props = {
      auth: {
        userName: 'User',
        email: 'user@email.com',
        telephone: '1234567890',
        isLoggedIn: false
      },
      history: {
        push: jest.fn()
      },
    };

    const component = mount(
      <Profile {...props} />
    );

    const componentWillMountSpy = jest.spyOn(
      component.instance(), 'componentWillMount'
    );
    component.instance().componentWillMount();
    expect(componentWillMountSpy).toHaveBeenCalled();
  });

  it('has componentWillReceiveProps method', () => {
    props = {
      auth: {
        userName: 'User',
        email: 'user@email.com',
        telephone: '1234567890',
        isLoggedIn: true
      },
      history: {
        push: jest.fn()
      },
    };

    const component = mount(
      <Profile {...props} />
    );

    const nextProps = {
      auth: {
        userName: 'User',
        email: 'user@email.com',
        telephone: '1234567890',
        isLoggedIn: false
      }
    };

    const componentWillReceivePropsSpy = jest.spyOn(
      component.instance(), 'componentWillReceiveProps'
    );
    component.instance().componentWillReceiveProps(nextProps);
    expect(componentWillReceivePropsSpy).toHaveBeenCalled();
  });
});
