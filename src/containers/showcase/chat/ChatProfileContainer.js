import React, {Component} from 'react';
import {connect} from 'react-redux';
import 'Components/showcase/chat/main.scss';
import chatAppFirebase from 'Services/chatAppFirebase.js';
import {addNewUser} from 'Actions/showcase/chat/action.js';

class ChatProfileContainer extends Component {

    constructor(props){
        super(props);
        this.handlerSignInGoogle = this.handlerSignInGoogle.bind(this);
    }

    componentDidMount(){
        // nothing here
    }

    handlerSignInGoogle(){
        chatAppFirebase.signInWithPopup()
            .then( (resp) => {
                let {user} = resp;
                if(!user) return;

                const userData = {
                    displayName: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL,
                    uid: user.uid,
                };
                this.props.addNewUser(userData);
            })
            .catch((e) => {
                alert('sign in disconnected \n' + JSON.stringify(e), null, 2);
            });
    }
    render(){
        const profileVisible = (! this.props.isAuthenticated) ? '-active' : '';

        return (
            <div className={"profile "+profileVisible}>
                <p>Sign in with:</p>
                <button className="btn-trigger-google-popup" onClick={this.handlerSignInGoogle}>Google Account</button>
                
                {/* <button onClick={()=>{
                    alert(JSON.stringify( firebase.auth().currentUser ));
                }}>Get Context User</button> */}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.chatStore.user.isAuthenticated,
});

const mapDispatchToProps = {
    addNewUser: addNewUser
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatProfileContainer);