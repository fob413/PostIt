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
