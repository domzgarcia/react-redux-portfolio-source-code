import React, {Component} from 'react';
import {connect} from 'react-redux';
import Link from 'react-router-dom/Link';
import ChatProfileContainer from './ChatProfileContainer';
import ChatHeaderContainer from './ChatHeaderContainer';
import ChatRoomContainer from './ChatRoomContainer';

import {manageGoogleUser} from '../actions/action';
import chatAppFirebase from '../services/chatAppFirebase';

/**
 * Start Project: Sept 11 2018
 * Ended at: Sept 25 2018
 */

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
            <div>
                <div className="container app-sample -custom-chat-width">
                    <ChatHeaderContainer />
                    { 
                        (isAuthenticated)
                        ?  <ChatRoomContainer />
                        :  <ChatProfileContainer />
                    }
                </div>

                <div className="container">
                    <div className="inject-project-details">
                        <p className="title"><strong>Project description:</strong></p>
                        <div className="body">
                            <p> Simple chat prototype venturing in a quite complex async calls using redux-thunk. Integrated to firebase Functions and ExpressJS
                                basic server setup. I have learned async-await, promises, es6 and some basic firebase admin.database APIs. Skeleton loader example
                                for good UI/UX support.
                                <br />
                                <br />
                                <a href="javascript:void(0);" className="-dullbadge">#react-redux</a>
                                <a href="javascript:void(0);" className="-dullbadge">#Google-SignIn</a>
                                <a href="javascript:void(0);" className="-dullbadge">#firebase-functions</a>
                                <a href="javascript:void(0);" className="-dullbadge">#ExpressJS</a>
                                <a href="javascript:void(0);" className="-dullbadge">#Async-Await-Promises</a>
                                <a href="javascript:void(0);" className="-dullbadge">#CSS Skeleton</a>
                            </p>
                        </div>
                    </div>
                </div>
                
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