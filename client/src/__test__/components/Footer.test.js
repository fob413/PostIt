/* global jest */
import React from 'react';
import { mount, shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ConnectedFooter, { Footer } from '../../components/footer/footer';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const store = mockStore({
  auth: { isLoggedin: false }
});

describe('Footer ', () => {
  let props;
  let mountedFooter;
  const footer = () => {
    if (!mountedFooter) {
      mountedFooter = mount(
        <Footer {...props} />
      );
    }
    return mountedFooter;
  };

  beforeEach(() => {
    props = {
      auth: undefined
    };
  });

  it('always renders a div', () => {
    props = {
      auth: {
        isLoggedin: true
      }
    };

    const divs = footer().find('div');
    expect(divs.length).toBeGreaterThan(0);
  });

  it('does not render anything if auth is false', () => {
    props = {
      auth: {
        isLoggedin: false
      }
    };

    const divs = footer().find('div');
    const wrappingDiv = divs.first();
    expect(wrappingDiv.children().length).toBeLessThan(1);
  });

  it('contains everything else that gets rendered', () => {
    props = {
      auth: {
        isLoggedin: true
      }
    };
    const divs = footer().find('div');
    const wrappingDiv = divs.first();
    expect(wrappingDiv.children()).toEqual(footer().children());
  });

  it('renders footer whens state.isAuth is true', () => {
    props = {
      auth: {
        isLoggedin: true
      }
    };
    const component = footer();
    component.setState({ isAuth: true });
    const wrappingDiv = component.first();
    expect(wrappingDiv.children()).toEqual(footer().children());
  });

  it('contains a componentWillReceiveProps Method', () => {
    const component = footer();
    const componentWillMountSpy = jest.spyOn(component.instance(), 'componentWillReceiveProps');
    const nextProps = {
      auth: {
        isLoggedin: true
      }
    };
    component.instance().componentWillReceiveProps(nextProps);
    expect(componentWillMountSpy).toHaveBeenCalledTimes(1);
  });

  it('has maps state to props', () => {
    const component = shallow(<ConnectedFooter {...props} store={store} />);
    expect(component.length).toBe(1);
  });
});
