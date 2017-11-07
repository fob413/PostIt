/* global jest */
import React from 'react';
import { shallow } from 'enzyme';
import { Groups } from '../../components/dashboard/Groups';

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
    props = {
      groups: [
        {
          Group: {
            Messages: [],
            groupName: 'First Group',
            id: 2
          },
          createdAt: '2017-10-30T13:49:12.143Z',
          groupId: 2,
          id: 2,
          updatedAt: '2017-10-30T13:49:12.143Z',
          userId: 3
        }
      ],
      search: ''
    };
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
    const nextProps = {
      groups: [],
      search: ''
    };
    component.instance().componentWillReceiveProps(nextProps);
    expect(componentWillReceivePropsSpy).toHaveBeenCalled();
  });

  it('always renders a div', () => {
    props = {
      groups: [],
      search: ''
    };
    const component = shallow(
      <Groups {...props} />
    ).find('div');
    expect(component.length).toBeGreaterThan(0);
  });
});

