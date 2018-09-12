import { combineReducers } from 'redux';
import {routerReducer} from 'react-router-redux';

// Todo App
import todoAppUI from 'Reducers/showcase/todos/todoAppUI.js';
import todos from 'Reducers/showcase/todos/todos.js';

// Chat App
import chatStore from 'Reducers/showcase/chat/chatStore.js';

export default combineReducers({
    // todoapp
    todoAppUI,
    todos,

    // chatapp
    chatStore,

    // route
    routerReducer
});