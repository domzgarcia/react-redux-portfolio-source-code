import React, {Component} from 'react';
import {connect} from 'react-redux';
import Link from 'react-router-dom/Link';
import ChatProfileContainer from 'Containers/showcase/chat/ChatProfileContainer.js';
import ChatHeaderContainer from 'Containers/showcase/chat/ChatHeaderContainer.js';
import ChatRoomContainer from 'Containers/showcase/chat/ChatRoomContainer.js';

import {signInGoogle} from 'Actions/showcase/chat/action.js';
import firebase from 'firebase';

class ChatAppContainer extends Component {
    constructor(props){
        super(props);
    }
    
    componentDidMount(){
        if(!!firebase.apps.length) return;

        firebase.initializeApp({
            apiKey: 'AIzaSyDFlY0a3c8dACo3t-nVL9g5VI631oFpdx8',
            databaseURL: 'myspace-a310c.firebaseio.com',
            authDomain: 'myspace-a310c.firebaseapp.com',
            messagingSenderId: '581264642196',
            projectId: 'myspace-a310c',
        }); 
        firebase.auth().onAuthStateChanged(this.handlerAuthStateChanged.bind(this));
        // firebase.auth().signOut();
    }

    handlerAuthStateChanged(user){
        console.log('CHANGE_MAKE_UPDATE_TO_USER');
        const bool = (user) ? true : false;
        if( ! user) return; 
        
        const userData = {
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
        };
        this.props.signInGoogle(bool, userData);
    }

    render(){
        let {isAuthenticated} = this.props;
        return (
            <div className="container app-sample -custom-chat-width">
                <ChatHeaderContainer />
                { 
                    isAuthenticated 
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
    signInGoogle: signInGoogle
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatAppContainer);