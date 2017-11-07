import React from 'react';
import { mount } from 'enzyme';
import { DisplayMessage } from '../../components/messagePage/DisplayMessage';

describe('DisplayMessage ', () => {
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
    props = {
      author: 'user',
      content: 'Hello World'
    };
  });

  it('always renders li', () => {
    const component = mountDisplayMessage().find('li');
    expect(component.length).toBeGreaterThan(0);
  });
});

