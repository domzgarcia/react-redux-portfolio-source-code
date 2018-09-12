import { USER_AUTH } from "Actions/showcase/chat/actionType";

const chatStore = (state={}, {type, payload}) => {
    switch(type){
        case USER_AUTH:
            state.appUI.isAuthenticated = payload.bool;
            state.user.userData = payload.userData;
            return {...state};
            
        default:
            return state;
    }
}

export default chatStore;