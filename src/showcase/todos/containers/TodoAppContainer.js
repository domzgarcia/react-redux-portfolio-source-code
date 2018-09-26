import React, {Component} from 'react';
import {connect} from 'react-redux';
import Link from 'react-router-dom/Link';

import {toggleCard, addTodo, addTodoLoader, fetchFromFirebase} from '../actions/action';

import TodoFormComp from '../components/TodoFormComp';
import TodoListContainer from './TodoListContainer';
import TodoFilterContainer from './TodoFilterContainer';

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
            <div>
            
                <div className="container -top-bottom-gutter align-left">
                    
                    {/* <Link to="/showcase" className="btn btn-back ">&#8678;back</Link> */}
                    <div className="clearfix"></div>
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
                </div>

                <div className="container">
                    <div className="inject-project-details">
                        <p className="title"><strong>Project description:</strong></p>
                        <div className="body">
                            <p> Simple todo app done in React-Redux, my first hands-on project with these js libraries. 
                                Todo app is one of the best example to implement Create, Read, Update, Delete (C.R.U.D.) functionality right after knowing how to make a "Hello World".
                                It also has some basic integration to firebase RESTful API for temporary database.
                                <br />
                                <br />
                                <a href="javascript:void(0);" className="-dullbadge">#react</a>
                                <a href="javascript:void(0);" className="-dullbadge">#redux</a>
                                <a href="javascript:void(0);" className="-dullbadge">#firebase</a>
                                <a href="javascript:void(0);" className="-dullbadge">#restAPI</a>
                            </p>
                        </div>
                    </div>
                </div>

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