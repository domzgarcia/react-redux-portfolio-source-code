import React from 'react';
import {Route, Switch} from 'react-router';
import TodoAppContainer from 'Containers/showcase/TodoAppContainer.js'
import ShowcaseContainer from 'Containers/showcase/ShowcaseContainer.js';

const routes = (
    <Switch>
        <Route exact path='/showcase' component={ShowcaseContainer}/>
        <Route path='/showcase/todo-app' component={TodoAppContainer}/>
    </Switch>
);

export default routes;