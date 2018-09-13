import { USER_AUTH, SCENE_CHANGE, CREATE_ROOM, CLOSE_OPEN_POPUP } from "Actions/showcase/chat/actionType.js";
import axios from 'axios';

const baseUrl = 'https://us-central1-myspace-a310c.cloudfunctions.net';

// const baseUrl = 'https://domz-garcia.tk/';

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
    return (dispatch) => {
        const path = baseUrl.concat('/addRoom');

        axios.post(path, { roomData })
            .then( (res) => {
                roomData['id'] = res.roomId;
                dispatch({
                    type: CREATE_ROOM,
                    payload: {
                        roomData
                    }
                });
            })
            .catch((res) =>{
                console.log('error', res);
            });
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