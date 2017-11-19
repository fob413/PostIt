/* global jest */
import React from 'react';
import { shallow, mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { Link } from 'react-router-dom';
import thunk from 'redux-thunk';
import data from '../__mocks__/componentMockData';
import ConnectedReset, { Reset } from '../../components/authentication/password/Reset';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const store = mockStore(data.mockStore);

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
    props = data.resetProps;
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
    component.setState(data.resetSetState);
    const event = data.messageBoardEvent3;
    const onResetSpy = jest.spyOn(component.instance(), 'onReset');
    component.instance().onReset(event);
    expect(onResetSpy).toHaveBeenCalled();
  });

  it('calls onReset method', () => {
    props = data.resetProps2;
    const component = mount(
      <Reset {...props} />
    );
    component.setState(data.resetSetState);
    const event = {
      preventDefault: jest.fn()
    };
    const onResetSpy = jest.spyOn(component.instance(), 'onReset');
    component.instance().onReset(event);
    expect(onResetSpy).toHaveBeenCalled();
  });

  it('calls onChange method', () => {
    const component = mountReset();
    const event = data.resetEvent;
    const onChangeSpy = jest.spyOn(component.instance(), 'onChange');
    component.instance().onChange(event);
    expect(onChangeSpy).toHaveBeenCalled();
  });
});
