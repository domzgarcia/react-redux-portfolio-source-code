import { 
    USER_AUTH, 
    SCENE_CHANGE, 
    CREATE_ROOM, 
    CLOSE_OPEN_POPUP, 
    JOIN_ROOM, 
    POPULATE_ROOMS,
    POPULATE_MESSAGES,
    EMPTY_PER_ROOM_MESSAGE,
    ADD_MESSAGE
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
                        // change messages object to empty array
                        resp.data.rooms[key]['messages'] = [];
                        return resp.data.rooms[key];
                    });
                }

                console.log('SSSS', objectsToArrayObjects);

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

                let delay = setTimeout(() => {
                    clearTimeout(delay);
                    const path = baseUrl.concat('storeRoomId');
                    axios.post(path, {rid: id})
                        .then( (res) => {
                            // sync RID to newly added data in firebase
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
        // console.log('SELECTED:', userInfo);
        const rid = userInfo.rid;
        axios.post(path, { userInfo })
            .then((res) => {
                // ...
                console.log('joined room', res, rid);
                dispatch({
                    type: JOIN_ROOM,
                    payload: {
                        rid
                    }
                });
                // wait state change before passing to scene : chatroom
                const delay = setTimeout(()=>{ clearTimeout(delay); callback(); },100);
            })
            .catch((err)=>{
                if(err) return new Error('Error in join Room');
            })
    }
}
/*
export const fetchRoomData = (rid) => {
    return (dispatch) => {
        const path = baseUrl.concat('fetchRoomData');
        axios.post(path, {rid})
            .then((res) => {
                console.log('FETCHED ROOM DATA', res);
                dispatch({
                    type: POPULATE_MESSAGES,
                    payload: {
                        messages: res.room.messages
                    }
                });
            })
            .catch((err) => {
                if(err) return new Error('Error in fetching room data');
            });
    }
}
*/
export const createMessage = (messageData) => {
    return (dispatch)  => {
        const path = baseUrl.concat('createMessage');
        axios.post(path, {messageData})
            .then((res) => {
                console.log('Success create message', res);
            })
            .catch((err) => {
                if(err) return new Error('Error in create Message.');
            });
    }
}

export const emptyMessagesByRoomId = (rid) => {
    return {
        type: EMPTY_PER_ROOM_MESSAGE,
        payload: {
            rid
        }
    }
};

export const addMessage = (rid, messageData) => {
    return {
        type: ADD_MESSAGE,
        payload: {
            rid,
            messageData
        }
    };
};