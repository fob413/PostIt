/* global jest */
import React from 'react';
import { mount } from 'enzyme';
import mockData from '../__mocks__/componentMockData';
import { SearchGroups } from '../../components/dashBoard/SearchGroups';

describe('SearchGroups ', () => {
  let props;
  let mountedSearchGroups;

  const mountSearchGroups = () => {
    if (!mountedSearchGroups) {
      mountedSearchGroups = mount(
        <SearchGroups {...props} />
      );
    }
    return mountedSearchGroups;
  };

  beforeEach(() => {
    props = mockData.searchGroupsProps;
  });

  it('renders a div', () => {
    const component = mountSearchGroups().find('div');
    expect(component.length).toBeGreaterThan(0);
  });

  it('always renders an input', () => {
    const component = mountSearchGroups().find('input');
    expect(component.length).toBe(1);
  });

  it('renders a label', () => {
    const component = mountSearchGroups().find('label').first();
    expect(component.props().children).toBe(mockData.searchGroupLabel);
  });

  it('calls a componentWillReceiveProp', () => {
    const component = mountSearchGroups();
    const componentWillReceivePropSpy = jest.spyOn(
      component.instance(), 'componentWillReceiveProps'
    );

    const nextProps = mockData.searchGroupNextProps;
    component.instance().componentWillReceiveProps(nextProps);
    expect(componentWillReceivePropSpy).toHaveBeenCalled();
  });

  it('calls searchGroups method', () => {
    const component = mountSearchGroups();
    const event = mockData.searchGroupEvent;
    const searchGroupsSpy = jest.spyOn(
      component.instance(), 'searchGroups'
    );

    component.instance().searchGroups(event);
    expect(searchGroupsSpy).toHaveBeenCalled();
  });
});
