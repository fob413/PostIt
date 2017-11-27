import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import mockLocalStorage from '../../__mocks__/mockLocalStorage';
import mockData from '../../__mocks__/mockData';
import {
  loadGroups,
  createNewGroup,
  unloadGroups
} from '../../../actions/groupsActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
window.localStorage = mockLocalStorage;

const { groups } = mockData.actions;

const initialState = {
  Groups: []
};

describe('Load Groups action ', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());
  const store = mockStore(initialState);

  it('should contain a load group function', () => {
    expect(typeof (loadGroups())).toBe('function');
  });

  it('should dispatch LOAD_GROUPS on successful api call', (done) => {
    moxios.stubRequest('api/v1/group/list', {
      status: 200,
      response: groups.loadGroupsResponse
    });

    const expectedActions = groups.loadGroupsActions;

    store.dispatch(loadGroups()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });
});

describe('Unload groups action ', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());
  const store = mockStore(initialState);

  it('should contain an unload group function', () => {
    expect(typeof (unloadGroups())).toBe('function');
  });

  it('should dispatch unload groups when called', (done) => {
    const expectedActions = groups.unloadGroupsAction;

    store.dispatch(unloadGroups());
    expect(store.getActions()).toEqual(expectedActions);
    done();
  });
});

describe('Create new group action ', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());
  const store = mockStore(initialState);

  it('should contain a create group function', () => {
    expect(typeof (createNewGroup())).toBe('function');
  });

  it('should return true when successful', (done) => {
    moxios.stubRequest('api/v1/group', {
      status: 201,
      response: groups.createGroupResponse
    });

    const expectedSuccess = true;
    store.dispatch(createNewGroup()).then((res) => {
      expect(res.data.success).toEqual(expectedSuccess);
    });
    done();
  });
});
