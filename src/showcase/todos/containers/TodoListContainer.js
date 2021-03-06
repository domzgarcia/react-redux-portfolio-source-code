import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../components/main.css';
import TodoListItemContainer from './TodoListItemContainer';
import {TODO_FILTER_PENDING, TODO_FILTER_DONE} from '../actions/actionType';

class TodoListContainer extends Component {
    constructor(props){
        super(props);
    }
    render(){
        let {todos, todoFilter} = this.props;
        let contVisibility = (!!todos.length) ? '-active' : '';
        // console.log('todos',todos);
        return (
            <div className={"todos "+contVisibility}>
                <p><strong>Hint:</strong> Double tap to edit</p>
                <hr></hr>
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
                            .map( (todoItem, idx) => {
                                return (
                                        <TodoListItemContainer 
                                        key={todoItem.uuid}
                                        {...todoItem}
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