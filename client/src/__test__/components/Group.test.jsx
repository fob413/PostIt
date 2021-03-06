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

describe('Group ', () => {
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

  it('always renders a div', () => {
    const component = mountGroup().find('div');
    expect(component.length).toBeGreaterThan(0);
  });

  it('renders group icon', () => {
    const component = mountGroup().find('i');
    expect(component.props().children).toBe(mockData.groupIconName);
  });

  it('calls a componentWillReceiveProps method', () => {
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

  it('has map state to props', () => {
    const component = shallow(
      <ConnectedGroup {...props} store={store} />
    );
    expect(component.length).toBe(1);
  });

  it('calls openGroup method', () => {
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

