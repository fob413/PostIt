import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import mockLocalStorage from '../../_mocks_/mockLocalStorage';
import {
  loadGroups,
  createNewGroup,
  unloadGroups
} from '../../../actions/groupsActions';
import {
  LOAD_GROUPS,
  UNLOAD_GROUPS
} from '../../../helpers/constants';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
window.localStorage = mockLocalStorage;

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
    moxios.stubRequest('api/group/list', {
      status: 200,
      response: {
        success: true,
        members: [
          {
            id: 1,
            groupName: 'Group One'
          },
          {
            id: 2,
            groupName: 'Group Two'
          }
        ]
      }
    });

    const expectedActions = [
      {
        type: LOAD_GROUPS,
        data: [
          {
            id: 1,
            groupName: 'Group One'
          },
          {
            id: 2,
            groupName: 'Group Two'
          }
        ]
      }
    ];

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
    const expectedActions = [
      {
        type: UNLOAD_GROUPS
      }
    ];

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
    moxios.stubRequest('api/group', {
      status: 201,
      response: {
        success: true,
        message: 'New group successfully created'
      }
    });

    const expectedSuccess = true;
    store.dispatch(createNewGroup()).then((res) => {
      expect(res.data.success).toEqual(expectedSuccess);
    });
    done();
  });

  // it('should return false when unsuccessful', (done) => {
  //   moxios.stubFailure('api/group', {
  //     status: 400,
  //     response: {
  //       success: false,
  //       message: 'Problem creating new group'
  //     }
  //   });

  //   const expectedSuccess = false;
  //   store.dispatch(createNewGroup()).then((err) => {
  //     expect(err.data.success).toEqual(expectedSuccess);
  //   });
  //   done();
  // });
});
