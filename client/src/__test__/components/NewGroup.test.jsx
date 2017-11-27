/* global jest */
import React from 'react';
import { mount } from 'enzyme';
import { NewGroup } from '../../components/dashBoard/NewGroup';
import mockData from '../__mocks__/componentMockData';

describe('NewGroup component', () => {
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
    props = mockData.newGroupsProps;
  });

  it('should always render a div', () => {
    const component = mountNewGroup().find('div');
    expect(component.length).toBeGreaterThan(0);
  });

  it('should render a form', () => {
    const component = mountNewGroup().find('form');
    expect(component.length).toBe(1);
  });

  it('should render submit and cancel buttons', () => {
    const component = mountNewGroup().find('button');
    expect(component.length).toBe(2);
  });

  it('should render an input field to accept the groupName', () => {
    const component = mountNewGroup().find('input');
    expect(component.length).toBe(1);
  });

  it('should not render anything when create is false', () => {
    props = mockData.newGroupsProps2;
    const component = mount(
      <NewGroup {...props} />
    );
    expect(component.length).toBe(1);
  });

  it('should contain an onChange method', () => {
    const component = mountNewGroup();
    const event = mockData.newGroupsEvent;
    const onChangeSpy = jest.spyOn(component.instance(), 'onChange');
    component.instance().onChange(event);
    expect(onChangeSpy).toHaveBeenCalled();
  });

  it('should contain an onCreateGroup method', () => {
    const component = mountNewGroup();
    const event = mockData.messageBoardEvent3;
    component.setState(mockData.newGroupsSetState);
    const onCreateGroupSpy = jest.spyOn(component.instance(), 'onCreateGroup');
    component.instance().onCreateGroup(event);
    expect(onCreateGroupSpy).toHaveBeenCalled();
  });

  it('should contain an onCancelCreate method', () => {
    const component = mountNewGroup();
    const event = mockData.messageBoardEvent3;
    const onCancelCreateSpy = jest.spyOn(component.instance(), 'onCancelCreate');
    component.instance().onCancelCreate(event);
    expect(onCancelCreateSpy).toHaveBeenCalled();
  });
});

