import { combineReducers } from 'redux';
import userReducers from 'Reducers/sample/userReducers.js';
import {routerReducer} from 'react-router-redux';

import todoAppUI from 'Reducers/showcase/todos/todoAppUI.js';
import todos from 'Reducers/showcase/todos/todos.js';

export default combineReducers({
    todoAppUI,
    todos,
    routerReducer
});