/* global jest */
import React from 'react';
import { shallow, mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { Link } from 'react-router-dom';
import thunk from 'redux-thunk';
import mockData from '../__mocks__/componentMockData';
import ConnectedReset, { Reset } from '../../components/authentication/password/Reset';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const store = mockStore(mockData.mockStore);

describe('Reset ', () => {
  let props;
  let mountedReset;

  const mountReset = () => {
    if (!mountedReset) {
      mountedReset = mount(
        <Reset {...props} />
      );
    }
    return mountedReset;
  };

  beforeEach(() => {
    props = mockData.resetProps;
  });

  it('always renders a div', () => {
    const component = mountReset().find('div');
    expect(component.length).toBeGreaterThan(0);
  });

  it('has map state to props', () => {
    const component = shallow(<Reset {...props} store={store} />);
    expect(component.length).toBe(1);
  });

  it('calls onReset method', () => {
    const component = mountReset();
    component.setState(mockData.resetSetState);
    const event = mockData.messageBoardEvent3;
    const onResetSpy = jest.spyOn(component.instance(), 'onReset');
    component.instance().onReset(event);
    expect(onResetSpy).toHaveBeenCalled();
  });

  it('calls onReset method', () => {
    props = mockData.resetProps2;
    const component = mount(
      <Reset {...props} />
    );
    component.setState(mockData.resetSetState);
    const event = {
      preventDefault: jest.fn()
    };
    const onResetSpy = jest.spyOn(component.instance(), 'onReset');
    component.instance().onReset(event);
    expect(onResetSpy).toHaveBeenCalled();
  });

  it('calls onChange method', () => {
    const component = mountReset();
    const event = mockData.resetEvent;
    const onChangeSpy = jest.spyOn(component.instance(), 'onChange');
    component.instance().onChange(event);
    expect(onChangeSpy).toHaveBeenCalled();
  });
});
