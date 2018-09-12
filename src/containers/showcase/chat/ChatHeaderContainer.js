import React, {Component} from 'react';
import {connect} from 'react-redux';
import Link from 'react-router-dom/Link';
import firebase from 'firebase';
import {signInGoogle} from 'Actions/showcase/chat/action.js';

class ChatHeaderContainer extends Component {
    constructor(props){
        super(props);
    }
    render(){
        let {isAuthenticated} = this.props;
        return (
            <div className="chat-navigation">
                <h3 className="wgreet">Simple Chat</h3>
                {
                    isAuthenticated 
                    ?
                    <button className="signout" onClick={() =>{
                        firebase.auth().signOut()
                        .then((resp) => {
                            this.props.signInGoogle();
                        })
                        .catch((resp) => {
                            if(resp.error){
                                alert('Google Signout Error');
                            }
                        })
                    }}>Logout</button>
                    : ''
                }
                <div className="clearfix"></div>
            </div>
        )
    }
}

const mapDispatchToProps = {
    signInGoogle: signInGoogle
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.chatStore.appUI.isAuthenticated
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatHeaderContainer);