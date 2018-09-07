import {TOGGLE_CARD, TODO_FILTER_CHANGE, LOADER_CONTROL, ADD_TODO_LOADER} from 'Actions/showcase/todos/actionType.js';

const todoAppUI = (state={}, {type, payload}) => {
    switch(type){
        case ADD_TODO_LOADER:
            return {
                ...state,
                isFormLoading: !state.isFormLoading
            }
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
        case LOADER_CONTROL:
            return {
                ...state,
                isLoading: payload.bool,
                targetId: payload.uuid
            }
        default:
            return state;
    }
}

export default todoAppUI;