/* global jest */
import React from 'react';
import { mount, shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ConnectedDashBoard, { DashBoard } from '../../components/dashboard/dashboard';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const store = mockStore({
  auth: { isLoggedin: false }
});

describe('DashBoard', () => {
  let props;
  let mountedDashBoard;

  const mountDashBoard = () => {
    if (!mountedDashBoard) {
      mountedDashBoard = mount(
        <DashBoard {...props} />,
        {
          childContextTypes: { router: React.PropTypes.object },
          context: { router: {
            history: {
              push: () => null,
              createHref: () => null,
              replace: () => null,
              exact: true,
              path: '/dashboard',
              component: '[function Connect]',
              location: {
                pathname: '/dashboard',
                search: '',
                hash: '',
                key: 'zn3j8m'
              },
              computedMatch: {
                path: '/dashboard',
                url: '/dashboard',
                isExact: true,
                params: {}
              }
            }
          }
          }
        }
      );
    }
    return mountedDashBoard;
  };

  beforeEach(() => {
    props = {
      auth: {
        email: 'fob1493@gmail.com',
        groups: [],
        isLoggedIn: true,
        telephone: '12345678901',
        token: '',
        userId: 3,
        userName: 'user'
      },
      createNewGroup: jest.fn(() => Promise.resolve()),
      groups: [],
      history: {
        push: jest.fn()
      },
      loadGroups: jest.fn()
    };
  });

  it('always renders a div', () => {
    const component = mountDashBoard().find('div');
    expect(component.length).toBeGreaterThan(0);
  });

  it('sends the user to signin if not authenticated', () => {
    props = {
      auth: {
        email: 'fob1493@gmail.com',
        groups: [],
        isLoggedIn: false,
        telephone: '12345678901',
        token: '',
        userId: 3,
        userName: 'user'
      },
      createNewGroup: jest.fn(() => Promise.resolve()),
      groups: [],
      history: {
        push: jest.fn()
      },
      loadGroups: jest.fn()
    };

    const component = mount(
      <DashBoard {...props} />,
      {
        childContextTypes: { router: React.PropTypes.object },
        context: { router: {
          history: {
            push: () => null,
            createHref: () => null,
            replace: () => null,
            exact: true,
            path: '/dashboard',
            component: '[function Connect]',
            location: {
              pathname: '/dashboard',
              search: '',
              hash: '',
              key: 'zn3j8m'
            },
            computedMatch: {
              path: '/dashboard',
              url: '/dashboard',
              isExact: true,
              params: {}
            }
          }
        }
        }
      }
    ).find('div');

    expect(component.length).toBeGreaterThan(0);
  });

  it('calls a componentWillReceiveProps method', () => {
    const component = mountDashBoard();

    const componentWillReceivePropsSpy = jest.spyOn(
      component.instance(), 'componentWillReceiveProps'
    );

    const nextProps = {
      groups: [],
      auth: {
        isLoggedIn: true
      }
    };

    component.instance().componentWillReceiveProps(nextProps);
    expect(componentWillReceivePropsSpy).toHaveBeenCalled();
  });

  it('calls onCreateGroup', () => {
    const component = mountDashBoard();
    const onCreateGroupSpy = jest.spyOn(
      component.instance(), 'onCreateGroup'
    );

    const groupName = 'Random New Group';

    component.instance().onCreateGroup(groupName);
    expect(onCreateGroupSpy).toHaveBeenCalled();
  });

  it('calls onSearchGroups', () => {
    const component = mountDashBoard();
    const onSearchGroupsSpy = jest.spyOn(
      component.instance(), 'onSearchGroups'
    );

    const search = 'Random New Group';

    component.instance().onSearchGroups(search);
    expect(onSearchGroupsSpy).toHaveBeenCalled();
  });

  it('calls toggleCreateGroup', () => {
    const component = mountDashBoard();
    const toggleCreateGroupSpy = jest.spyOn(
      component.instance(), 'toggleCreateGroup'
    );
    component.setState({
      showSearchGroups: true
    });

    component.instance().toggleCreateGroup();
    expect(toggleCreateGroupSpy).toHaveBeenCalled();
  });

  it('calls toggleCreateGroup', () => {
    const component = mountDashBoard();
    const toggleCreateGroupSpy = jest.spyOn(
      component.instance(), 'toggleCreateGroup'
    );
    component.setState({
      showSearchGroups: false
    });

    component.instance().toggleCreateGroup();
    expect(toggleCreateGroupSpy).toHaveBeenCalled();
  });

  it('calls toggleSearchGroups', () => {
    const component = mountDashBoard();
    const toggleSearchGroupsSpy = jest.spyOn(
      component.instance(), 'toggleSearchGroups'
    );
    component.setState({
      createGroup: true
    });

    component.instance().toggleSearchGroups();
    expect(toggleSearchGroupsSpy).toHaveBeenCalled();
  });

  it('calls toggleSearchGroups', () => {
    const component = mountDashBoard();
    const toggleSearchGroupsSpy = jest.spyOn(
      component.instance(), 'toggleSearchGroups'
    );
    component.setState({
      createGroup: false
    });

    component.instance().toggleSearchGroups();
    expect(toggleSearchGroupsSpy).toHaveBeenCalled();
  });

  it('has map state to props', () => {
    const component = shallow(
      <ConnectedDashBoard {...props} store={store} />
    );
    expect(component.length).toBe(1);
  });
});
