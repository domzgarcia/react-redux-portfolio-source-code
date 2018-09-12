import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

class ChatCreateRoomContainer extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div>
                <h3>Create Room</h3>
            </div>
        )
    }
}

export default ChatCreateRoomContainer;