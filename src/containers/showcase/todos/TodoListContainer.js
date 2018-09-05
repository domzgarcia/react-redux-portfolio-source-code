import React, {Component} from 'react';
import {connect} from 'react-redux';
import 'Components/showcase/todos/todo.css';
import TodoListItemContainer from './TodoListItemContainer';
import {TODO_FILTER_PENDING, TODO_FILTER_DONE} from 'Actions/showcase/todos/actionType.js';

class TodoListContainer extends Component {
    constructor(props){
        super(props);
    }
    render(){
        let {todos, todoFilter} = this.props;
        return (
            <div className="todos">
                <ul className="list">
                    { // Just copied the code
                        todos
                            .filter( (item) => {
                                switch(todoFilter){
                                    case TODO_FILTER_PENDING:
                                        return item.done === false;
                                    case TODO_FILTER_DONE:
                                        return item.done === true;
                                    default:
                                        return true
                                }
                            })
                            .reverse()
                            .map( (obj, idx) => {
                                return (
                                        <TodoListItemContainer 
                                        key={obj.uid}
                                        {...obj}
                                        />
                                    )
                                })
                    }
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    todos: state.todos,
    todoFilter: state.todoAppUI.todoFilter
});

export default connect(mapStateToProps, null)(TodoListContainer);