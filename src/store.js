import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import rootReducer from 'Reducers/index.js';

export const history = createHistory();

const initialState = {};
const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;
const enhancers = [];
const middleware = [
    thunk,
    routerMiddleware(history)
];

const allStoreEnhancers = compose(
    applyMiddleware(...middleware),
    ...enhancers
);

if(typeof devToolsExtension === 'function'){
    enhancers.push(devToolsExtension());
}

const store = createStore(
    rootReducer,
    initialState,
    allStoreEnhancers
);

console.log(store.getState());

export default store;