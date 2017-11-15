import React from 'react';
import { mount } from 'enzyme';
import { Message } from '../../components/messagePage/Message';
import data from '../__mocks__/componentMockData';

describe('Message ', () => {
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
    props = data.messageProps;
  });

  it('always renders a div', () => {
    const component = mountMessage().find('div');
    expect(component.length).toBeGreaterThan(0);
  });

  it('always renders a div when there is not message content', () => {
    props = {};
    const component = mount(
      <Message {...props} />
    ).find('div');
    expect(component.length).toBeGreaterThan(0);
  });
});

