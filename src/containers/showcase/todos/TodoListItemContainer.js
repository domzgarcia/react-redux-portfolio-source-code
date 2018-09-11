import React, {Component} from 'react';
import {connect} from 'react-redux';

import 'Components/showcase/todos/todo-item.css';
import {markedAsDone, editTodo, deleteTodo} from 'Actions/showcase/todos/action.js';
import FlickrLoaderComp from 'Components/FlickrLoaderComp.js';

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
            oldText: '',
            tempUID: 0
        };
    }
 
    handleChange(evt){
        const value = evt.target.value;
        this.setState({
            radioVal: !this.state.radioVal
        }, () => {
            this.props.markedAsDone(value, this.state.radioVal);    
        });
    }

    componentDidMount(){
        this.setState({
            radioVal: this.props.done
        });
    }

    handleDoubleClick(evt, data, uuid){
        this.setState({
            oldText: data
        }, 
        () => {
            this.setState({
                isHidden: true,
                tempText: data,
                tempUID: uuid,
            }, () => {
                const d = setTimeout(()=> {
                    clearTimeout(d);
                    this.tempInput.focus();
                }, 100);
            });
        });
    }

    handleTempTextChange(evt){
        this.setState({
            tempText: evt.target.value
        });
    }

    handleEditChange(evt){
        this.setState({isHidden: false}, () => {
            if(!!this.state.tempText.length && this.state.oldText !== this.state.tempText){
                this.props.editTodo(this.state.tempText, this.state.tempUID);
            }
        });
    }

    handleDelete(uuid){
        this.props.deleteTodo(uuid);
    }

    render(){
        let {name, done, uuid, savedFirebase, isLoading, targetId} = this.props;
        let isDone = (done) ? '-active' : '';
        let textVisibility      = (this.state.isHidden) ? '-hidden' : '';
        let tempInputVisibility = (this.state.isHidden) ? '-show' : '';
        let firebaseBadgeVisibility = (savedFirebase) ? '-active' : '';
        let localStorageBadgeVisibility = (false) ? '-active' : '';
        let isSelfLoading = (uuid===targetId && isLoading===true) ? true : false;
    
        return (
            <li className="list-item">

                <FlickrLoaderComp isLoading={isSelfLoading}/>

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
                        <span className={"-badge -fb "+firebaseBadgeVisibility}>FIREBASE</span>
                        <span className={"-badge -ls "+localStorageBadgeVisibility}>LOCALSTORAGE</span>
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

const mapStateToProps = (state) => ({
    isLoading: state.todoAppUI.isLoading,
    targetId: state.todoAppUI.targetId
});

const mapDispatchToProps = {
    markedAsDone: markedAsDone,
    editTodo: editTodo,
    deleteTodo: deleteTodo
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoListItemContainer);