/* global jest */
import React from 'react';
import { shallow, mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { Link } from 'react-router-dom';
import thunk from 'redux-thunk';
import mockData from '../__mocks__/componentMockData';
import ConnectedSignup, { Signup } from '../../components/authentication/Signup';

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
        <Signup {...props} />,
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
    props = mockData.signupProps;
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
    props = mockData.signupProps2;
    const component = mount(
      <Signup {...props} />,
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
    const nextProps = mockData.signupNextProps;
    component.instance().componentWillReceiveProps(nextProps);
    expect(componentWillReceivePropsSpy).toHaveBeenCalled();
  });

  it('has map state to props', () => {
    const component = shallow(<ConnectedSignup {...props} store={store} />);
    expect(component.length).toBe(1);
  });

  it('calls onChange method', () => {
    const component = mountSignup();
    const event = mockData.signupEvent;
    const onChangeSpy = jest.spyOn(component.instance(), 'onChange');
    component.instance().onChange(event);
    expect(onChangeSpy).toHaveBeenCalled();
  });

  it('calls handleSubmit method', () => {
    props = mockData.signupProps;
    const component = mount(
      <Signup {...props} />,
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
    props = mockData.signupProps;
    const component = mount(
      <Signup {...props} />,
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

    component.setState(mockData.signupSetState);

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
    props = mockData.signupProps;
    const component = mount(
      <Signup {...props} />,
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

    component.setState(mockData.signupSetState2);

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
    props = mockData.signupProps;
    const component = mount(
      <Signup {...props} />,
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

    component.setState(mockData.signupSetState3);

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
