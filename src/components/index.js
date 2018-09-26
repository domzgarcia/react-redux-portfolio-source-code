import React from 'react';
import {Route, Switch} from 'react-router';
import asyncRoute from '../utilities/asyncRoute';

const ShowcaseContainer = asyncRoute( () => import('../containers/ShowcaseContainer'));
const TodoAppContainer  = asyncRoute( () => import('../showcase/todos/containers/TodoAppContainer'));
const ChatAppContainer  = asyncRoute( () => import('../showcase/chat/containers/ChatAppContainer'));

const showcaseRoutes = (
    <Switch>
        {/* Landing page */}
        <Route exact path='/showcase' component={ShowcaseContainer}/>
        
        {/* Inner pages */}
        <Route path='/showcase/todo-app' component={TodoAppContainer}/>
        <Route path='/showcase/chat-app' component={ChatAppContainer}/>
    </Switch>
);

export default showcaseRoutes;