import React, {Component} from 'react';
import {connect} from 'react-redux';
import Link from 'react-router-dom/Link';

import './showcase.css';
import './todo.css';

class TodoAppContainer extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="container -top-bottom-gutter align-left">
                <Link to="/showcase" className="btn btn-back ">&#8678;back</Link>
                <h1 className="page-title">Todo App</h1>

                <div className="app-sample">
                    <div className="top-nav">
                        <button className="btn-add">&#10133; &nbsp;Add Todo</button>
                    </div>




                    <div className="card">
                        <div className="title">New todo</div>
                        <input type="text"/>
                        <button className="btn-add -green pull-right">Submit</button>
                        <div className="clearfix"></div>
                    </div>




                    <div className="todos">
                        <ul className="list">
                            <li>
                                sample
                            </li>
                            <li>
                                sample
                            </li> 
                        </ul>
                    </div>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(TodoAppContainer);