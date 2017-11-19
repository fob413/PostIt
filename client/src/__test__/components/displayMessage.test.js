import React from 'react';
import { mount } from 'enzyme';
import { DisplayMessage } from '../../components/messageBoard/DisplayMessage';
import data from '../__mocks__/componentMockData';

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
    props = data.displayMessageProps;
  });

  it('always renders li', () => {
    const component = mountDisplayMessage().find('li');
    expect(component.length).toBeGreaterThan(0);
  });
});

