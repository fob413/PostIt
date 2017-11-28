/* global jest */
import React from 'react';
import { mount, shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ConnectedGroup, { Group } from '../../components/dashBoard/Group';
import mockData from '../__mocks__/componentMockData';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const store = mockStore({
  auth: { isLoggedin: false }
});

describe('Group component ', () => {
  let props;
  let mountedGroup;

  const mountGroup = () => {
    if (!mountedGroup) {
      mountedGroup = mount(
        <Group {...props} />
      );
    }
    return mountedGroup;
  };

  beforeEach(() => {
    props = mockData.groupProps;
  });

  it('should always render a div', () => {
    const component = mountGroup().find('div');
    expect(component.length).toBeGreaterThan(0);
  });

  it('should render a group icon', () => {
    const component = mountGroup().find('i');
    expect(component.props().children).toBe(mockData.groupIconName);
  });

  it('should contain a componentWillReceiveProps method', () => {
    const component = mountGroup();
    const componentWillReceivePropsSpy = jest.spyOn(
      component.instance(), 'componentWillReceiveProps'
    );
    const nextProps = {
      showGroup: {}
    };
    component.instance().componentWillReceiveProps(nextProps);
    expect(componentWillReceivePropsSpy).toHaveBeenCalled();
  });

  it('should render the connected component', () => {
    const component = shallow(
      <ConnectedGroup {...props} store={store} />
    );
    expect(component.length).toBe(1);
  });

  it('should contain an openGroup method', () => {
    const component = mountGroup();
    const openGroupSpy = jest.spyOn(
      component.instance(), 'openGroup'
    );
    const event = {
      preventDefault: jest.fn()
    };
    component.instance().openGroup(event);
    expect(openGroupSpy).toHaveBeenCalled();
  });
});

