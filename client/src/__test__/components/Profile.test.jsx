/* global jest */
import React from 'react';
import { shallow, mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ConnectedProfile, { Profile } from '../../components/navbar/Profile';
import mockData from '../__mocks__/componentMockData';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const store = mockStore({
  auth: { isLoggedin: false }
});

describe('Profile component', () => {
  let props;
  let mountedProfile;

  const mountProfile = () => {
    if (!mountedProfile) {
      mountedProfile = mount(
        <Profile {...props} />,
      );
    }
    return mountedProfile;
  };

  beforeEach(() => {
    props = mockData.profileProps;
  });

  it('should always render a div', () => {
    const component = mountProfile().find('div');
    expect(component.length).toBeGreaterThan(0);
  });

  it('should always render the user profile table', () => {
    const component = mountProfile().find('ul');
    expect(component.length).toBe(1);
  });

  it('should always render the userName, email and telephone fields', () => {
    const component = mountProfile().find('li');
    expect(component.length).toBe(3);
  });

  it('should render the connected component', () => {
    const component = shallow(<ConnectedProfile {...props} store={store} />);
    expect(component.length).toBe(1);
  });

  it('should contain a componentWillMount method', () => {
    props = mockData.profileProps2;

    const component = mount(
      <Profile {...props} />
    );

    const componentWillMountSpy = jest.spyOn(
      component.instance(), 'componentWillMount'
    );
    component.instance().componentWillMount();
    expect(componentWillMountSpy).toHaveBeenCalled();
  });

  it('should contain a componentWillReceiveProps method', () => {
    props = mockData.profileProps;

    const component = mount(
      <Profile {...props} />
    );

    const nextProps = mockData.profileNextProps;

    const componentWillReceivePropsSpy = jest.spyOn(
      component.instance(), 'componentWillReceiveProps'
    );
    component.instance().componentWillReceiveProps(nextProps);
    expect(componentWillReceivePropsSpy).toHaveBeenCalled();
  });
});
