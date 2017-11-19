/* global jest */
import React from 'react';
import { mount } from 'enzyme';
import { NewGroup } from '../../components/dashBoard/NewGroup';
import data from '../__mocks__/componentMockData';

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
    props = data.newGroupsProps;
  });

  it('renders a div', () => {
    const component = mountNewGroup().find('div');
    expect(component.length).toBeGreaterThan(0);
  });

  it('does not render anything when create is false', () => {
    props = data.newGroupsProps2;
    const component = mount(
      <NewGroup {...props} />
    );
    expect(component.length).toBe(1);
  });

  it('calls an onChange method', () => {
    const component = mountNewGroup();
    const event = data.newGroupsEvent;
    const onChangeSpy = jest.spyOn(component.instance(), 'onChange');
    component.instance().onChange(event);
    expect(onChangeSpy).toHaveBeenCalled();
  });

  it('calls onCreateGroup method', () => {
    const component = mountNewGroup();
    const event = data.messageBoardEvent3;
    component.setState(data.newGroupsSetState);
    const onCreateGroupSpy = jest.spyOn(component.instance(), 'onCreateGroup');
    component.instance().onCreateGroup(event);
    expect(onCreateGroupSpy).toHaveBeenCalled();
  });

  it('calls onCancelCreate method', () => {
    const component = mountNewGroup();
    const event = data.messageBoardEvent3;
    const onCancelCreateSpy = jest.spyOn(component.instance(), 'onCancelCreate');
    component.instance().onCancelCreate(event);
    expect(onCancelCreateSpy).toHaveBeenCalled();
  });
});

