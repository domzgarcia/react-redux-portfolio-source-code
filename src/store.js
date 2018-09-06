import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import rootReducer from 'Reducers/index.js';
// import v4 from 'uuid/v4';

import { TODO_FILTER_ALL } from 'Actions/showcase/todos/actionType.js';
import firebase from 'Services/firebase.js';

export const history = createHistory();

const initialState = {
    todos: [],
    todoAppUI: {
        isFormOpen: true,
        todoFilter: TODO_FILTER_ALL
    },
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

// firebase.getAll()
//     .then( response => {
//         const spreadToArray = Object.keys(response.data.todos).map(function(key) {
//             return response.data.todos[key];
//           });
//         console.log('spreadToArray', spreadToArray);
//     });

const store = createStore(
    rootReducer,
    initialState,
    allStoreEnhancers
);

export default store;