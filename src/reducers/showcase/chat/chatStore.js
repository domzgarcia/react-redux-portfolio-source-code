import { USER_AUTH, POPUP_CREATE_ROOM, CREATE_ROOM } from "Actions/showcase/chat/actionType";

const chatStore = (state={}, {type, payload}) => {
    switch(type){
        case USER_AUTH:
            state.appUI.isAuthenticated = payload.bool;
            state.user.userData = payload.userData;
            return {...state};

        case POPUP_CREATE_ROOM:
            state.appUI.popupType = payload.type;
            return {...state};
        
        case CREATE_ROOM:
            const {title, description, createdBy, createdAt, isPrivate} = payload.roomData;
            const obj = {
                id          : Date.now(),
                createdBy   : createdBy,
                createdAt   : createdAt,
                title       : title,
                description : description,
                isPrivate     : isPrivate,
            };
            state.rooms.push(obj);

            return {...state};

        default:
            return state;
    }
}

export default chatStore;