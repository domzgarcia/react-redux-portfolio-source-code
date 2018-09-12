import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import moment from 'moment';
import {createRoom} from 'Actions/showcase/chat/action.js';

class ChatCreateRoomContainer extends Component {
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeDescription = this.handleChangeDescription.bind(this);
        this.handleChangeRoomTitle = this.handleChangeRoomTitle.bind(this);
        this.handleAutoJoin = this.handleAutoJoin.bind(this);

        this.state = {
            roomTitle: '',
            roomDescript: '',
            createdBy: '',
            createdAt: 0,
            isPrivate: false,
        };
    }

    handleSubmit(e){
        e.preventDefault();
        const roomData = {
            title: this.state.roomTitle,
            description: this.state.roomDescript,
            createdBy: this.props.userData.email,
            createdAt: moment().format('MMMM Do YYYY, h:mm:ss a'),
            isPrivate: this.state.isPrivate,
        }
        this.props.createRoom(roomData);
    }
    handleChangeDescription(evt){
        this.setState({
            roomDescript: evt.target.value
        });
    }
    handleChangeRoomTitle(evt){
        this.setState({
            roomTitle: evt.target.value
        });
    }
    handleAutoJoin(){
        this.setState({
            isPrivate: !this.state.isPrivate
        });
    }
    
    render(){
        // console.log('debugState:', this.props.debugState);

        return (
            <div>
                <h3>Create Room</h3>
                <hr></hr>
                <form className="custom-form" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label className="form-lbl">Room name:</label>
                        <input type="text" onChange={this.handleChangeRoomTitle}/>
                    </div>
                    <div className="form-group">
                        <label className="form-lbl">Description:</label>
                        <input type="text" onChange={this.handleChangeDescription}/>
                    </div>
                    <div className="form-group">
                        <label className="form-lbl"> <input type="checkbox" checked={this.state.isPrivate} onClick={this.handleAutoJoin}/> Auto join</label>
                    </div>
                    <button type="submit">Create</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    // debugState: state,
    userData: state.chatStore.user.userData
});

const mapDispatchToProps = {
    createRoom: createRoom
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatCreateRoomContainer);