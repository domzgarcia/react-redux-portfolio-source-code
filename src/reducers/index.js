import { combineReducers } from 'redux';
import {routerReducer} from 'react-router-redux';

// Todo App
import todoAppUI from '../showcase/todos/reducers/todoAppUI';
import todos from '../showcase/todos/reducers/todos';

// Chat App
import chatStore from '../showcase/chat/reducers/chatStore';

export default combineReducers({
    // todoapp
    todoAppUI,
    todos,

    // chatapp
    chatStore,

    // route
    routerReducer
});