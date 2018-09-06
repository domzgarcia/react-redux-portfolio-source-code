import { ADD_TODO, MARKED_AS_DONE, EDIT_TODO, DELETE_TODO } from "Actions/showcase/todos/actionType.js";
import v4 from 'uuid/v4';
import _ from 'lodash';

const todos = (state=[], {type, payload}) => {
    switch(type){
        case ADD_TODO:
            return [
                ...state,
                { 
                    name: payload.todoText,
                    uuid: v4(),
                    done: false,
                    saveLocalStorage: false,
                    saveFirbase: false
                }
            ]
        
        case MARKED_AS_DONE: 
            let currentSelected = state.filter(obj => {
                return (obj.uuid) === payload.uuid;
            })[0];
            currentSelected.done = !currentSelected.done;
            return [...state]
        
        case EDIT_TODO: 
            let editSelected = state.filter(obj => {
                return (obj.uuid) === payload.uuid;
            })[0];
            editSelected.name = payload.newText;
            return [...state]

        case DELETE_TODO:
            _.remove(state, (obj) => {
                return obj.uuid === payload.uuid;
            });
            return [...state]        
        
        default:
            return state
    }
}
export default todos;