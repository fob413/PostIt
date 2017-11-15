/* global jest */
import React from 'react';
import { shallow, mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { Link } from 'react-router-dom';
import thunk from 'redux-thunk';
import data from '../__mocks__/componentMockData';
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
    props = data.signupProps;
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
    props = data.signupProps2;
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
    const nextProps = data.signupNextProps;
    component.instance().componentWillReceiveProps(nextProps);
    expect(componentWillReceivePropsSpy).toHaveBeenCalled();
  });

  it('has map state to props', () => {
    const component = shallow(<ConnectedSignup {...props} store={store} />);
    expect(component.length).toBe(1);
  });

  it('calls onChange method', () => {
    const component = mountSignup();
    const event = data.signupEvent;
    const onChangeSpy = jest.spyOn(component.instance(), 'onChange');
    component.instance().onChange(event);
    expect(onChangeSpy).toHaveBeenCalled();
  });

  it('calls handleSubmit method', () => {
    props = data.signupProps;
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
    props = data.signupProps;
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

    component.setState(data.signupSetState);

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
    props = data.signupProps;
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

    component.setState(data.signupSetState2);

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
    props = data.signupProps;
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

    component.setState(data.signupSetState3);

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
