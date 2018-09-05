import React, {Component} from 'react';
import {connect} from 'react-redux';

import {todoFilterChangeTo} from 'Actions/showcase/todos/action.js';

import {TODO_FILTER_ALL,
    TODO_FILTER_PENDING,
    TODO_FILTER_DONE} from 'Actions/showcase/todos/actionType.js';

class TodoFilterContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
            filter: TODO_FILTER_ALL
        };
    }
    
    handleSetFilter(filter){
        if(filter === TODO_FILTER_ALL) {
            this.props.todoFilterChangeTo(TODO_FILTER_ALL);
            this.setState({filter: TODO_FILTER_ALL});

        } else if(filter === TODO_FILTER_PENDING){
            this.props.todoFilterChangeTo(TODO_FILTER_PENDING);
            this.setState({filter: TODO_FILTER_PENDING});

        } else if(filter === TODO_FILTER_DONE){
            this.props.todoFilterChangeTo(TODO_FILTER_DONE);
            this.setState({filter: TODO_FILTER_DONE});

        }
    }

    render(){
        let allActive = (this.state.filter === TODO_FILTER_ALL) ? 'btn-all -active' : '';
        let pendingActive = (this.state.filter === TODO_FILTER_PENDING) ? 'btn-pending -active' : '';
        let doneActive = (this.state.filter === TODO_FILTER_DONE) ? 'btn-done -active' : '';

        return (
            <div className="btn-filters">
                <button className={"" +allActive} onClick={()=>{
                    this.handleSetFilter(TODO_FILTER_ALL);
                }}>All</button>

                <button className={"" +pendingActive} onClick={()=>{
                    this.handleSetFilter(TODO_FILTER_PENDING);
                }}>Pending</button>

                <button className={"" +doneActive} onClick={()=>{
                    this.handleSetFilter(TODO_FILTER_DONE);
                }}>Done</button>
            </div>
        )
    }
}

const mapDispatchToProps = {
    todoFilterChangeTo: todoFilterChangeTo
};

export default connect(null, mapDispatchToProps)(TodoFilterContainer);