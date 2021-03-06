import {TOGGLE_CARD, 
    ADD_TODO, 
    MARKED_AS_DONE,
    EDIT_TODO,
    DELETE_TODO,
    TODO_FILTER_CHANGE,
    FIREBASE_FETCH_ALL,
    LOADER_CONTROL,
    ADD_TODO_LOADER,
    
} from './actionType';
import firebase from '../services/firebase';
import v4 from 'uuid/v4';
import _ from 'lodash';

export const toggleCard = () => {
    return {
        type: TOGGLE_CARD
    }
}
export const addTodo = (todoText) => {
    return (dispatch) => {
        firebase.addTodo({ 
            name: todoText,
            done: false,
            saveLocalStorage: false,
            savedFirebase: true,
            uuid: v4(),
        })
        .then( (response) => {
            const autoGeneratedKey = response.data.name;
            dispatch({
                type: ADD_TODO,
                payload: {
                    todoText,
                    autoGeneratedKey
                }
            });
            // sync id to firebase
            firebase.syncId(autoGeneratedKey)
            .then((response)=>{
                // do nothing

                // After sync allow user to add todo Again
                dispatch({
                    type: ADD_TODO_LOADER
                });
            })
        })
    }
}
export const addTodoLoader = () => {
    return {
        type: ADD_TODO_LOADER
    }
}
export const markedAsDone = (uuid, bool) => {
    return (dispatch) => {
        loaderDispatcher(dispatch, uuid, true);
        firebase.markedAsDone(uuid, bool)
            .then( (response) => {
                // update local
                dispatch({
                    type: MARKED_AS_DONE,
                    payload: {
                        uuid
                    }
                })
                loaderDispatcher(dispatch, uuid, false);
            })
    }
}
export const editTodo = (newText, uuid) => {
    return (dispatch) => {
        loaderDispatcher(dispatch, uuid, true);
        firebase.editTodo(uuid, newText)
            .then( (response) => {
                // update local
                dispatch({
                    type: EDIT_TODO,
                    payload: {
                        newText,
                        uuid
                    }
                });
                loaderDispatcher(dispatch, uuid, false);
            });
    }
}
export const deleteTodo = (uuid) => {
    return (dispatch) => {
        loaderDispatcher(dispatch, uuid, true);
        firebase.deleteTodo(uuid)
            .then( (response) => {
                // update local
                dispatch({
                    type: DELETE_TODO,
                    payload: {
                        uuid
                    }
                });
                loaderDispatcher(dispatch, uuid, false);
            })
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
/** Firebase Action Creator */
export const fetchFromFirebase = () => {
    return (dispatch) => {
        firebase.getAll()
        .then( (response) => {
            let objectsToArrayObjects = [];
            if(_.values(response.data.todos).some(x => x !== undefined) ){
                objectsToArrayObjects = Object.keys(response.data.todos).map(function(key) {
                    return response.data.todos[key];
                });
            }
            // console.log('objectsToArrayObjects', objectsToArrayObjects);
            dispatch({
                type: FIREBASE_FETCH_ALL,
                payload: {
                    todos: objectsToArrayObjects
                }
            });
            return objectsToArrayObjects;
        });
    }
}

function loaderDispatcher(dispatch, uuid, bool=false){
    dispatch({
        type: LOADER_CONTROL,
        payload: {
            bool,
            uuid
        }
    });
}