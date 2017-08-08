import {createStore} from 'redux';
import {user} from '../reducers/reducer';

const initialState = {
    user: {
     email: 'fob1493@gmail.com',
     id: 0,
     password: 'ghgh',
     userName: 'fob',
     groups: []
    }
};

const store = createStore(user, initialState);

console.log(store.getState());
