/* global jest */
import React from 'react';
import { mount } from 'enzyme';
import { NewGroup } from '../../components/dashboard/Newgroup';

describe('NewGroup ', () => {
  let props;
  let mountedNewGroup;

  const mountNewGroup = () => {
    if (!mountedNewGroup) {
      mountedNewGroup = mount(
        <NewGroup {...props} />
      );
    }
    return mountedNewGroup;
  };

  beforeEach(() => {
    props = {
      createGroup: true,
      toggleCreateGroup: jest.fn(),
      onCreateGroup: jest.fn()
    };
  });

  it('renders a div', () => {
    const component = mountNewGroup().find('div');
    expect(component.length).toBeGreaterThan(0);
  });

  it('does not render anything when create is false', () => {
    props = {
      createGroup: false,
      toggleCreateGroup: jest.fn(),
      onCreateGroup: jest.fn()
    };
    const component = mount(
      <NewGroup {...props} />
    );
    expect(component.length).toBe(1);
  });

  it('calls an onChange method', () => {
    const component = mountNewGroup();
    const event = {
      target: { groupName: 'group' }
    };
    const onChangeSpy = jest.spyOn(component.instance(), 'onChange');
    component.instance().onChange(event);
    expect(onChangeSpy).toHaveBeenCalled();
  });

  it('calls onCreateGroup method', () => {
    const component = mountNewGroup();
    const event = {
      preventDefault: jest.fn()
    };
    component.setState({
      groupName: 'Group'
    });
    const onCreateGroupSpy = jest.spyOn(component.instance(), 'onCreateGroup');
    component.instance().onCreateGroup(event);
    expect(onCreateGroupSpy).toHaveBeenCalled();
  });

  it('calls onCancelCreate method', () => {
    const component = mountNewGroup();
    const event = {
      preventDefault: jest.fn()
    };
    const onCancelCreateSpy = jest.spyOn(component.instance(), 'onCancelCreate');
    component.instance().onCancelCreate(event);
    expect(onCancelCreateSpy).toHaveBeenCalled();
  });
});

