import React from 'react';
import { mount } from 'enzyme';
import { DisplayMessage } from '../../components/messageBoard/DisplayMessage';
import mockData from '../__mocks__/componentMockData';

describe('DisplayMessage component ', () => {
  let props;
  let mountedDisplayMessage;

  const mountDisplayMessage = () => {
    if (!mountedDisplayMessage) {
      mountedDisplayMessage = mount(
        <DisplayMessage {...props} />
      );
    }
    return mountedDisplayMessage;
  };

  beforeEach(() => {
    props = mockData.displayMessageProps;
  });

  it('should always render an li element', () => {
    const component = mountDisplayMessage().find('li');
    expect(component.length).toBeGreaterThan(0);
  });

  it('should always render a message icon', () => {
    const component = mountDisplayMessage().find('i');
    expect(component.props().children).toBe(mockData.displayMessageIcon);
  });
});

