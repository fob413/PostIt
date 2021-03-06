/* global jest */
import React from 'react';
import { shallow } from 'enzyme';
import { Groups } from '../../components/dashBoard/Groups';
import mockData from '../__mocks__/componentMockData';

describe('Groups ', () => {
  let props;
  let mountedGroups;

  const shallowMountGroups = () => {
    if (!mountedGroups) {
      mountedGroups = shallow(
        <Groups {...props} />
      );
    }
    return mountedGroups;
  };

  beforeEach(() => {
    props = mockData.groupsProps;
  });

  it('always renders a div', () => {
    const component = shallowMountGroups().find('div');
    expect(component.length).toBeGreaterThan(0);
  });

  it('calls a componentWillReceiveProps method', () => {
    const component = shallowMountGroups();
    const componentWillReceivePropsSpy = jest.spyOn(
      component.instance(), 'componentWillReceiveProps'
    );
    const nextProps = mockData.groupsNextProps;
    component.instance().componentWillReceiveProps(nextProps);
    expect(componentWillReceivePropsSpy).toHaveBeenCalled();
  });

  it('always renders a text when there are no groups', () => {
    props = mockData.groupsNextProps;
    const component = shallow(
      <Groups {...props} />
    ).find('h4');
    expect(component.length).toBeGreaterThan(0);
  });
});

