import React, {Component} from 'react';
import {connect} from 'react-redux';
import {joinRoom} from 'Actions/showcase/chat/action.js';

class ChatRoomListContainer extends Component {
    constructor(props){
        super(props);
        this.handleSelectRoom = this.handleSelectRoom.bind(this);
    }

    handleSelectRoom(roomId=0){
        let {userData} = this.props;
        this.props.joinRoom({rid: roomId, uid: userData.uid});
    }

    render(){
        let {rooms} = this.props;
        // console.log(this.props.debugState);
        return (
            <div className="chatRoomCont">
                <div className="roomsCont">
                <p className="lbl-rooms"> Available Rooms:</p>
                    <ul className="list">
                        {rooms.map( (room, idx) => {
                            return ( 
                                <li className="item" key={idx} onClick={()=>{
                                    this.handleSelectRoom(room.id);
                                }}>
                                    <p className="name">{room.title}</p>
                                    <p className="description">{room.description}</p>
                                    <p className="createdBy">{room.name}</p>
                                </li>
                            )
                        })}
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
    userData: state.chatStore.user.userData
});

const mapDispatchToProps = {
    joinRoom: joinRoom
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoomListContainer);
