import React, {Component} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import {createRoom,closeOpenPopup} from 'Actions/showcase/chat/action.js';

class ChatCreateRoomContainer extends Component {
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeDescription = this.handleChangeDescription.bind(this);
        this.handleChangeRoomTitle = this.handleChangeRoomTitle.bind(this);
        this.handleAutoJoin = this.handleAutoJoin.bind(this);
        this.handlePassword = this.handlePassword.bind(this);

        this.state = {
            roomTitle: '',
            roomDescript: '',
            createdBy: '',
            createdAt: 0,
            isPrivate: false,
            password: ''
        };
    }

    handlePassword(e){
        this.setState({
            password: e.target.value
        });
    }

    fixName(title){
        const arr = title.split('');
        const arr0 = arr[0].charAt(0).toUpperCase();
        arr[0] = arr0;
        const fixedTitle = arr.join('');
        return fixedTitle;
    }

    handleSubmit(e){
        e.preventDefault();

        if(!this.state.roomTitle.length || !this.state.roomDescript.length) return;
        
        const roomData = {
            title: this.fixName(this.state.roomTitle),
            description: this.state.roomDescript,
            createdBy: this.props.userData.email,
            createdAt: moment().format('MMMM Do YYYY, h:mm:ss a'),
            isPrivate: this.state.isPrivate,
            password: (this.state.isPrivate) ? this.state.password : 'default'
        }

        e.target.reset();
        this.props.createRoom(roomData);
        
        this.setState({
            roomTitle: '',
            roomDescript: '',
            createdBy: '',
            createdAt: 0,
            isPrivate: false,
        },
        () => {
            this.props.closeOpenPopup();
        }
        );
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
        let passwordVisibility = (this.state.isPrivate) ? '-active' : '';

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
                        <label className="form-lbl"> <input type="checkbox" checked={this.state.isPrivate} onClick={this.handleAutoJoin}/> Nominate Password</label>
                    </div>
                    <div className="form-group">
                        <input type="text" onChange={this.handlePassword} className={"nominatePasswordInput "+passwordVisibility}/>
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
    createRoom: createRoom,
    closeOpenPopup: closeOpenPopup
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatCreateRoomContainer);