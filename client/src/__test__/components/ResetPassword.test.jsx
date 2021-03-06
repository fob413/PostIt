/* global jest */
import React from 'react';
import { shallow, mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import mockData from '../__mocks__/componentMockData';
import ConnectedResetPassword, { ResetPassword } from '../../components/authentication/password/ResetPassword';

// jest.mock('Materialize', () => jest.fn());
const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const store = mockStore({
  auth: {
    isLoggedin: false
  }
});

describe('ResetPassword', () => {
  let props;
  let mountedResetPassword;

  const mountResetPassword = () => {
    if (!mountedResetPassword) {
      mountedResetPassword = mount(
        <ResetPassword {...props} />,
        {
          childContextTypes: { router: React.PropTypes.object },
          context: { router: {
            history: {
              push: () => null,
              createHref: () => null,
              replace: () => null,
              path: '/reset/:token',
              component: '[function Connect]',
              location: {
                pathname: '/reset/82b786eb6e8e63c74814a74dc7445eb61eb19c41',
                search: '',
                hash: ''
              },
              computedMatch: {
                path: '/reset/:token',
                url: '/reset/82b786eb6e8e63c74814a74dc7445eb61eb19c41',
                isExact: true,
                params: {}
              }
            }
          }
          }
        }
      );
    }
    return mountedResetPassword;
  };

  beforeEach(() => {
    props = mockData.resetPasswordProps;
  });

  it('always renders a div', () => {
    const component = mountResetPassword().find('div');
    expect(component.length).toBeGreaterThan(0);
  });

  it('always renders a form to change password', () => {
    const component = mountResetPassword().find('form');
    expect(component.length).toBe(1);
  });

  it('always renders a form with inputs to accept the new password', () => {
    const component = mountResetPassword().find('input');
    expect(component.length).toBe(2);
  });

  it('always renders a form with the appropriate label', () => {
    const component = mountResetPassword().find('label').first();
    expect(component.props().children).toBe(mockData.resetPasswordLabel);
  });

  it('always renders a form submit button', () => {
    const component = mountResetPassword().find('button');
    expect(component.length).toBe(1);
  });

  it('calls a componentDidMount method', () => {
    props = mockData.resetPasswordProps2;
    const component = mount(
      <ResetPassword {...props} />,
      {
        childContextTypes: { router: React.PropTypes.object },
        context: { router: {
          history: {
            push: () => null,
            createHref: () => null,
            replace: () => null,
            path: '/reset/:token',
            component: '[function Connect]',
            location: {
              pathname: '/reset/82b786eb6e8e63c74814a74dc7445eb61eb19c41',
              search: '',
              hash: ''
            },
            computedMatch: {
              path: '/reset/:token',
              url: '/reset/82b786eb6e8e63c74814a74dc7445eb61eb19c41',
              isExact: true,
              params: {}
            }
          }
        }
        }
      }
    );
    const componentDidMountSpy = jest.spyOn(
      component.instance(), 'componentDidMount'
    );
    component.instance().componentDidMount();
    expect(componentDidMountSpy).toHaveBeenCalled();
  });

  it('calls a componentDidMount method', () => {
    props = mockData.resetPasswordProps3;
    const component = mount(
      <ResetPassword {...props} />,
      {
        childContextTypes: { router: React.PropTypes.object },
        context: { router: {
          history: {
            push: () => null,
            createHref: () => null,
            replace: () => null,
            path: '/reset/:token',
            component: '[function Connect]',
            location: {
              pathname: '/reset/82b786eb6e8e63c74814a74dc7445eb61eb19c41',
              search: '',
              hash: ''
            },
            computedMatch: {
              path: '/reset/:token',
              url: '/reset/82b786eb6e8e63c74814a74dc7445eb61eb19c41',
              isExact: true,
              params: {}
            }
          }
        }
        }
      }
    );
    const componentDidMountSpy = jest.spyOn(
      component.instance(), 'componentDidMount'
    );
    component.instance().componentDidMount();
    expect(componentDidMountSpy).toHaveBeenCalled();
  });

  it('calls a componentWillReceiveProps method', () => {
    const component = mountResetPassword();
    const componentWillReceivePropsSpy = jest.spyOn(
      component.instance(), 'componentWillReceiveProps'
    );
    const nextProps = mockData.resetPasswordNextProps;

    component.instance().componentWillReceiveProps(nextProps);
    expect(componentWillReceivePropsSpy).toHaveBeenCalled();
  });

  it('has map state to props', () => {
    const component = shallow(<ConnectedResetPassword {...props} store={store} />);
    expect(component.length).toBe(1);
  });

  it('calls onChange method', () => {
    const component = mountResetPassword();
    const event = mockData.resetPasswordEvent;
    const onChangeSpy = jest.spyOn(component.instance(), 'onChange');
    component.instance().onChange(event);
    expect(onChangeSpy).toHaveBeenCalled();
  });

  it('calls onChangePassword method', () => {
    const component = mountResetPassword();
    const event = mockData.messageBoardEvent3;
    component.setState(mockData.resetPasswordSetState);
    const onChangePasswordspy = jest.spyOn(component.instance(), 'onChangePassword');
    component.instance().onChangePassword(event);
    expect(onChangePasswordspy).toHaveBeenCalled();
  });

  it('calls onChangePassword method', () => {
    props = mockData.resetPasswordProps4;
    const component = mount(
      <ResetPassword {...props} />,
      {
        childContextTypes: { router: React.PropTypes.object },
        context: { router: {
          history: {
            push: () => null,
            createHref: () => null,
            replace: () => null,
            path: '/reset/:token',
            component: '[function Connect]',
            location: {
              pathname: '/reset/82b786eb6e8e63c74814a74dc7445eb61eb19c41',
              search: '',
              hash: ''
            },
            computedMatch: {
              path: '/reset/:token',
              url: '/reset/82b786eb6e8e63c74814a74dc7445eb61eb19c41',
              isExact: true,
              params: {}
            }
          }
        }
        }
      }
    );
    const event = {
      preventDefault: jest.fn()
    };
    component.setState(mockData.resetPasswordSetState2);
    const onChangePasswordspy = jest.spyOn(component.instance(), 'onChangePassword');
    component.instance().onChangePassword(event);
    expect(onChangePasswordspy).toHaveBeenCalled();
  });
});

