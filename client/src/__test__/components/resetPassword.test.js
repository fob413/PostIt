/* global jest */
import React from 'react';
import { shallow, mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ConnectedResetPassword, { ResetPassword } from '../../components/index/password/ResetPassword';

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
    props = {
      auth: {
        isLoggedIn: false
      },
      history: { push: jest.fn() },
      router: {
        history: { push: jest.fn() },
      },
      authToken: jest.fn(() => Promise.resolve()),
      match: {
        params: {
          token: '82b786eb6e8e63c74814a74dc7445eb61eb19c41'
        }
      },
      resetPassword: jest.fn(() => Promise.resolve({
        res: {
          success: true
        }
      }))
    };
  });

  it('always renders a div', () => {
    const component = mountResetPassword().find('div');
    expect(component.length).toBeGreaterThan(0);
  });

  it('calls a componentDidMount method', () => {
    props = {
      auth: {
        isLoggedIn: true
      },
      history: { push: jest.fn() },
      router: {
        history: { push: jest.fn() },
      },
      authToken: jest.fn(() => Promise.resolve({
        res: {
          UserName: 'user'
        }
      })),
      match: {
        params: {
          token: '82b786eb6e8e63c74814a74dc7445eb61eb19c41'
        }
      },
      resetPassword: jest.fn(() => Promise.resolve())
    };
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
    props = {
      auth: {
        isLoggedIn: true
      },
      history: { push: jest.fn() },
      router: {
        history: { push: jest.fn() },
      },
      authToken: jest.fn(() => Promise.reject()),
      match: {
        params: {
          token: '82b786eb6e8e63c74814a74dc7445eb61eb19c41'
        }
      },
      resetPassword: jest.fn(() => Promise.resolve())
    };
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
    const nextProps = {
      auth: {
        isLoggedIn: true
      }
    };

    component.instance().componentWillReceiveProps(nextProps);
    expect(componentWillReceivePropsSpy).toHaveBeenCalled();
  });

  it('has map state to props', () => {
    const component = shallow(<ConnectedResetPassword {...props} store={store} />);
    expect(component.length).toBe(1);
  });

  it('calls onChange method', () => {
    const component = mountResetPassword();
    const event = {
      target: {
        newPassword: 'asdf;lkj'
      }
    };
    const onChangeSpy = jest.spyOn(component.instance(), 'onChange');
    component.instance().onChange(event);
    expect(onChangeSpy).toHaveBeenCalled();
  });

  it('calls onChangePassword method', () => {
    const component = mountResetPassword();
    const event = {
      preventDefault: jest.fn()
    };
    component.setState({
      newPassword: 'asdf;lkj',
      confirmPassword: 'asdf;lkj'
    });
    const onChangePasswordspy = jest.spyOn(component.instance(), 'onChangePassword');
    component.instance().onChangePassword(event);
    expect(onChangePasswordspy).toHaveBeenCalled();
  });

  it('calls onChangePassword method', () => {
    props = {
      auth: {
        isLoggedIn: false
      },
      history: { push: jest.fn() },
      router: {
        history: { push: jest.fn() },
      },
      authToken: jest.fn(() => Promise.resolve()),
      match: {
        params: {
          token: '82b786eb6e8e63c74814a74dc7445eb61eb19c41'
        }
      },
      resetPassword: jest.fn(() => Promise.reject())
    };
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
    component.setState({
      newPassword: 'asdf;lkj',
      confirmPassword: 'asdf;lk'
    });
    const onChangePasswordspy = jest.spyOn(component.instance(), 'onChangePassword');
    component.instance().onChangePassword(event);
    expect(onChangePasswordspy).toHaveBeenCalled();
  });
});

