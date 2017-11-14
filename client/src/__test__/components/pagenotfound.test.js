import React from 'react';
import { mount } from 'enzyme';
import { Link } from 'react-router-dom';
import { PageNotFound } from '../../components/pagenotfound/Pagenotfound';

describe('PageNotFound ', () => {
  let props;
  let mountedPageNotFound;

  const mountPageNotFound = () => {
    if (!mountedPageNotFound) {
      mountedPageNotFound = mount(
        <PageNotFound {...props} />,
        {
          childContextTypes: { router: React.PropTypes.object },
          context: { router: {
            history: {
              push: () => null,
              createHref: () => null,
              replace: () => null,
              path: '/signin',
              component: '[function PageNotFound]',
              location: {
                pathname: '/dashboardd',
                search: '',
                hash: ''
              },
              computedMatch: {
                path: '/',
                url: '/',
                params: {},
                isExact: false
              }
            }
          }
          }
        }
      );
    }
    return mountedPageNotFound;
  };

  beforeEach(() => {
    props = {
      history: {
        push: jest.fn()
      }
    };
  });

  it('always renders a div', () => {
    const component = mountPageNotFound().find('div');
    expect(component.length).toBeGreaterThan(0);
  });
});
