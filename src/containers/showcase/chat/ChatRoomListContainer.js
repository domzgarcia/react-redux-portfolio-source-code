import React, {Component} from 'react';
import {connect} from 'react-redux';
import {joinRoom, getServerTime, changeScene, addRoom, emptyRooms, emptyMessagesByRoomId,fetchRooms} from 'Actions/showcase/chat/action.js';
import {SCENE_CHATROOM} from 'Actions/showcase/chat/actionType';
import chatAppFirebase from 'Services/chatAppFirebase';
import FlickrLoaderComp from 'Components/FlickrLoaderComp';
import ChatRoomListSkeletonComp from '../../../components/showcase/chat/ChatRoomListSkeletonComp';

class ChatRoomListContainer extends Component {
    constructor(props){
        super(props);
        this.handleSelectRoom = this.handleSelectRoom.bind(this);
        this.handleAddedRoomSocket = this.handleAddedRoomSocket.bind(this);
    }

    componentDidMount(){

        this.props.emptyRooms();

        this.props.fetchRooms();

        chatAppFirebase.onPopulateRooms(this.handleAddedRoomSocket);
    }
    
    componentWillUnmount(){
        chatAppFirebase.detachedAddRooms(this.handleAddedRoomSocket);
    }

    handleAddedRoomSocket(snapshot){
        const room = snapshot.val();
        // alert(JSON.stringify(room, null, 2));
        this.props.addRoom(room);
    }

    handleSelectRoom(roomId = 0){
        let {userData} = this.props;
        this.props.emptyMessagesByRoomId(roomId);

        this.props.joinRoom(
            {...userData, rid: roomId}, 
            () => {
                this.props.changeScene(SCENE_CHATROOM);        
            });
        this.props.getServerTime();
    }

    renderRoom({title, description,name, idx, rid }){
        return ( 
            <li className="item" key={idx} onClick={()=>{
                this.handleSelectRoom(rid);
            }}>
                <p className="name">{title}</p>
                <p className="description">{description}</p>
                <p className="createdBy">{name}</p>
            </li>
        )
    }

    render(){
        let {rooms, roomCycle} = this.props;
        
        return (
            <div className="chatRoomCont">
                <div className="roomsCont">
                <p className="lbl-rooms"> Available Rooms:</p>
                    <ul className="list -relative-content">
                        
                        {(!!rooms.length)
                        ? rooms.map( (room, idx) => {
                            return this.renderRoom({...room, idx})
                        })
                        : <ChatRoomListSkeletonComp len={3} isLoading={roomCycle}/> } 
                    </ul>
                </div>
        </div>
        )
    }
}

// export default ;

const mapStateToProps = (state) => ({
    debugState: state,
    rooms: state.chatStore.rooms,
    userData: state.chatStore.user.userData,
    roomCycle: state.chatStore.appUI.roomCycle
});

const mapDispatchToProps = {
    joinRoom: joinRoom,
    changeScene: changeScene,
    addRoom: addRoom,
    emptyRooms: emptyRooms,
    emptyMessagesByRoomId: emptyMessagesByRoomId,
    fetchRooms: fetchRooms,
    getServerTime: getServerTime
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoomListContainer);
