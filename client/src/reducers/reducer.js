import C from '../constants';

export const color = (state={}, action) => {
    switch (action.type){
        case C.SIGN_UP:
            return {
                userName: action.userName,
                email: action.email,
                idNum: action.idNum,
                password: action.password,
                loggedIn: action.loggedIn,
            };

        default: 
            return state;
    }
};
