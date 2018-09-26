import React, {Component} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import {addNewRoom, closeOpenPopup} from 'Actions/showcase/chat/action.js';

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
            userEmail: '',
            displayName: '',
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
        
        let roomname = document.getElementsByName('roomname');
        let roomnameErr = roomname[0].parentNode.childNodes[2];

        let description = document.getElementsByName('description');
        let descriptionErr = description[0].parentNode.childNodes[2];
        // Room name
        switch(true){
            case (!this.state.roomTitle.length):
            roomnameErr.classList.add('-active');
            break;
            case (!!this.state.roomTitle.length):
            roomnameErr.classList.remove('-active');
            break;
        }
        // Room description 
        switch(true){
            case (!this.state.roomDescript.length):
            descriptionErr.classList.add('-active');
            break;
            case (!!this.state.roomDescript.length):
            descriptionErr.classList.remove('-active');
            break;
        }

        if(!this.state.roomTitle.length || !this.state.roomDescript.length) return;
        
        const roomData = {
            uid: this.props.userData.uid,
            title: this.fixName(this.state.roomTitle),
            description: this.state.roomDescript,
            email: this.props.userData.email,
            name: this.props.userData.displayName,
            created_at: Date.now(),//moment().format('MMMM Do YYYY, h:mm:ss a'),
            privated: this.state.isPrivate,
            password: (this.state.isPrivate) ? this.state.password : 'default',
            rid: '-will-generate-rid-in-the-server-',
            messages: {}
        };

        this.props.addNewRoom(roomData, 
        ()=> {
            this.setState({
                roomTitle: '',
                roomDescript: '',
                userEmail: '',
                displayName: '',
                createdAt: 0,
                isPrivate: false,
            });
            this.props.closeOpenPopup();
        });
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
            
            <div className="create-room-popup">
                <h3>Create Room</h3>
                <hr></hr>
                <form className="custom-form" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label className="form-lbl">Room name:<span className="-red">*</span></label>
                        <input type="text" className="form-input" value={this.state.roomTitle} name="roomname" onChange={this.handleChangeRoomTitle}/>
                        <p className="error">Room name is required.</p>
                    </div>
                    <div className="form-group">
                        <label className="form-lbl">Description:<span className="-red">*</span></label>
                        <input type="text" className="form-input" value={this.state.roomDescript} name="description" onChange={this.handleChangeDescription}/>
                        <p className="error">Description is required.</p>
                    </div>
                    {/* <div className="form-group">
                        <label className="form-lbl"> <input type="checkbox" checked={this.state.isPrivate} onClick={this.handleAutoJoin}/> Nominate Password</label>
                    </div> */}
                    <div className="form-group">
                        <input type="text" onChange={this.handlePassword} className={"nominatePasswordInput "+passwordVisibility}/>
                    </div>
                    <div className="form-btn-wrap">
                        <button type="submit">Create</button>
                    </div>
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
    addNewRoom: addNewRoom,
    closeOpenPopup: closeOpenPopup
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatCreateRoomContainer);