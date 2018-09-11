import { combineReducers } from 'redux';
import userReducers from 'Reducers/sample/userReducers.js';
import {routerReducer} from 'react-router-redux';

// Todo App
import todoAppUI from 'Reducers/showcase/todos/todoAppUI.js';
import todos from 'Reducers/showcase/todos/todos.js';

// Chat App
import chatStore from 'Reducers/showcase/chat/chatAppUI.js';

export default combineReducers({
    todoAppUI,
    todos,

    chatStore,
    
    routerReducer
});