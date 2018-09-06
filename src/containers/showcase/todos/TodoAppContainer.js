import React, {Component} from 'react';
import {connect} from 'react-redux';
import Link from 'react-router-dom/Link';

import {toggleCard, addTodo} from 'Actions/showcase/todos/action.js';

import TodoFormComp from 'Components/showcase/todos/TodoFormComp.js';
import TodoListContainer from 'Containers/showcase/todos/TodoListContainer.js';
import TodoFilterContainer from 'Containers/showcase/todos/TodoFilterContainer.js';

class TodoAppContainer extends Component {
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            text: ''
        };
    }

    handleChange(evt){
        this.setState({text: evt.target.value});
    }

    handleSubmit(evt){
        if(!!this.state.text.length){
            this.props.addTodo(this.state.text); 
            
            evt.target.reset();
            this.setState({text: ''});    
        
        } else {
            alert('Kindly provide some todos before you can continue.');
        }
        evt.preventDefault();
    }
    
    render(){
        let {isFormOpen, toggleCard} = this.props;
        return (
            <div className="container -top-bottom-gutter align-left">
                <Link to="/showcase" className="btn btn-back ">&#8678;back</Link>
                <h4 className="page-title">Todo App with React,Redux,Thunk</h4>

                <div className="app-sample">
                    <div className="top-nav">
                        <button className="btn-add" onClick={toggleCard}>{ (isFormOpen ? 'Hide Form' : 'Show Form') }</button>
                    </div>
                    <TodoFormComp 
                        isOpen={isFormOpen} 
                        onSubmit={this.handleSubmit} 
                        handleChange={this.handleChange}
                    />
                    <TodoListContainer />

                    <TodoFilterContainer />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isFormOpen: state.todoAppUI.isFormOpen,
});

const mapDispatchToProps = {
    toggleCard: toggleCard,
    addTodo: addTodo
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoAppContainer);