import React, {Component} from 'react';
import {connect} from 'react-redux';
import ChatRoomListContainer from 'Containers/showcase/chat/ChatRoomListContainer.js';
import ChatRoomPlatform from 'Containers/showcase/chat/ChatRoomPlatform.js';
import DynamicPopUpContainer from 'Containers/DynamicPopUpContainer.js';
import { POPUP_CREATE_ROOM, SCENE_CHATROOM, SCENE_ROOMS_LIST } from 'Actions/showcase/chat/actionType.js';
import { setPopUpType, closeOpenPopup, changeScene } from 'Actions/showcase/chat/action.js';

class ChatRoomContainer extends Component {
    constructor(props){
        super(props);
        this.handlerOpenPopup = this.handlerOpenPopup.bind(this);
        this.handlerLeaveRoom = this.handlerLeaveRoom.bind(this);
    }

    handlerOpenPopup(){
        this.props.setPopUpType(POPUP_CREATE_ROOM);
        this.props.closeOpenPopup();
    }

    handlerLeaveRoom(){
        this.props.changeScene(SCENE_ROOMS_LIST);
    }

    componentDidMount(){
        // ...
    }

    render (){
        let {userData, popupBool, scene} = this.props;
        
        console.log(scene);

        return (
            <div>
                    <DynamicPopUpContainer 
                        isOpen={popupBool}
                        openPopup={this.handlerOpenPopup}/>

                <div className="chatroom">
                    <div className="profileCont">
                        <div className="imgCont">
                            <img src={userData.photoURL || ''}/>
                        </div>
                        <div className="description">
                            <p className="name">{userData.displayName || 'default name'}</p>
                            <p className="email">{userData.email || 'default@email.com'}</p>
                        </div>
                        
                        <div className="btnCont">
                            {scene === SCENE_ROOMS_LIST 
                            ? <button onClick={this.handlerOpenPopup}>Create Room</button>
                            : <button onClick={this.handlerLeaveRoom}>Leave Room</button>
                            }
                        </div>
                    </div>

                    {((scene) => {
                        switch(scene){
                            case SCENE_ROOMS_LIST:
                                return <ChatRoomListContainer />
                            case SCENE_CHATROOM:
                                return <ChatRoomPlatform />
                            default:
                                return (<div>Page 404</div>)
                        }
                    })(scene)}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    userData: state.chatStore.user.userData,
    popupBool: state.chatStore.appUI.isPopupOpen,
    scene: state.chatStore.appUI.scene,
});

const mapDispatchToProps = {
    setPopUpType: setPopUpType,
    closeOpenPopup: closeOpenPopup,
    changeScene: changeScene,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoomContainer);