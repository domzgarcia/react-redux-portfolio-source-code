import { USER_AUTH, POPUP_CREATE_ROOM, CREATE_ROOM, CLOSE_OPEN_POPUP, SCENE_ROOMS_LIST, POPULATE_ROOMS, SCENE_CHANGE, JOIN_ROOM} from "Actions/showcase/chat/actionType";

let initialState =  {
    appUI: {
        popupType: '',
        isAuthenticated: false,
        isPopupOpen: false,
        scene: SCENE_ROOMS_LIST,
    },
    user: {
        userData: null,
        selectedRoom: 'not-set',
    },
    rooms: [ // Schema
        /*{   
            id: '<generated>', 
            createdBy: '<user>', 
            created_at: '<date>', 
            title: '<title>', 
            description: '<description>',
            privated: false,
            messages: {} // [
                {
                    title,
                    description,
                    email,
                    created_at,
                    privated,
                    password,
                    id,
                    name,
                    uid,
                }
            ]
        }*/
    ]
}

const chatStore = (state=initialState, {type, payload}) => {
    switch(type){
        case CLOSE_OPEN_POPUP: 
            state.appUI.isPopupOpen = !state.appUI.isPopupOpen;
            return {...state};
        
        case USER_AUTH:
            state.appUI.isAuthenticated = payload.bool;
            state.user.userData = payload.userData;
            return {...state};

        case POPUP_CREATE_ROOM:
            state.appUI.popupType = payload.type;
            return {...state};
        
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
            state.rooms.push(obj);
            return {...state};
        
        case JOIN_ROOM:
            console.log(payload.rid);

            state.user.selectedRoom = payload.rid;

            return {...state};

        case SCENE_CHANGE:
            state.appUI.scene = payload.sceneType;
            return {...state};

        default:
            return state;
    }
}

export default chatStore;