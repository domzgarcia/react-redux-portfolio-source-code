import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import rootReducer from 'Reducers/index.js';
// import v4 from 'uuid/v4';

import { TODO_FILTER_ALL } from 'Actions/showcase/todos/actionType.js';
import firebase from 'Services/firebase.js';
import { SCENE_ROOMS_LIST } from 'Actions/showcase/chat/actionType';

export const history = createHistory();

const initialState = {
    // I haven't manage todos scope here
    todos: [],
    todoAppUI: {
        isFormOpen: true,
        isFormLoading: false,
        targetId: 0,
        todoFilter: TODO_FILTER_ALL
    }
};

const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancers = [];
const middleware = [
    thunk,
    routerMiddleware(history)
];

if(typeof devToolsExtension === 'function'){
    enhancers.push(devToolsExtension());
}

const allStoreEnhancers = compose(
    applyMiddleware(...middleware),
    ...enhancers
);

const store = createStore(
    rootReducer,
    initialState,
    allStoreEnhancers
);

export default store;