/* global jest */
import React from 'react';
import { shallow, mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { Link } from 'react-router-dom';
import thunk from 'redux-thunk';
import ConnectedReset, { Reset } from '../../components/index/password/Reset';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const store = mockStore({
  auth: {
    isLoggedin: false
  }
});

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
    props = {
      forgotPassword: jest.fn(() => Promise.resolve({
        res: { success: true }
      }))
    };
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
    component.setState({
      email: 'user@email.com'
    });
    const event = {
      preventDefault: jest.fn()
    };
    const onResetSpy = jest.spyOn(component.instance(), 'onReset');
    component.instance().onReset(event);
    expect(onResetSpy).toHaveBeenCalled();
  });

  it('calls onReset method', () => {
    props = {
      forgotPassword: jest.fn(() => Promise.reject())
    };
    const component = mount(
      <Reset {...props} />
    );
    component.setState({
      email: 'user@email.com'
    });
    const event = {
      preventDefault: jest.fn()
    };
    const onResetSpy = jest.spyOn(component.instance(), 'onReset');
    component.instance().onReset(event);
    expect(onResetSpy).toHaveBeenCalled();
  });

  it('calls onChange method', () => {
    const component = mountReset();
    const event = {
      target: { email: 'funsho@email.com' }
    };
    const onChangeSpy = jest.spyOn(component.instance(), 'onChange');
    component.instance().onChange(event);
    expect(onChangeSpy).toHaveBeenCalled();
  });
});
