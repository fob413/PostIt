/* global jest */
import React from 'react';
import { mount } from 'enzyme';
import { SearchGroups } from '../../components/dashboard/Searchgroups';

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
    props = {
      showSearchGroups: true,
      onSearchGroups: jest.fn()
    };
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

    const nextProps = {
      showSearchGroups: false
    };
    component.instance().componentWillReceiveProps(nextProps);
    expect(componentWillReceivePropSpy).toHaveBeenCalled();
  });

  it('calls searchGroups method', () => {
    const component = mountSearchGroups();
    const event = {
      preventDefault: jest.fn(),
      target: {
        searchValue: 'group'
      }
    };
    const searchGroupsSpy = jest.spyOn(
      component.instance(), 'searchGroups'
    );

    component.instance().searchGroups(event);
    expect(searchGroupsSpy).toHaveBeenCalled();
  });
});
