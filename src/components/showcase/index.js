import React from 'react';
import {Route, Switch} from 'react-router';
import TodoAppContainer from 'Containers/showcase/todos/TodoAppContainer.js';
import ShowcaseContainer from 'Containers/showcase/ShowcaseContainer.js';
import ChatAppContainer from 'Containers/showcase/chat/ChatAppContainer.js';

const showcaseRoutes = (
    <Switch>
        <Route exact path='/showcase' component={ShowcaseContainer}/>
        <Route path='/showcase/todo-app' component={TodoAppContainer}/>
        <Route path='/showcase/chat-app' component={ChatAppContainer}/>
    </Switch>
);

export default showcaseRoutes;