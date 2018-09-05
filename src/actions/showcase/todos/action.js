import {TOGGLE_CARD, 
    ADD_TODO, 
    MARKED_AS_DONE,
    EDIT_TODO,
    DELETE_TODO
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
export const markedAsDone = (uid) => {
    return {
        type: MARKED_AS_DONE,
        payload: {
            uid
        }
    }
}
export const editTodo = (newText, uid) => {
    return {
        type: EDIT_TODO,
        payload: {
            newText,
            uid
        }
    }
}
export const deleteTodo = (uid) => {
    return {
        type: DELETE_TODO,
        payload: {
            uid
        }
    }
}