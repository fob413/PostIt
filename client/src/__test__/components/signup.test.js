/* global jest */
import React from 'react';
import { shallow } from 'enzyme';
import { Footer } from '../../components/footer/footer';

describe('Signup ', () => {
  it('should render correctly', () => {
    const props = {
      auth: {
        isLoggedin: false
      }
    };
    const tree = shallow(<Footer {...props} />);
    expect(tree.node.type).toEqual('div');
  });
});
