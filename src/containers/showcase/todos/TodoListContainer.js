import React, {Component} from 'react';
import {connect} from 'react-redux';
import 'Components/showcase/todos/todo.css';
import TodoListItemContainer from './TodoListItemContainer';

class TodoListContainer extends Component {
    constructor(props){
        super(props);
    }
    render(){
        let {todos} = this.props;
        return (
            <div className="todos">
                <ul className="list">
                    { todos.map( (obj, idx) => {
                        return ( 
                                <TodoListItemContainer 
                                key={obj.uid}
                                {...obj}
                                />
                            )
                        }) }
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    todos: state.todos
});

export default connect(mapStateToProps, null)(TodoListContainer);