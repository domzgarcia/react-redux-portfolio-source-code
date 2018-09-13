import React, {Component} from 'react';
import {connect} from 'react-redux';
import {changeScene} from 'Actions/showcase/chat/action.js';
import { SCENE_CHATROOM } from 'Actions/showcase/chat/actionType';

class ChatRoomListContainer extends Component {
    constructor(props){
        super(props);
        this.handleSelectRoom = this.handleSelectRoom.bind(this);
    }

    handleSelectRoom(id){
        console.log(id);
        this.props.changeScene(SCENE_CHATROOM);
    }

    render(){
        let {rooms} = this.props;
        // console.log(this.props.debugState);

        return (
            <div className="chatRoomCont">
                <div className="roomsCont">
                <p className="lbl-rooms"> Available Rooms:</p>
                    <ul className="list">
                        {rooms.map( (item, idx) => {
                            return ( 
                                <li className="item" key={item.id} onClick={()=>{
                                    this.handleSelectRoom(item.id);
                                }}>
                                    <p className="name">{item.title}</p>
                                    <p className="description">{item.description}</p>
                                    <p className="createdBy">{item.createdBy}</p>
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
});

const mapDispatchToProps = {
    changeScene: changeScene
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoomListContainer);
