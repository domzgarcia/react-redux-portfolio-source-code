import React, {Component} from 'react';
import {connect} from 'react-redux';

import 'Components/showcase/todos/todo-item.css';
import {markedAsDone, editTodo, deleteTodo} from 'Actions/showcase/todos/action.js';

class TodoListItemContainer extends Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleDoubleClick = this.handleDoubleClick.bind(this);
        this.handleTempTextChange = this.handleTempTextChange.bind(this);
        this.handleEditChange = this.handleEditChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);

        this.state = {
            radioVal: false,
            isHidden: false,
            tempText: '',
            tempUID: 0
        };

        console.log(this.props);
    }
    
    handleChange(evt){
        this.setState({
            radioVal: !this.state.radioVal
        });
        this.props.markedAsDone(evt.target.value);
    }

    handleDoubleClick(evt, data, uid){
        this.setState({
            isHidden: true,
            tempText: data,
            tempUID: uid
        });
        this.tempInput.focus();

        console.log(data, uid);
    }

    handleTempTextChange(evt){
        this.setState({
            tempText: evt.target.value
        });
    }

    handleEditChange(evt){
        this.setState({isHidden: false});
        if(!!this.state.tempText.length){
            this.props.editTodo(this.state.tempText, this.state.tempUID);
        }
    }

    handleDelete(uid){
        this.props.deleteTodo(uid);
    }

    render(){
        let {name, done, uid} = this.props;
        let isDone = (done) ? '-active' : '';
        let textVisibility      = (this.state.isHidden) ? '-hidden' : '';
        let tempInputVisibility = (this.state.isHidden) ? '-show' : '';

        return (
            <li className="list-item">
                <input type="checkbox" 
                    value={uid}
                    checked={this.state.radioVal} 
                    onChange={this.handleChange}/>

                <input value={this.state.tempText} className={"tempInput "+tempInputVisibility}
                    onChange={this.handleTempTextChange}

                    ref={(input) => {
                        this.tempInput = input;
                    }}
                    onKeyPress={(evt) => {
                        if(evt.key==='Enter'){
                            this.handleEditChange();
                        }
                    }}
                    onBlur={ () =>{
                        this.handleEditChange();
                    }}
                />
                <p className={"item "+isDone+" "+textVisibility} 
                    value={name} 
                    onDoubleClick={
                    (e) => {
                        this.handleDoubleClick(e, name, uid);
                    }
                }>{name}</p>

                <button className="btn-delete" onClick={() => {
                    this.handleDelete(uid);
                }}>
                <span>&#x2612;</span></button>
            </li>
        )
    }
}

const mapDispatchToProps = {
    markedAsDone: markedAsDone,
    editTodo: editTodo,
    deleteTodo: deleteTodo
};

export default connect(null, mapDispatchToProps)(TodoListItemContainer);