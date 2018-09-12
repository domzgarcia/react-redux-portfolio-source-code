import React, {Component} from 'react';
import {connect} from 'react-redux';
import Link from 'react-router-dom/Link';
import firebase from 'firebase';
import 'Components/showcase/chat/main.scss';

class ChatProfileContainer extends Component {

    constructor(props){
        super(props);
        this.handlerSignInGoogle = this.handlerSignInGoogle.bind(this);
    }

    componentDidMount(){
        // nothing here
    }

    handlerSignInGoogle(){
        let self = this;
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then( (resp) => {
                console.log(resp);
            })
            .catch((e) => {
                alert('sign in disconnected \n' + JSON.stringify(e));
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
    isAuthenticated: state.chatStore.user.isAuthenticated
});

export default connect(mapStateToProps, null)(ChatProfileContainer);