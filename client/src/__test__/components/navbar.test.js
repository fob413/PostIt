/* global jest */
import React from 'react';
import { shallow, mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { Link } from 'react-router-dom';
import thunk from 'redux-thunk';
import ConnectedNavbar, { NavBar } from '../../components/navbar/navbar';
import data from '../__mocks__/componentMockData';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const store = mockStore({
  auth: {
    isLoggedIn: true
  }
});

describe('Navbar ', () => {
  let props;
  let mountedNavbar;

  const mountNavbar = () => {
    if (!mountedNavbar) {
      mountedNavbar = mount(
        <NavBar {...props} />,
        {
          childContextTypes: { router: React.PropTypes.object },
          context: { router: {
            history: {
              push: () => null,
              replace: () => null,
              path: null
            }
          }
          }
        }
      );
    }
    return mountedNavbar;
  };

  beforeEach(() => {
    props = data.navbarProps;
  });

  it('always renders a div', () => {
    const component = mountNavbar().find('div');
    expect(component.length).toBeGreaterThan(0);
  });

  it('calls the componentWillReceiveProps method', () => {
    const component = mountNavbar();
    const componentWillReceivePropsSpy = jest.spyOn(
      component.instance(), 'componentWillReceiveProps'
    );
    const nextProps = data.navbarNextProps;

    component.instance().componentWillReceiveProps(nextProps);
    expect(componentWillReceivePropsSpy).toHaveBeenCalled();
  });

  it('calls onSignOut method', () => {
    const component = mountNavbar();
    const event = data.messageBoardEvent3;
    const onSignOutSpy = jest.spyOn(
      component.instance(), 'onSignOut'
    );
    component.instance().onSignOut(event);
    expect(onSignOutSpy).toHaveBeenCalled();
  });

  it('has map state to props', () => {
    const component = shallow(<ConnectedNavbar {...props} store={store} />);
    expect(component.length).toBe(1);
  });
});
