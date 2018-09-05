import {TOGGLE_CARD} from 'Actions/showcase/todos/actionType.js';

const todoAppUI = (state={}, {type}) => {
    switch(type){
        case TOGGLE_CARD:
            return {
                ...state,
                isFormOpen: !state.isFormOpen
            }
        default:
            return state;
    }
}

export default todoAppUI;