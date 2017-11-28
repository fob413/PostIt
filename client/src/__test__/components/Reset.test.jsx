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

describe('Reset Component', () => {
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

  it('should always render a div', () => {
    const component = mountReset().find('div');
    expect(component.length).toBeGreaterThan(0);
  });

  it('should always render the logo', () => {
    const component = mountReset().find('img');
    expect(component.length).toBe(1);
  });

  it('should always render a form to collect the users email', () => {
    const component = mountReset().find('form');
    expect(component.length).toBe(1);
  });

  it('should always render an input box in the form', () => {
    const component = mountReset().find('input');
    expect(component.length).toBe(1);
  });

  it('should always render a form submit button', () => {
    const component = mountReset().find('button');
    expect(component.length).toBe(1);
  });

  it('should render the connected component', () => {
    const component = shallow(<ConnectedReset {...props} store={store} />);
    expect(component.length).toBe(1);
  });

  it('should contain an onReset method', () => {
    // simulate a resoloved api call
    const component = mountReset();
    component.setState(mockData.resetSetState);
    const event = mockData.messageBoardEvent3;
    const onResetSpy = jest.spyOn(component.instance(), 'onReset');
    component.instance().onReset(event);
    expect(onResetSpy).toHaveBeenCalled();
  });

  it('should contain an onReset method', () => {
    // simulates a failed api call
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

  it('should contain an onChange method', () => {
    const component = mountReset();
    const event = mockData.resetEvent;
    const onChangeSpy = jest.spyOn(component.instance(), 'onChange');
    component.instance().onChange(event);
    expect(onChangeSpy).toHaveBeenCalled();
  });
});
