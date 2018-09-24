import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createMessage,
    emptyMessagesByRoomId, 
    addMessage, 
    fetchRoomData} from 'Actions/showcase/chat/action.js';

import ChatRoomMessage from 'Containers/showcase/chat/ChatRoomMessage.js';
import FlickrLoaderComp from 'Components/FlickrLoaderComp'; 
import chatAppFirebase from 'Services/chatAppFirebase';

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

    componentDidMount(){
        const {rid} = this.props;
        
        this.props.emptyMessagesByRoomId(rid);

        chatAppFirebase.onChildAdded(rid, this.handleAddedMessageSocket);
        
        this.props.fetchRoomData(rid);
    }

    componentWillUnmount(){
        const {rid} = this.props;
        chatAppFirebase.detachedAddMessages(rid, this.handleAddedMessageSocket);
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
            
            this.setState({ text: '' },
            () => {} );
        }
        return false;
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

        const delay = setTimeout(() => {
            clearTimeout(delay);
            const listItems = document.querySelectorAll('#messages li');
            listItems[listItems.length-1].scrollIntoView()
        },14);
    }

    render(){
        let {rooms, rid, tempMessages, messageCycle} = this.props;
        let room = rooms.filter((room) => {
            return room.rid === rid;
        })[0];
        const roomReady = (room) ? true : false;

        return (
            <div className="chatplatform">  
                <div className="chatHeaderPanel">
                    <p className="chatName">{(roomReady) ? room.title : 'Loading...'}</p>
                    <p className="chatDesc">{(roomReady) ? room.description : 'Loading...'}</p>
                </div>
                
                <div className="messagesCont">
                    {/* Message Panel */}
                    <div className="messagesPanelCont">

                        <div className="bodyOverflowY -relative-content">
                            <ul id="messages">
                            
                            <FlickrLoaderComp isLoading={messageCycle}/>

                            {   (!!tempMessages.length)
                                ? tempMessages.map( (message, idx) => {
                                    return (<li key={idx}>
                                        <ChatRoomMessage {...message} />
                                    </li>)
                                })
                                : (messageCycle===false && tempMessages.length===0)
                                ? (<p>Be the first to make a message here! :D</p>)
                                : <span></span>
                            }
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
    tempMessages: state.chatStore.tempMessages,
    userData: state.chatStore.user.userData,
    rooms: state.chatStore.rooms,
    messageCycle: state.chatStore.appUI.messageCycle,
});


const mapDispatchToProps = {
    emptyMessagesByRoomId   : emptyMessagesByRoomId,
    createMessage           : createMessage,
    addMessage              : addMessage,
    fetchRoomData           : fetchRoomData
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoomPlatform);