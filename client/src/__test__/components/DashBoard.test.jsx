/* global jest */
import React from 'react';
import { mount, shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ConnectedDashBoard, { DashBoard } from '../../components/dashBoard/DashBoard';
import { SearchGroups } from '../../components/dashBoard/SearchGroups';
import { NewGroup } from '../../components/dashBoard/NewGroup';
import mockData from '../__mocks__/componentMockData';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const store = mockStore({
  auth: { isLoggedin: false }
});

describe('DashBoard component', () => {
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
    props = mockData.dashBoardProps;
  });

  it('should always render a div', () => {
    const component = mountDashBoard().find('div');
    expect(component.length).toBeGreaterThan(0);
  });

  it('should render SearchGroup component', () => {
    const component = mountDashBoard().find(SearchGroups);
    expect(component.length).toBe(1);
  });

  it('should render NewGroup component', () => {
    const component = mountDashBoard().find(NewGroup);
    expect(component.length).toBe(1);
  });

  it('should render SearchGroup and NewGroup buttons', () => {
    const component = mountDashBoard().find('a');
    expect(component.length).toBe(2);
  });

  it('should render without crashing', () => {
    props = mockData.dashBoardProps2;

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
    );
    expect(component.length).toBeGreaterThan(0);
  });

  it('should contain a componentWillReceiveProps method', () => {
    const component = mountDashBoard();

    const componentWillReceivePropsSpy = jest.spyOn(
      component.instance(), 'componentWillReceiveProps'
    );

    const nextProps = mockData.dashBoardNextProps;

    component.instance().componentWillReceiveProps(nextProps);
    expect(componentWillReceivePropsSpy).toHaveBeenCalled();
  });

  it('should contain an onCreateGroup method', () => {
    const component = mountDashBoard();
    const onCreateGroupSpy = jest.spyOn(
      component.instance(), 'onCreateGroup'
    );

    const groupName = mockData.groupName;

    component.instance().onCreateGroup(groupName);
    expect(onCreateGroupSpy).toHaveBeenCalled();
  });

  it('should contain an onSearchGroups method', () => {
    const component = mountDashBoard();
    const onSearchGroupsSpy = jest.spyOn(
      component.instance(), 'onSearchGroups'
    );

    const search = mockData.groupName;

    component.instance().onSearchGroups(search);
    expect(onSearchGroupsSpy).toHaveBeenCalled();
  });

  it('should contain a toggleCreateGroup method', () => {
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

  it('should contain a toggleCreateGroup method', () => {
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

  it('should contain a toggleSearchGroups method', () => {
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

  it('should contain a toggleSearchGroups method', () => {
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

  it('should render the connected component', () => {
    const component = shallow(
      <ConnectedDashBoard {...props} store={store} />
    );
    expect(component.length).toBe(1);
  });
});
