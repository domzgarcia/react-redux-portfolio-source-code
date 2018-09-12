import { USER_AUTH, POPUP_CREATE_ROOM, CREATE_ROOM } from "Actions/showcase/chat/actionType.js";

export const signInGoogle = (bool = false, userData = {}) => {
    return {
        type: USER_AUTH,
        payload: {
            bool,
            userData
        }
    }
}

export const setPopUpType = (type) => {
    return {
        type: type,
        payload: {
            type
        }
    }
}

export const createRoom = (roomData) => {
    return {
        type: CREATE_ROOM,
        payload: {
            roomData
        }
    }
}