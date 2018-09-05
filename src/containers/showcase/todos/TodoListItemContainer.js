import React, {Component} from 'react';
import {connect} from 'react-redux';

import 'Components/showcase/todos/todo-item.css';
import {markedAsDone, editTodo} from 'Actions/showcase/todos/action.js';

class TodoListItemContainer extends Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleDoubleClick = this.handleDoubleClick.bind(this);
        this.handleTempTextChange = this.handleTempTextChange.bind(this);
        this.handEditChange = this.handEditChange.bind(this);

        this.state = {
            radioVal: false,
            isHidden: false,
            tempText: '',
            tempUID: 0
        };
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
        console.log(data, uid);
    }

    handleTempTextChange(evt){
        this.setState({
            tempText: evt.target.value
        });
    }

    handEditChange(evt){
        this.setState({isHidden: false});
        if(!!this.state.tempText.length){
            this.props.editTodo(this.state.tempText, this.state.tempUID);
        }
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
                    onKeyPress={ (evt) => {
                        if(evt.key==='Enter'){
                            this.handEditChange();
                        }
                    }}
                    onBlur={ () =>{
                        this.handEditChange();
                    }}
                />
                <p className={"item "+isDone+" "+textVisibility} 
                    value={name} 
                    onDoubleClick={
                    (e) => {
                        this.handleDoubleClick(e, name, uid);
                    }
                }>{name}</p>
            </li>
        )
    }
}

const mapDispatchToProps = {
    markedAsDone: markedAsDone,
    editTodo: editTodo
};

export default connect(null, mapDispatchToProps)(TodoListItemContainer);