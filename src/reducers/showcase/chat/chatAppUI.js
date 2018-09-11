import { USER_AUTH } from "Actions/showcase/chat/actionType";

const chatStore = (state={}, {type, payload}) => {
    switch(type){
        case USER_AUTH:
            state.user.isAuthenticated = payload.bool;
            state.user.userData = payload.userData;

            console.log('reducers','payload', payload.bool);

            return {...state};
        default:
            return state;
    }
}

export default chatStore;