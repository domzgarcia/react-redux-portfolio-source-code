import React, {Component} from 'react';
import {connect} from 'react-redux';
import {manageGoogleUser, changeScene} from '../actions/action';
import { SCENE_ROOMS_LIST } from '../actions/actionType';
import chatAppFirebase from '../services/chatAppFirebase';

class ChatHeaderContainer extends Component {
    constructor(props){
        super(props);
    }
    render(){
        let {isAuthenticated} = this.props;
        return (
            <div className="chat-navigation">
                <h3 className="wgreet">Chat Prototype</h3>
                {
                    isAuthenticated 
                    ?
                    <button className="signout" onClick={() =>{
                        
                        this.props.changeScene(SCENE_ROOMS_LIST);

                        chatAppFirebase.signOut()
                        .then((resp) => {
                            this.props.manageGoogleUser();
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


const mapStateToProps = (state) => ({
    isAuthenticated: state.chatStore.appUI.isAuthenticated,
});

const mapDispatchToProps = {
    manageGoogleUser: manageGoogleUser,
    changeScene: changeScene
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatHeaderContainer);