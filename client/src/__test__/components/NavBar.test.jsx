/* global jest */
import React from 'react';
import { shallow, mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ConnectedNavbar, { NavBar } from '../../components/navbar/NavBar';
import mockData from '../__mocks__/componentMockData';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const store = mockStore({
  auth: {
    isLoggedIn: true
  }
});

describe('Navbar component ', () => {
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
    props = mockData.navbarProps;
  });

  it('should always render a div', () => {
    const component = mountNavbar().find('div');
    expect(component.length).toBeGreaterThan(0);
  });

  it('should contain a componentWillReceiveProps method', () => {
    const component = mountNavbar();
    const componentWillReceivePropsSpy = jest.spyOn(
      component.instance(), 'componentWillReceiveProps'
    );
    const nextProps = mockData.navbarNextProps;

    component.instance().componentWillReceiveProps(nextProps);
    expect(componentWillReceivePropsSpy).toHaveBeenCalled();
  });

  it('should contain an onSignOut method', () => {
    const component = mountNavbar();
    const event = mockData.messageBoardEvent3;
    const onSignOutSpy = jest.spyOn(
      component.instance(), 'onSignOut'
    );
    component.instance().onSignOut(event);
    expect(onSignOutSpy).toHaveBeenCalled();
  });

  it('should render the connected component', () => {
    const component = shallow(<ConnectedNavbar {...props} store={store} />);
    expect(component.length).toBe(1);
  });
});
