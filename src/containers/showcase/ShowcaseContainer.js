import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import 'Containers/showcase/showcase.css';

import todosThumb from '../../assets/img/todos.png';

class ShowcaseContainer extends Component {
    constructor(props){
        super(props);
    }
    componentDidMount(){
        document.querySelector('title').innerText = 'Showcase Projects';
    }
    render(){
        return (
            <div className="container -top-bottom-gutter"> 
                <br />
                <h1>Showcase Projects</h1>
                <br />
                <ul className="showcase-list">
                    <li className="showcase-item">
                        <Link to="/showcase/todo-app">
                            <img src={todosThumb}/>
                            <p className="projectname">Todo App</p>
                        </Link>
                    </li>

                    <li className="showcase-item"></li>

                    <li className="showcase-item"></li>

                    <li className="showcase-item"></li>

                    <li className="showcase-item"></li>

                    <li className="showcase-item"></li>
                </ul>
                
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