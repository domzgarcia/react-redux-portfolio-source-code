import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import store, { history } from './store';
import registerServiceWorker from './registerServiceWorker';
import asyncRoute from './utilities/asyncRoute';
// Import css here
import './index.css';
import './App.css';
import './components/showcase.css';
import './components/showcase.scss';
import './showcase/chat/components/chatmain.scss';

const HomepageContainer = asyncRoute( () => import('Containers/HomepageContainer.js'));

registerServiceWorker();

const targetRoot = document.querySelector('#root');

render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Switch>
                <Route path='/' component={HomepageContainer}/>
            </Switch>
        </ConnectedRouter>
    </Provider>,
    targetRoot
);