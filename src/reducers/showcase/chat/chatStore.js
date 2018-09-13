import { USER_AUTH, POPUP_CREATE_ROOM, CREATE_ROOM, CLOSE_OPEN_POPUP, SCENE_ROOMS_LIST, SCENE_CHANGE} from "Actions/showcase/chat/actionType";

let initialState =  {
    appUI: {
        popupType: '',
        isAuthenticated: false,
        isPopupOpen: false,
        scene: SCENE_ROOMS_LIST,
    },
    user: {
        userData: null
    },
    rooms: [ // Schema
        /*{   
            id: '<generated>', 
            createdBy: '<user>', 
            createdAt: '<date>', 
            title: '<title>', 
            description: '<description>',
            isPrivate: false,

            messages: [
                {
                    id: '<generated>',
                    user: '<username>',
                    email: '<email>',
                    userMessages: '<user messages>',
                    timestamp: '<date>',
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
        
        case CREATE_ROOM:
            const {title, description, createdBy, createdAt, isPrivate, password, id} = payload.roomData;
            const obj = {
                id          : id,
                createdBy   : createdBy,
                createdAt   : createdAt,
                title       : title,
                description : description,
                isPrivate   : isPrivate,
                password    : password 
            };
            state.rooms.push(obj);

            return {...state};
        
        case SCENE_CHANGE:
            state.appUI.scene = payload.sceneType;
            return {...state};

        default:
            return state;
    }
}

export default chatStore;