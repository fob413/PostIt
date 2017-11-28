import React from 'react';
import { mount } from 'enzyme';
import { Message } from '../../components/messageBoard/Message';
import mockData from '../__mocks__/componentMockData';

describe('Message component ', () => {
  let props;
  let mountedMessage;

  const mountMessage = () => {
    if (!mountedMessage) {
      mountedMessage = mount(
        <Message {...props} />
      );
    }
    return mountedMessage;
  };

  beforeEach(() => {
    props = mockData.messageProps;
  });

  it('should always render a div', () => {
    const component = mountMessage().find('div');
    expect(component.length).toBeGreaterThan(0);
  });

  it('should always render a div when there\'s not message content', () => {
    props = {};
    const component = mount(
      <Message {...props} />
    ).find('div');
    expect(component.length).toBeGreaterThan(0);
  });
});

