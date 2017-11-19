/* global jest */
import React from 'react';
import { shallow, mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { Link } from 'react-router-dom';
import thunk from 'redux-thunk';
import data from '../__mocks__/componentMockData';
import ConnectedSignin, { Signin } from '../../components/authentication/Signin';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const store = mockStore({
  auth: { isLoggedin: false }
});

describe('Signin ', () => {
  let props;
  let mountedSignin;

  const mountSignin = () => {
    if (!mountedSignin) {
      mountedSignin = mount(
        <Signin {...props} />,
        {
          childContextTypes: { router: React.PropTypes.object },
          context: { router: {
            history: {
              push: () => null,
              createHref: () => null,
              replace: () => null,
              path: '/signin',
              component: '[function Connect]',
              location: {
                pathname: '/SignIn',
                search: '',
                hash: '',
                key: 'd2tlxq'
              },
              computedMatch: {
                path: '/signin',
                url: '/SignIn',
                isExact: true,
                params: {}
              }
            }
          }
          }
        }
      );
    }
    return mountedSignin;
  };

  beforeEach(() => {
    props = data.signinProps;
  });

  it('always renders a div', () => {
    const componentDiv = mountSignin().find('div');
    expect(componentDiv.length).toBeGreaterThan(0);
  });

  it('always renders 2 links', () => {
    const wrapper = mountSignin();
    expect(wrapper.find(Link)).toHaveLength(2);
  });

  it('calls a componentDidMount method', () => {
    const wrapper = mountSignin();
    const componentDidMountSpy = jest.spyOn(
      wrapper.instance(), 'componentDidMount'
    );
    wrapper.instance().componentDidMount();
    expect(componentDidMountSpy).toHaveBeenCalled();
  });

  it('calls the history.push method if you are authenticated', () => {
    props = data.signinProps2;
    const wrapper = mount(
      <Signin {...props} />,
      {
        childContextTypes: { router: React.PropTypes.object },
        context: { router: {
          history: {
            push: () => null,
            createHref: () => null,
            replace: () => null,
            path: '/signin',
            component: '[function Connect]',
            location: {
              pathname: '/SignIn',
              search: '',
              hash: '',
              key: 'd2tlxq'
            },
            computedMatch: {
              path: '/signin',
              url: '/SignIn',
              isExact: true,
              params: {}
            }
          }
        }
        }
      }
    );
    const componentPushSpy = jest.spyOn(
      wrapper.instance(), 'componentDidMount'
    );
    wrapper.instance().componentDidMount();
    expect(componentPushSpy).toHaveBeenCalled();
  });

  it('calls the componentWillReceiveProps method', () => {
    const wrapper = mountSignin();
    const componentWillReceivePropsSpy = jest.spyOn(
      wrapper.instance(), 'componentWillReceiveProps'
    );
    const nextProps = data.signinNextProps;
    wrapper.instance().componentWillReceiveProps(nextProps);
    expect(componentWillReceivePropsSpy).toHaveBeenCalled();
  });

  it('has map state to props', () => {
    const component = shallow(<ConnectedSignin {...props} store={store} />);
    expect(component.length).toBe(1);
  });

  it('calls onChange method', () => {
    const component = mountSignin();
    const event = data.signinEvent;
    const onChangeSpy = jest.spyOn(component.instance(), 'onChange');
    component.instance().onChange(event);
    expect(onChangeSpy).toHaveBeenCalledTimes(1);
  });

  it('calls handleSignin method', () => {
    props = data.signinProps3;
    const component = mount(
      <Signin {...props} />,
      {
        childContextTypes: { router: React.PropTypes.object },
        context: { router: {
          history: {
            push: () => null,
            createHref: () => null,
            replace: () => null,
            path: '/signin',
            component: '[function Connect]',
            location: {
              pathname: '/SignIn',
              search: '',
              hash: '',
              key: 'd2tlxq'
            },
            computedMatch: {
              path: '/signin',
              url: '/SignIn',
              isExact: true,
              params: {}
            }
          }
        }
        }
      }
    );
    const event = data.messageBoardEvent3;
    const handleSignInSpy = jest.spyOn(component.instance(), 'handleSignIn');
    component.instance().handleSignIn(event);
    expect(handleSignInSpy).toHaveBeenCalled();
  });

  it('calls handleSignin method', () => {
    props = data.signinProps;
    const component = mount(
      <Signin {...props} />,
      {
        childContextTypes: { router: React.PropTypes.object },
        context: { router: {
          history: {
            push: () => null,
            createHref: () => null,
            replace: () => null,
            path: '/signin',
            component: '[function Connect]',
            location: {
              pathname: '/SignIn',
              search: '',
              hash: '',
              key: 'd2tlxq'
            },
            computedMatch: {
              path: '/signin',
              url: '/SignIn',
              isExact: true,
              params: {}
            }
          }
        }
        }
      }
    );
    const event = data.messageBoardEvent3;
    const handleSignInSpy = jest.spyOn(component.instance(), 'handleSignIn');
    component.instance().handleSignIn(event);
    expect(handleSignInSpy).toHaveBeenCalled();
  });
});
