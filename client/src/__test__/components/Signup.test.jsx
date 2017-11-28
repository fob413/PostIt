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

describe('Signup component', () => {
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

  it('should always render a div', () => {
    const component = mountSignup().find('div');
    expect(component.length).toBeGreaterThan(0);
  });

  it('should render a form', () => {
    const component = mountSignup().find('form');
    expect(component.length).toBe(1);
  });

  it('should render a signup form with the inputs required', () => {
    const component = mountSignup().find('input');
    expect(component.length).toBe(5);
  });

  it('should render a form submit button ', () => {
    const component = mountSignup().find('button');
    expect(component.length).toBe(1);
  });

  it('should render a link to signin page', () => {
    const component = mountSignup().find('Link');
    expect(component.length).toBe(1);
  });

  it('should render the logo', () => {
    const component = mountSignup().find('img');
    expect(component.length).toBe(1);
  });

  it('should render a link to Signin page', () => {
    const component = mountSignup();
    expect(component.find(Link)).toHaveLength(1);
  });

  it('should contain a componentDidMount method', () => {
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

  it('should contain a componentWillReceiveProps method', () => {
    const component = mountSignup();
    const componentWillReceivePropsSpy = jest.spyOn(
      component.instance(), 'componentWillReceiveProps'
    );
    const nextProps = mockData.signupNextProps;
    component.instance().componentWillReceiveProps(nextProps);
    expect(componentWillReceivePropsSpy).toHaveBeenCalled();
  });

  it('should render the connected component', () => {
    const component = shallow(<ConnectedSignup {...props} store={store} />);
    expect(component.length).toBe(1);
  });

  it('should contain onChange method', () => {
    const component = mountSignup();
    const event = mockData.signupEvent;
    const onChangeSpy = jest.spyOn(component.instance(), 'onChange');
    component.instance().onChange(event);
    expect(onChangeSpy).toHaveBeenCalled();
  });

  it('should contain handleSubmit method', () => {
    // simulate when there's no data in state
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

    component.setState(mockData.signupSetState);

    component.instance().handleSubmit(event);
    expect(handleSubmitSpy).toHaveBeenCalled();
    expect(component.instance().state.userName).toBe('funsho');
  });
});
