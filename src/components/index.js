import React from 'react';
import {Route, Switch} from 'react-router';
import TodoAppContainer from '../showcase/todos/containers/TodoAppContainer';
import ShowcaseContainer from '../containers/ShowcaseContainer';
import ChatAppContainer from '../showcase/chat/containers/ChatAppContainer';

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