import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createMessage} from 'Actions/showcase/chat/action.js';
import firebase from 'firebase';

class ChatRoomPlatform extends Component {
    constructor(props){
        super(props);
        this.handleSubmit             = this.handleSubmit.bind(this);
        this.handleChange             = this.handleChange.bind(this);
        this.handleAddedMessageSocket = this.handleAddedMessageSocket.bind(this);
        this.state = {
            userMessage: '',
            room: []
        }
    }
    componentDidMount(){
        const {rid, rooms} = this.props;
        let currentRoom = rooms.filter( (room) => { return room.rid === rid })[0];
        
        this.setState({
            room: currentRoom
        });

        firebase.database().ref(`/rooms/${rid}/messages`)
            .on('child_added', this.handleAddedMessageSocket);
    }

    componentWillReceiveProps(){
        // ...
        // alert('Receiving\n'+JSON.stringify(this.props,null,2));
    }

    handleSubmit(evt){
        evt.preventDefault();
        // alert(this.state.userMessage);
        const {rid, userData} = this.props;
        const messageData = {
            rid: rid,
            displayName: userData.displayName,
            email: userData.email,
            uid: userData.uid,
            text: this.state.userMessage,
            createdAt: Date.now()
        };

        if(!this.state.userMessage) return;

        this.props.createMessage(messageData);

        // evt.target.reset();

        this.setState({ userMessage: '' });
    }

    handleChange(evt){
        const {value} = evt.target;
        if(!value.length) return;
        this.setState({
            userMessage: value
        });
    }

    handleAddedMessageSocket(snapshot){
        const message = snapshot.val();

        let currentRoom = this.state.room;

        currentRoom.messages.push(message);

        this.setState({
            room: currentRoom
        }, 
        () => {
            var element = document.getElementById('messages');
            element.scrollIntoView({behavior: 'instant', block: 'end', inline: 'nearest'});
        });
    }

    render(){
        let {room} = this.state;
        let {userData} = this.props;

        const roomComp = function(room){
            if(room.hasOwnProperty('messages')){
                if(!room.messages.length) return;
                return room.messages.map((message, idx)=> {
                    let toRight = (message.email === userData.email) ? '-right' : '';
                    return (
                        <li key={idx}>
                            <div className={"item-user "+toRight}>
                                <p className="username">
                                    <span>{message.displayName}</span>
                                    <span className="timestamp">&nbsp;&lt;{message.createdAt}&gt;</span>
                                </p>
                                <span className="message">{message.text}</span>                                    
                            </div>
                        </li>
                    )
                })
            }
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

                        <div className="overflowY">

                            <ul id="messages">
                                
                                {roomComp(room)}

                                {/*}
                                <li>
                                    <div className="item-user">
                                        <p className="username"><span>Christina Joy</span><span className="timestamp">&nbsp;&lt;Sept 9 2018, 9:30 PM&gt;</span></p>
                                        <span className="message">Hello world, what are you doing?</span>                                    
                                    </div>
                                </li>
                                <li>
                                    <div className="item-user -right">
                                        <p className="username"><span>Domz Garcia</span><span className="timestamp">&nbsp;&lt;Sept 9 2018, 9:30 PM&gt;</span></p>
                                        <div className="clearfix"></div>
                                        <span className="message">A quick brown!</span>
                                    </div>
                                </li>
                                */}
                            </ul>
                        </div>

                        <div className="inputPanelCont">
                            <form onSubmit={this.handleSubmit}>
                                <textarea name="messages" 
                                value={this.state.userMessage}
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
    rooms: state.chatStore.rooms
});

const mapDispatchToProps = {
    createMessage: createMessage
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoomPlatform);