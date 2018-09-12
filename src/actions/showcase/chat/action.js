import { USER_AUTH, SCENE_CHANGE, CREATE_ROOM, CLOSE_OPEN_POPUP } from "Actions/showcase/chat/actionType.js";

export const signInGoogle = (bool = false, userData = {}) => {
    return {
        type: USER_AUTH,
        payload: {
            bool,
            userData
        }
    }
}

export const closeOpenPopup = () => {
    return {
        type: CLOSE_OPEN_POPUP,
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

export const changeScene = (sceneType) => {
    return {
        type: SCENE_CHANGE,
        payload: {
            sceneType
        }
    }
}