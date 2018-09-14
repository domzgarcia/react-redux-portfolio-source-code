import { 
    USER_AUTH, 
    SCENE_CHANGE, 
    CREATE_ROOM, 
    CLOSE_OPEN_POPUP, 
    JOIN_ROOM 
} from "Actions/showcase/chat/actionType.js";

import axios from 'axios';

// const baseUrl = 'https://us-central1-myspace-a310c.cloudfunctions.net';
// const baseUrl = 'https://domz-garcia.tk';
const baseUrl = 'https://myspace-a310c.firebaseapp.com/';

export const signInGoogle = (bool = false, userData = {}) => {
    return (dispatch) => {
        dispatch({
            type: USER_AUTH,
            payload: {
                bool,
                userData
            }
        });
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
        const path = baseUrl.concat('addRoom');

        axios.post(path, { roomData })
            .then( (res) => {
                const url = res.data.result.toString().split('/');
                const id  = url[url.length-1];
                roomData['id'] = id;
                // local copy

                console.log('NEW ROOM ADDED', res, roomData);

                dispatch({
                    type: CREATE_ROOM,
                    payload: {
                        roomData
                    }
                });
            })
            .catch((err) => {
                if(err) return new Error('Error in Add Room');
            });
    }
}
export const addNewUser = (userData) => {
    return (dispatch) => {
        const path = baseUrl.concat('addUser');
        axios.post(path, { userData })
            .then((res) => {
                console.log(res);
                // nothing to do here...
            })
            .catch((err) => {
                if(err) return new Error('Error in Add User');
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

export const joinRoom = (userJoining) => {
    return (dispatch) => {
        const path = baseUrl.concat('joinRoom');
        
        console.log(userJoining);

        axios.post(path, userJoining)
            .then((res) => {
                console.log(res);
            })
            .catch((err)=>{
                if(err) return new Error('Error in join Room');
            })
        // local copy
        // dispath({
        //     type: JOIN_ROOM,
        //     userJoining
        // });
    }
}