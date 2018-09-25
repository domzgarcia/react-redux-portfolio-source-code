import React, {Component} from 'react';
import {connect} from 'react-redux';
import Link from 'react-router-dom/Link';
import ChatProfileContainer from 'Containers/showcase/chat/ChatProfileContainer.js';
import ChatHeaderContainer from 'Containers/showcase/chat/ChatHeaderContainer.js';
import ChatRoomContainer from 'Containers/showcase/chat/ChatRoomContainer.js';

import {manageGoogleUser} from 'Actions/showcase/chat/action.js';
import chatAppFirebase from 'Services/chatAppFirebase.js';

class ChatAppContainer extends Component {
    constructor(props){
        super(props);
        this.handlerAuthStateChanged = this.handlerAuthStateChanged.bind(this)
    }
    
    componentDidMount(){
        if(!!chatAppFirebase.length()) return;

        chatAppFirebase.initialize();

        chatAppFirebase.onChange(this.handlerAuthStateChanged);
        // firebase.auth().signOut();
    }

    handlerAuthStateChanged(user){
        const bool = (user) ? true : false;
        if( ! user) return; 

        const userData = {
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            uid: user.uid,
        };
        this.props.manageGoogleUser(bool, userData);
    }

    render(){
        let {isAuthenticated} = this.props;
        return (
            <div className="container app-sample -custom-chat-width">
                <ChatHeaderContainer />
                { 
                    (isAuthenticated)
                    ?  <ChatRoomContainer />
                    :  <ChatProfileContainer />
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.chatStore.appUI.isAuthenticated
});

const mapDispatchToProps = {
    manageGoogleUser: manageGoogleUser
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatAppContainer);