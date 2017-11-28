/* global jest */
import React from 'react';
import { shallow, mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { Link } from 'react-router-dom';
import thunk from 'redux-thunk';
import mockData from '../__mocks__/componentMockData';
import ConnectedSignin, { Signin } from '../../components/authentication/Signin';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const store = mockStore({
  auth: { isLoggedin: false }
});

describe('Signin component', () => {
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
    props = mockData.signinProps;
  });

  it('should always render a div', () => {
    const componentDiv = mountSignin().find('div');
    expect(componentDiv.length).toBeGreaterThan(0);
  });

  it('should always render 2 links', () => {
    const wrapper = mountSignin();
    expect(wrapper.find(Link)).toHaveLength(2);
  });

  it('should always render signin form', () => {
    const component = mountSignin().find('form');
    expect(component.length).toBe(1);
  });

  it('shoul dalways render a sigin form with the inputs required', () => {
    const component = mountSignin().find('input');
    expect(component.length).toBe(2);
  });

  it('should always render a form submit button ', () => {
    const component = mountSignin().find('button');
    expect(component.length).toBe(1);
  });

  it('should alwyas render the logo', () => {
    const component = mountSignin().find('img');
    expect(component.length).toBe(1);
  });

  it('should contain a componentDidMount method', () => {
    props = mockData.signinProps2;
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

  it('should contain the componentWillReceiveProps method', () => {
    const wrapper = mountSignin();
    const componentWillReceivePropsSpy = jest.spyOn(
      wrapper.instance(), 'componentWillReceiveProps'
    );
    const nextProps = mockData.signinNextProps;
    wrapper.instance().componentWillReceiveProps(nextProps);
    expect(componentWillReceivePropsSpy).toHaveBeenCalled();
  });

  it('should render the connected component', () => {
    const component = shallow(<ConnectedSignin {...props} store={store} />);
    expect(component.length).toBe(1);
  });

  it('should contain an onChange method', () => {
    const component = mountSignin();
    const event = mockData.signinEvent;
    const onChangeSpy = jest.spyOn(component.instance(), 'onChange');
    component.instance().onChange(event);
    expect(onChangeSpy).toHaveBeenCalledTimes(1);
  });

  it('should contain an handleSignin method', () => {
    props = mockData.signinProps;
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

    component.setState(mockData.signupSetState);
    const event = mockData.messageBoardEvent3;
    const handleSignInSpy = jest.spyOn(component.instance(), 'handleSignIn');
    component.instance().handleSignIn(event);
    expect(handleSignInSpy).toHaveBeenCalled();
  });
});
