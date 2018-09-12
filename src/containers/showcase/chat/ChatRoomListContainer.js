import React, {Component} from 'react';
import {connect} from 'react-redux';
import Link from 'react-router-dom/Link';

class ChatRoomListContainer extends Component {
    constructor(props){
        super(props);
    }

    render(){
        let {rooms} = this.props;

        return (
            <div className="chatRoomCont">
                <div className="roomsCont">
                <p className="lbl-rooms"> Available Rooms:</p>
                    <ul className="list">
                        {rooms.map( (item, idx) => {
                            return ( 
                                <li className="item" key={item.id}>
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
    
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoomListContainer);
