import React, {Component} from 'react';
import {connect} from 'react-redux';
import Link from 'react-router-dom/Link';
import firebase from 'firebase';
import ChatRoomListContainer from 'Containers/showcase/chat/ChatRoomListContainer.js';
import ChatRoomPlatform from 'Containers/showcase/chat/ChatRoomPlatform.js';
import DynamicPopUpContainer from 'Containers/DynamicPopUpContainer.js';
import { POPUP_CREATE_ROOM } from 'Actions/showcase/chat/actionType.js';
import { setPopUpType } from 'Actions/showcase/chat/action.js';

class ChatRoomContainer extends Component {
    constructor(props){
        super(props);
        this.handlerOpenPopup = this.handlerOpenPopup.bind(this);
        this.state = {
            isPopupOpen: false
        }
    }

    handlerOpenPopup(){
        let {isPopupOpen} = this.state;
        this.setState({
            isPopupOpen: !isPopupOpen
        });
        this.props.setPopUpType(POPUP_CREATE_ROOM);
    }

    render (){
        let {userData} = this.props;
        
        return (
            <div>
                <div className="chatroom">
                    <hr/>
                    
                    <DynamicPopUpContainer 
                        isOpen={this.state.isPopupOpen}
                        openPopup={this.handlerOpenPopup}/>

                    <div className="profileCont">
                        <div className="imgCont">
                            <img src={userData.photoURL || ''}/>
                        </div>
                        <div className="description">
                            <p className="name">{userData.displayName || 'default name'}</p>
                            <p className="email">{userData.email || 'default@email.com'}</p>
                        </div>
                        <div className="btnCont">
                            <button onClick={this.handlerOpenPopup}>Create Room</button>
                        </div>
                    </div>
                    <hr/>

                    <ChatRoomListContainer />

                    <ChatRoomPlatform />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    userData: state.chatStore.user.userData
});

const mapDispatchToProps = {
    setPopUpType: setPopUpType
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoomContainer);