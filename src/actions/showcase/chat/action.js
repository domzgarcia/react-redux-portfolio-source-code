import { 
    USER_AUTH, 
    SCENE_CHANGE, 
    CREATE_ROOM, 
    CLOSE_OPEN_POPUP, 
    JOIN_ROOM, 
    POPULATE_ROOMS
} from "Actions/showcase/chat/actionType.js";

import _ from 'lodash';

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

export const fetchRooms = () => {
    return (dispatch) => {
        const path = baseUrl.concat('fetchRooms');

        axios.get(path)
            .then((resp) =>{
                let objectsToArrayObjects = [];

                if(_.values(resp.data.rooms).some(x => x !== undefined) ){
                    objectsToArrayObjects = Object.keys(resp.data.rooms).map(function(key) {
                        return resp.data.rooms[key];
                    });
                }

                console.log(objectsToArrayObjects);

                dispatch({
                    type: POPULATE_ROOMS,
                    payload: {
                        rooms: objectsToArrayObjects
                    }
                });
            })
            .catch((err) => {
                if(err) new Error('Error:Fetch-room');
            });
    }
}

export const createRoom = (roomData) => {
    return (dispatch) => {
        const path = baseUrl.concat('addRoom');

        axios.post(path, { roomData })
            .then( (res) => {
                const url = res.data.result.toString().split('/');
                const id  = url[url.length-1];
                roomData.rid = id;
                // local copy
                console.log('NEW ROOM ADDED', res, roomData);

                let delay = setTimeout(() => {
                    clearTimeout(delay);

                    const path = baseUrl.concat('storeRoomId');
                    axios.post(path, {rid: id})
                        .then( (res) => {
                            // sync RID to newly added data
                            console.log('STORED ROOM ID', res);

                            dispatch({
                                type: CREATE_ROOM,
                                payload: {
                                    roomData
                                }
                            });
                        })
                        .catch( (err) => {
                            if(err) return new Error('Error in Store Room Id');
                        });

                }, 100);
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

export const changeScene = (sceneType, data={}) => {
    return {
        type: SCENE_CHANGE,
        payload: {
            sceneType,
            payload: {
                data
            }
        }
    }
}

export const joinRoom = (userInfo, callback=undefined) => {
    return (dispatch) => {
        const path = baseUrl.concat('joinRoom');

        console.log('SELECTED:', userInfo);

        const rid = userInfo.rid;

        axios.post(path, { userInfo })
            .then((res) => {
                // ...
                console.log('joined room', res, rid);
                callback();

                dispatch({
                    type: JOIN_ROOM,
                    payload: {
                        rid
                    }
                });
            })
            .catch((err)=>{
                if(err) return new Error('Error in join Room');
            })
    }
}

export const fetchRoomData = (rid) => {
    console.log(rid);

    return (dispatch) => {
        const path = baseUrl.concat(`fetchRoomData/${rid}`);

        axios.get(path)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                if(err) return new Error('Error in fetching room data');
            });
    }
}