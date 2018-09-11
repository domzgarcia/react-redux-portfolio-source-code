import { USER_AUTH } from "Actions/showcase/chat/actionType.js";

export const signInGoogle = (bool = false, userData = {}) => {
    return {
        type: USER_AUTH,
        payload: {
            bool,
            userData
        }
    }
}