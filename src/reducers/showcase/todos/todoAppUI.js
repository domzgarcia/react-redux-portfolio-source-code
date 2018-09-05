import {TOGGLE_CARD, TODO_FILTER_CHANGE} from 'Actions/showcase/todos/actionType.js';

const todoAppUI = (state={}, {type, payload}) => {
    switch(type){
        case TOGGLE_CARD:
            return {
                ...state,
                isFormOpen: !state.isFormOpen
            }
        case TODO_FILTER_CHANGE: 
            return {
                ...state,
                todoFilter: payload.filter
            }
        default:
            return state;
    }
}

export default todoAppUI;