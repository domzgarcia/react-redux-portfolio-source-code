import { USER_AUTH, 
    POPUP_CREATE_ROOM, 
    CREATE_ROOM, 
    CLOSE_OPEN_POPUP, 
    SCENE_ROOMS_LIST, 
    POPULATE_ROOMS, 
    SCENE_CHANGE, 
    JOIN_ROOM, 
    EMPTY_PER_ROOM_MESSAGE,
    ADD_MESSAGE, 
    PULL_MESSAGE_CYCLE} from "Actions/showcase/chat/actionType";

let initialState =  {
    appUI: {
        popupType: '',
        isAuthenticated: false,
        isPopupOpen: false,
        scene: SCENE_ROOMS_LIST,
        isMessageOnProcess: false,
        messageCycle: false
    },
    user: {
        userData: null,
        selectedRoom: 'not-set',
    },
    tempMessages: [],
    rooms: [],
}

const chatStore = (state=initialState, {type, payload}) => {
    switch(type){
        case EMPTY_PER_ROOM_MESSAGE:
            return {...state, 
                tempMessages: [] };

        case ADD_MESSAGE:
            // prevention in case
            let allow = true;
            state.tempMessages.map((message, idx) => {
                if(message.createdAt === payload.messageData.createdAt){
                    allow = false;
                }
            });

            return {...state,
                tempMessages: (allow) 
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

        case CREATE_ROOM:
            const {
                title, 
                description, 
                email, 
                created_at, 
                privated, 
                password, 
                rid,
                name,
                uid
                } = payload.roomData;

            const obj = {
                uid           : uid,
                rid           : rid,
                created_at    : created_at,
                email         : email,
                name          : name,
                title         : title,
                description   : description,
                privated      : privated,
                password      : password 
            };
            
            return {...state,
                rooms: [...state.rooms, obj]
            };
        
        case JOIN_ROOM:
            return {...state,
                user: {...state.user, selectedRoom: payload.rid }
            };

        case SCENE_CHANGE:
            return {...state,
                appUI: {...state.appUI, scene: payload.sceneType}
            };

        default:
            return state;
    }
}

export default chatStore;