import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

class ShowcaseContainer extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="container -top-bottom-gutter"> 
                <h1>Showcase Page</h1>
                <Link to="/showcase/todo-app">Todo App</Link>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {};
};
const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowcaseContainer);