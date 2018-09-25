import { USER_AUTH, 
    POPUP_CREATE_ROOM, 
    CREATE_ROOM, 
    CLOSE_OPEN_POPUP, 
    SCENE_ROOMS_LIST, 
    POPULATE_ROOMS, 
    SCENE_CHANGE, 
    UPDATE_ROOM_ID, 
    EMPTY_PER_ROOM_MESSAGE,
    ADD_MESSAGE, 
    PULL_MESSAGE_CYCLE,
    ADD_ROOM,
    EMPTY_ROOM,
    PULL_ROOM_CYCLE,
    SET_SERVER_TIME,
    EMPTY_USER_CONNECTIONS,
    ADD_USER_CONNECTED,
    ADD_VISITOR_COUNT,
    EMPTY_VISITOR_COUNT} from "Actions/showcase/chat/actionType";

let initialState =  {
    appUI: {
        popupType: '',
        isAuthenticated: false,
        isPopupOpen: false,
        scene: SCENE_ROOMS_LIST,
        isMessageOnProcess: false,
        messageCycle: false,
        roomCycle: false
    },
    user: {
        userData: null,
        selectedRoom: 'not-set',
    },
    tempMessages: [],

    rooms: [],

    emptyUserConnections: [],

    userConnections: [],

    serverTime: 0,

    visitorCount: 0,
}

const chatStore = (state=initialState, {type, payload}) => {
    switch(type){
        case EMPTY_PER_ROOM_MESSAGE:
            const emptyMessage = []
            return {...state, 
                tempMessages: [...emptyMessage] };
        
        case EMPTY_ROOM:
            const emptyRoom = [];
                return {
                    ...state,
                    rooms: [...emptyRoom]
                };

        case ADD_MESSAGE:
            // prevention in case
            let allowNewMessage = true;
            state.tempMessages.map((message, idx) => {
                if(message.createdAt === payload.messageData.createdAt){
                    allowNewMessage = false;
                }
            });
            return {...state,
                tempMessages: (allowNewMessage) 
                ? [...state.tempMessages, payload.messageData] 
                : [...state.tempMessages]
            };

        case PULL_MESSAGE_CYCLE:
            const bool1 = !state.appUI.messageCycle;
            return {...state,
                    appUI: {...state.appUI, messageCycle: bool1 }
                };

        case CLOSE_OPEN_POPUP: 
            const bool2 = !state.appUI.isPopupOpen;
            return {...state,
                appUI: {...state.appUI, isPopupOpen: bool2}
            };
        
        case USER_AUTH:
            return {...state,
                    user: { ...state.user, userData: payload.userData },
                    appUI: {...state.appUI, isAuthenticated: payload.bool }
                };

        case POPUP_CREATE_ROOM:
            return {...state,
                appUI: {...state.appUI, popupType: payload.type }
            };
        
        case POPULATE_ROOMS:
            return {...state,
                rooms: [...payload.rooms]
            };
        
        case ADD_ROOM:
            // prevention in case
            let allowNewRoom = true;
            let roomData = payload.roomData;
            state.rooms.map((room, idx) => {
                if(room.rid === roomData.rid){
                    allowNewRoom = false;
                }
            });
            return {...state,
                rooms: (allowNewRoom) 
                        ? [...state.rooms, roomData]
                        : [...state.rooms]
            };
        
        case UPDATE_ROOM_ID:
            return {...state,
                user: {...state.user, selectedRoom: payload.rid }
            };

        case SCENE_CHANGE:
            return {...state,
                appUI: {...state.appUI, scene: payload.sceneType}
            };

        case PULL_ROOM_CYCLE:
            return {
                ...state,
                appUI: {
                    ...state.appUI, roomCycle: !state.appUI.roomCycle}
            };

        case SET_SERVER_TIME: 
            return {
                ...state,
                serverTime: payload.serverTime
            };
        
        case EMPTY_USER_CONNECTIONS:
            const emptyUserConnections = [];
            return {
                ...state,
                userConnections: [...emptyUserConnections]
            };

        case ADD_USER_CONNECTED:
            const userData = payload.userData;
            let allowSaveUser = true;
            let count = state.visitorCount;

            if(state.user.selectedRoom !== userData.rid){
                return {...state};    
            }
            count += 1;
            // console.log(state.user.selectedRoom,'===',userData.rid, count);
            state.userConnections.map((user, idx) => {
                if(user.uid === userData.uid){
                    allowSaveUser = false;
            // console.log('FFFF', idx, state.user.selectedRoom, user.rid );
                }
            });

            return {
                ...state,
                visitorCount: count,
                userConnections: (allowSaveUser)
                ? [...state.userConnections, userData]
                : [...state.userConnections]
            };
        
        case EMPTY_VISITOR_COUNT:
            let zero = 0;
            return {
                ...state,
                visitorCount: zero
            }

        default:
            return state;
    }
}

export default chatStore;