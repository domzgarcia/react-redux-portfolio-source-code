import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import store, { history } from './store';

// Import css here
import './index.css';

// Landing page
import HomepageContainer from 'Containers/HomepageContainer.js';

import registerServiceWorker from './registerServiceWorker';
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