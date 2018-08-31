import { combineReducers } from 'redux';
import userReducers from 'Reducers/sample/userReducers.js';
import {routerReducer} from 'react-router-redux';

export default combineReducers({
    userReducers,
    routerReducer
});