import React from 'react';
import { mount } from 'enzyme';
import { Link } from 'react-router-dom';
import { PageNotFound } from '../../components/PageNotFound';
import mockData from '../__mocks__/componentMockData';

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
    props = mockData.pageNotFoundProps;
  });

  it('always renders a div', () => {
    const component = mountPageNotFound().find('div');
    expect(component.length).toBeGreaterThan(0);
  });

  it('always renders the logo', () => {
    const component = mountPageNotFound().find('img');
    expect(component.length).toBe(1);
  });

  it('always renders a link to the home page', () => {
    const component = mountPageNotFound().find(Link);
    expect(component.length).toBe(1);
  });
});

