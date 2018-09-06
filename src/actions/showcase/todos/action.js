import {TOGGLE_CARD, 
    ADD_TODO, 
    MARKED_AS_DONE,
    EDIT_TODO,
    DELETE_TODO,
    TODO_FILTER_CHANGE
} from 'Actions/showcase/todos/actionType.js';

export const toggleCard = () => {
    return {
        type: TOGGLE_CARD
    }
}
export const addTodo = (todoText) => {
    return {
        type: ADD_TODO,
        payload: {
            todoText
        }
    }
}
export const markedAsDone = (uuid) => {
    return {
        type: MARKED_AS_DONE,
        payload: {
            uuid
        }
    }
}
export const editTodo = (newText, uuid) => {
    return {
        type: EDIT_TODO,
        payload: {
            newText,
            uuid
        }
    }
}
export const deleteTodo = (uuid) => {
    return {
        type: DELETE_TODO,
        payload: {
            uuid
        }
    }
}
export const todoFilterChangeTo = (filter) => {
    return {
        type: TODO_FILTER_CHANGE,
        payload: {
            filter
        }
    }
}