import React, {Component} from 'react';
import {connect} from 'react-redux';
import Link from 'react-router-dom/Link';

import {toggleCard, addTodo, addTodoLoader, fetchFromFirebase} from 'Actions/showcase/todos/action.js';

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

            this.props.addTodoLoader();
            
            evt.target.reset();
            this.setState({text: ''});    
        
        } else {
            alert('Kindly provide some todos before you can continue.');
        }
        evt.preventDefault();
    }

    componentDidMount(){
        this.props.fetchFromFirebase();
        document.querySelector('title').innerText = 'Todo App';
    }
    
    render(){
        let {isFormOpen, toggleCard, isFormLoading} = this.props;
        
        return (
            <div className="container -top-bottom-gutter align-left">
                <Link to="/showcase" className="btn btn-back ">&#8678;back</Link>
                <div className="app-sample">
                    <div className="top-nav">
                        <button className="btn-add" onClick={toggleCard}>{ (isFormOpen ? 'Hide Form' : 'Show Form') }</button>
                    </div>
                    {/* Navigation */}
                    <TodoFormComp 
                        isOpen={isFormOpen} 
                        onSubmit={this.handleSubmit} 
                        handleChange={this.handleChange}
                        isFormLoading={isFormLoading}
                    />

                    {/* List */}
                    <TodoListContainer />

                    {/* Filter */}
                    <TodoFilterContainer />
                </div>

                <br />
                <br />

                <p><strong>Project description:</strong></p>
                <p>Simple todo app with firebase integration(simple REST API). Have a usual functionality such as C.R.U.D
                   
                </p>

                <br />
                <br />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isFormOpen: state.todoAppUI.isFormOpen,
    isFormLoading: state.todoAppUI.isFormLoading
});

const mapDispatchToProps = {
    toggleCard: toggleCard,
    addTodo: addTodo,
    addTodoLoader: addTodoLoader,

    fetchFromFirebase: fetchFromFirebase,
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoAppContainer);