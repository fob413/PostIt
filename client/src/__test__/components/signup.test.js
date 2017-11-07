/* global jest */
import React from 'react';
import { shallow, mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { Link } from 'react-router-dom';
import thunk from 'redux-thunk';
import ConnectedSignup, { SignUp } from '../../components/index/signup/signup';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const store = mockStore({
  auth: { isLoggedin: false }
});

describe('Signup ', () => {
  let props;
  let mountedSignup;

  const mountSignup = () => {
    if (!mountedSignup) {
      mountedSignup = mount(
        <SignUp {...props} />,
        {
          childContextTypes: { router: React.PropTypes.object },
          context: { router: {
            history: {
              push: () => null,
              createHref: () => null,
              replace: () => null,
              exact: true,
              path: '/',
              component: '[function Connect]',
              location: {
                pathname: '/',
                search: '',
                hash: '',
                key: 'm6zrfw'
              },
              computedMatch: {
                path: '/',
                url: '/',
                isExact: true,
                params: {}
              }
            }
          }
          }
        }
      );
    }
    return mountedSignup;
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
      signUserUp: jest.fn(() => Promise.resolve())
    };
  });

  it('always rendrs a div', () => {
    const component = mountSignup().find('div');
    expect(component.length).toBeGreaterThan(0);
  });

  it('mounts', () => {
    const component = mountSignup();
    expect(component.find(Link)).toHaveLength(1);
  });

  it('calls history.push method if you are authenticated', () => {
    props = {
      auth: {
        isLoggedIn: true
      },
      history: { push: jest.fn() },
      router: {
        history: { push: jest.fn() },
      },
      signUserUp: jest.fn(() => Promise.resolve())
    };
    const component = mount(
      <SignUp {...props} />,
      {
        childContextTypes: { router: React.PropTypes.object },
        context: { router: {
          history: {
            push: () => null,
            createHref: () => null,
            replace: () => null,
            exact: true,
            path: '/',
            component: '[function Connect]',
            location: {
              pathname: '/',
              search: '',
              hash: '',
              key: 'm6zrfw'
            },
            computedMatch: {
              path: '/',
              url: '/',
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

  it('calls the componentWillReceiveProps method', () => {
    const component = mountSignup();
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
    const component = shallow(<ConnectedSignup {...props} store={store} />);
    expect(component.length).toBe(1);
  });

  it('calls onChange method', () => {
    const component = mountSignup();
    const event = {
      target: { userName: 'FOB' }
    };
    const onChangeSpy = jest.spyOn(component.instance(), 'onChange');
    component.instance().onChange(event);
    expect(onChangeSpy).toHaveBeenCalled();
  });

  it('calls handleSubmit method', () => {
    props = {
      auth: {
        isLoggedIn: false
      },
      history: { push: jest.fn() },
      router: {
        history: { push: jest.fn() },
      },
      signUserUp: jest.fn(() => Promise.resolve({
        res: {}
      }))
    };
    const component = mount(
      <SignUp {...props} />,
      {
        childContextTypes: { router: React.PropTypes.object },
        context: { router: {
          history: {
            push: () => null,
            createHref: () => null,
            replace: () => null,
            exact: true,
            path: '/',
            component: '[function Connect]',
            location: {
              pathname: '/',
              search: '',
              hash: '',
              key: 'm6zrfw'
            },
            computedMatch: {
              path: '/',
              url: '/',
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
    const handleSubmitSpy = jest.spyOn(
      component.instance(), 'handleSubmit'
    );
    component.instance().handleSubmit(event);
    expect(handleSubmitSpy).toHaveBeenCalled();
  });

  it('calls handleSubmit method', () => {
    props = {
      auth: {
        isLoggedIn: false
      },
      history: { push: jest.fn() },
      router: {
        history: { push: jest.fn() },
      },
      signUserUp: jest.fn(() => Promise.resolve({
        res: {}
      }))
    };
    const component = mount(
      <SignUp {...props} />,
      {
        childContextTypes: { router: React.PropTypes.object },
        context: { router: {
          history: {
            push: () => null,
            createHref: () => null,
            replace: () => null,
            exact: true,
            path: '/',
            component: '[function Connect]',
            location: {
              pathname: '/',
              search: '',
              hash: '',
              key: 'm6zrfw'
            },
            computedMatch: {
              path: '/',
              url: '/',
              isExact: true,
              params: {}
            }
          }
        }
        }
      }
    );

    component.setState({
      password: 'asdf;lkj',
      confirmPassword: 'asdf;lkj',
      telephone: '1234567890'
    });

    const event = {
      preventDefault: jest.fn()
    };
    const handleSubmitSpy = jest.spyOn(
      component.instance(), 'handleSubmit'
    );
    component.instance().handleSubmit(event);
    expect(handleSubmitSpy).toHaveBeenCalled();
  });

  it('calls handleSubmit method', () => {
    props = {
      auth: {
        isLoggedIn: false
      },
      history: { push: jest.fn() },
      router: {
        history: { push: jest.fn() },
      },
      signUserUp: jest.fn(() => Promise.resolve({
        res: {}
      }))
    };
    const component = mount(
      <SignUp {...props} />,
      {
        childContextTypes: { router: React.PropTypes.object },
        context: { router: {
          history: {
            push: () => null,
            createHref: () => null,
            replace: () => null,
            exact: true,
            path: '/',
            component: '[function Connect]',
            location: {
              pathname: '/',
              search: '',
              hash: '',
              key: 'm6zrfw'
            },
            computedMatch: {
              path: '/',
              url: '/',
              isExact: true,
              params: {}
            }
          }
        }
        }
      }
    );

    component.setState({
      password: 'asdf;lkj',
      confirmPassword: 'asdf;lkj',
      telephone: 'asdfghjkl;'
    });

    const event = {
      preventDefault: jest.fn()
    };
    const handleSubmitSpy = jest.spyOn(
      component.instance(), 'handleSubmit'
    );
    component.instance().handleSubmit(event);
    expect(handleSubmitSpy).toHaveBeenCalled();
  });

  it('calls handleSubmit method', () => {
    props = {
      auth: {
        isLoggedIn: false
      },
      history: { push: jest.fn() },
      router: {
        history: { push: jest.fn() },
      },
      signUserUp: jest.fn(() => Promise.resolve({
        res: {}
      }))
    };
    const component = mount(
      <SignUp {...props} />,
      {
        childContextTypes: { router: React.PropTypes.object },
        context: { router: {
          history: {
            push: () => null,
            createHref: () => null,
            replace: () => null,
            exact: true,
            path: '/',
            component: '[function Connect]',
            location: {
              pathname: '/',
              search: '',
              hash: '',
              key: 'm6zrfw'
            },
            computedMatch: {
              path: '/',
              url: '/',
              isExact: true,
              params: {}
            }
          }
        }
        }
      }
    );

    component.setState({
      password: 'asdf;lkj',
      confirmPassword: 'asdf;lk',
      telephone: '1234567890'
    });

    const event = {
      preventDefault: jest.fn()
    };
    const handleSubmitSpy = jest.spyOn(
      component.instance(), 'handleSubmit'
    );
    component.instance().handleSubmit(event);
    expect(handleSubmitSpy).toHaveBeenCalled();
  });
});
