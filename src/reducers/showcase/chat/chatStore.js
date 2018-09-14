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
            created_at: '<date>', 
            title: '<title>', 
            description: '<description>',
            privated: false,

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
            const {
                title, 
                description, 
                email, 
                created_at, 
                privated, 
                password, 
                id,
                name,
                uid
                } = payload.roomData;

            const obj = {
                uid           : uid,
                id            : id,
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
        
        case SCENE_CHANGE:
            state.appUI.scene = payload.sceneType;
            return {...state};

        default:
            return state;
    }
}

export default chatStore;