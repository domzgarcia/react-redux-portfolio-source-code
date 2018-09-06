import React, {Component} from 'react';
import {connect} from 'react-redux';

import 'Components/showcase/todos/todo-item.css';
import {markedAsDone, editTodo, deleteTodo} from 'Actions/showcase/todos/action.js';

class TodoListItemContainer extends Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleTempTextChange = this.handleTempTextChange.bind(this);
        // this.handleDoubleClick = this.handleDoubleClick.bind(this);
        // this.handleEditChange = this.handleEditChange.bind(this);
        // this.handleDelete = this.handleDelete.bind(this);

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

    componentDidMount(){
        this.setState({
            radioVal: this.props.done
        });

        console.log('tlic', this.props);
    }

    handleDoubleClick(evt, data, uuid){
        this.setState({
            isHidden: true,
            tempText: data,
            tempUID: uuid
        });

        let d = setTimeout(()=> {
            clearTimeout(d);
            this.tempInput.focus();
        }, 100);
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

    handleDelete(uuid){
        this.props.deleteTodo(uuid);
    }

    render(){
        let {name, done, uuid} = this.props;
        let isDone = (done) ? '-active' : '';
        let textVisibility      = (this.state.isHidden) ? '-hidden' : '';
        let tempInputVisibility = (this.state.isHidden) ? '-show' : '';

        return (
            <li className="list-item">
                <input type="checkbox" 
                    value={uuid}
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

                <div className={"item "+isDone+" "+textVisibility}>
                    <p value={name} 
                        onDoubleClick={
                        (e) => {
                            this.handleDoubleClick(e, name, uuid);
                        }
                    }>{name}</p>

                    <p>
                        <span className="-badge -fb">FIREBASE</span>
                        <span className="-badge -ls">LOCALSTORAGE</span>
                    </p>
                </div>

                <button className="btn-delete" onClick={() => {
                    this.handleDelete(uuid);
                }}>
                &#10006;</button>
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