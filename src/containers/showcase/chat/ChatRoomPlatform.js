import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createMessage,emptyMessagesByRoomId, addMessage} from 'Actions/showcase/chat/action.js';
import firebase from 'firebase';
import moment from 'moment';

class ChatRoomPlatform extends Component {
    constructor(props){
        super(props);
        this.handleSubmit             = this.handleSubmit.bind(this);
        this.handleChange             = this.handleChange.bind(this);
        this.handleAddedMessageSocket = this.handleAddedMessageSocket.bind(this);
        this.state = {
            text: ''
        };
    }

    componentWillMount(){
        const {rid} = this.props;
        this.props.emptyMessagesByRoomId(rid);
    }

    componentDidMount(){
        const {rid, rooms} = this.props;
        // let currentRoom = rooms.filter( (room) => { return room.rid === rid })[0];
        firebase.database().ref(`/rooms/${rid}/messages`)
            .on('child_added', this.handleAddedMessageSocket);
    }

    componentWillReceiveProps(){
        // alert('Receiving\n'+JSON.stringify(this.props,null,2));
    }

    handleSubmit(evt){
        evt.preventDefault();

        const {rid, userData} = this.props;

        const messageData = {
            rid: rid,
            displayName: userData.displayName,
            email: userData.email,
            uid: userData.uid,
            text: this.state.text,
            createdAt: Date.now()
        };

        if(!!this.state.text){
            this.props.createMessage(messageData);
            this.setState({ text: '' });
        }
        // evt.target.reset();
    }

    handleChange(evt){
        const word = evt.target.value;
        this.setState({
            text: word
        });    
    }

    handleAddedMessageSocket(snapshot){
        const message = snapshot.val();
        const {rid} = this.props;
        this.props.addMessage(rid, message);
        // scroll to top
    }

    render(){
        let {rooms, messages, rid} = this.props;
        let {userData} = this.props;
        let room = rooms.filter((room) => {
            return room.rid === rid;
        })[0];

        const utilsTimeAgo = function(epoch){
            return moment(epoch).fromNow();
        }

        const roomComp = function(messages){
            // if(room.hasOwnProperty('messages')){
                
            if(!messages.length) return;

            return messages.map((message, idx)=> {
                let toRight = (message.email === userData.email) ? '-right' : '';
                let self    = (message.email === userData.email) ? '-self' : '';
                return (
                    <li key={idx}>
                        <div className={"item-user "+toRight}>
                            <p className="username">
                                <span>{message.displayName}</span>
                                <span className="timestamp">&nbsp;&lt;{utilsTimeAgo(message.createdAt)}&gt;</span>
                            </p>
                            <span className={"message "+self}>{message.text}</span>                                    
                        </div>
                    </li>
                )
            })
        }

        return (
            <div className="chatplatform">  
                <div className="chatHeaderPanel">
                    <p className="chatName">{room.title}</p>
                    <p className="chatDesc">{room.description}</p>
                </div>
                
                <div className="messagesCont">
                    {/* Message Panel */}
                    <div className="messagesPanelCont">
                        <div className="bodyOverflowY">
                            <ul id="messages">
                                {roomComp(messages)}
                            </ul>
                        </div>

                        <div className="inputPanelCont">
                            <form onSubmit={this.handleSubmit}>
                                <textarea name="messages" 
                                value={this.state.text}
                                onChange={this.handleChange}
                                onKeyPress={(evt) => {
                                    if(evt.key==='Enter'){
                                        this.handleSubmit(evt);
                                    }
                                }}
                                ></textarea>
                                <button type="submit" className="btnSend">Send</button>
                            </form>
                        </div>    
                    </div>
                    {/* Visitor Panel */}
                    <div className="visitorsCont">
                        <div className="header">
                            <p>Visitors (3)</p>
                        </div>
                        <div className="searchComp">
                            <p className="lblSearch">Search User:</p>
                            <input type="text"/>
                        </div>
                        <ul className="visitors">
                            <li>
                                <div className="visitorDisplay">
                                    <p className="name">Domz Garcia</p>
                                </div>
                            </li>
                            <li>
                                <div className="visitorDisplay">
                                    <p className="name">Christina Joy</p>
                                </div>
                            </li>
                            <li>
                                <div className="visitorDisplay">
                                    <p className="name">Moderator 101</p>
                                </div>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    rid: state.chatStore.user.selectedRoom,
    userData: state.chatStore.user.userData,
    rooms: state.chatStore.rooms,
    messages: state.chatStore.tempMessages,
    debugState: state,
});

const mapDispatchToProps = {
    createMessage           : createMessage,
    emptyMessagesByRoomId   : emptyMessagesByRoomId,
    addMessage              : addMessage
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoomPlatform);