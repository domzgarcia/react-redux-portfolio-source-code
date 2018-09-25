import { 
    USER_AUTH, 
    SCENE_CHANGE,
    CLOSE_OPEN_POPUP, 
    UPDATE_ROOM_ID, 
    POPULATE_ROOMS,
    EMPTY_PER_ROOM_MESSAGE,
    ADD_MESSAGE,
    PULL_MESSAGE_CYCLE,
    ADD_ROOM,
    EMPTY_ROOM,
    PULL_ROOM_CYCLE,
    EMPTY_USER_CONNECTIONS,
    ADD_USER_CONNECTED,
    SET_SERVER_TIME,
    ADD_VISITOR_COUNT,
    EMPTY_VISITOR_COUNT
} from "Actions/showcase/chat/actionType.js";

import _ from 'lodash';

import axios from 'axios';

// const baseUrl = 'https://us-central1-myspace-a310c.cloudfunctions.net';
// const baseUrl = 'https://domz-garcia.tk';
const baseUrl = 'https://myspace-a310c.firebaseapp.com/';

export const manageGoogleUser = (bool = false, userData = {}) => {
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

export const pullRoomCycle = () => {
    return {
        type: PULL_ROOM_CYCLE
    }
}

export const fetchRooms = () => {
    
    return (dispatch) => {
        const path = baseUrl.concat('fetchRooms');
        
        dispatch(pullRoomCycle());
        
        axios.get(path)
            .then((resp) =>{
                
                dispatch(pullRoomCycle());

                return false;
                /**
                 * Not use for firebase invoke explicit function and spread to all 
                 * connected clients.
                 */
                let objectsToArrayObjects = [];
                if(_.values(resp.data.rooms).some(x => x !== undefined) ){
                    objectsToArrayObjects = Object.keys(resp.data.rooms).map(function(key) {
                        // change messages object to empty array
                        resp.data.rooms[key]['messages'] = [];
                        return resp.data.rooms[key];
                    });
                }
                // Not use
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

export const addNewRoom = (roomData, callback) => {
    return (dispatch) => {
        const path = baseUrl.concat('addRoom');
        axios.post(path, { roomData })
            .then( (res) => {
                // ... remove storeRoomId
                callback();
            })
            .catch((err) => {
                if(err) throw new Error('Error in Add Room');
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
                if(err) throw new Error('Error in Add User');
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

export const getServerTime = () => {
    return (dispatch) => {
        
        const path = baseUrl.concat('getServerTime');
        axios.get(path)
            .then((res)=>{
                // console.log('SERVER_TIME', res);
                dispatch({
                    type: SET_SERVER_TIME,
                    payload: {
                        serverTime: res.data.serverTime
                    }
                });
            })
            .catch((err)=>{
                if(err) throw new Error('Error in getting server time');
            });
    }
}

export const joinRoom = (userInfo, callback=undefined) => {
    return (dispatch) => {
        const {rid} = userInfo;

        // Update selected room 
        dispatch({
            type: UPDATE_ROOM_ID,
            payload: {
                rid
            }
        });

        const path = baseUrl.concat('joinRoom');
        axios.post(path, {userInfo})
            .then((res) => {
                // ...
                callback();
            })
            .catch((err)=>{
                if(err) throw new Error('Error in join Room');
            })
    }
}

export const fetchRoomData = (rid, callback=undefined) => {
    return (dispatch) => {
        dispatch({
            type: PULL_MESSAGE_CYCLE
        });
        
        const path = baseUrl.concat('fetchRoomData');

        axios.post(path, {rid})
            .then((res) => { 
                dispatch({
                    type: PULL_MESSAGE_CYCLE
                });
            })
            .catch((err) => {
                if(err) throw new Error('Error in fetching room data');
            });
    }
}

export const createMessage = (messageData) => {
    return (dispatch)  => {
        const path = baseUrl.concat('createMessage');
        axios.post(path, {messageData})
            .then((res) => {
                console.log('Success create message', res);
            })
            .catch((err) => {
                if(err) throw new Error('Error in create Message.');
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

export const emptyRooms = () => {
    return {
        type: EMPTY_ROOM
    }
};

export const addMessage = (rid, messageData) => {
    return (dispatch) => {
        dispatch({
            type: ADD_MESSAGE,
            payload: {
                rid,
                messageData
            }
        });
    };
};

export const addRoom = (roomData) => {
    return {
        type: ADD_ROOM,
        payload: {
            roomData
        }
    }
}

export const processMessageDefault = () => {
    return {
        type: PULL_MESSAGE_CYCLE
    }
}

export const emptyUserConnections = () => {
    return {
        type: EMPTY_USER_CONNECTIONS
    }
}

export const addUserClient = (userData) => {
    return {
        type: ADD_USER_CONNECTED,
        payload: {
            userData
        }
    }
}

export const emptyVisitorCount = () => {
    return {
        type: EMPTY_VISITOR_COUNT,
    }
}