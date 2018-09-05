import { ADD_TODO, MARKED_AS_DONE, EDIT_TODO } from "Actions/showcase/todos/actionType.js";
import v4 from 'uuid/v4';

const todos = (state=[], {type, payload}) => {
    switch(type){
        case ADD_TODO:
            return [
                ...state,
                { 
                    name: payload.todoText,
                    uid: v4(),
                    done: false
                }
            ]
        
        case MARKED_AS_DONE: 
            let currentSelected = state.filter(obj => {
                return (obj.uid) === payload.uid;
            })[0];
            currentSelected.done = !currentSelected.done;
            return [...state]
        
        case EDIT_TODO: 
            let editSelected = state.filter(obj => {
                return (obj.uid) === payload.uid;
            })[0];
            editSelected.name = payload.newText;
            return [...state]

        default:
            return state
    }
}
export default todos;