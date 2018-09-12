import React, {Component} from 'react';
import {connect} from 'react-redux';
import Link from 'react-router-dom/Link';

class ChatRoomListContainer extends Component {
    constructor(props){
        super(props);
    }

    render(){
        
        return (
        
        <div className="chatRoomCont">
            <div className="roomsCont">
            <p className="lbl-rooms"> Available Rooms:</p>
                <ul className="list">
                    <li className="item">
                        <p className="name">BMW</p>
                        <p className="description">Try not to cry.</p>
                        <p className="createdBy">domgarcia.fp@gmail.com</p>
                    </li>
                    <li className="item">
                        <p className="name">Cabal Online</p>
                        <p className="description">Gamer Community</p>
                        <p className="createdBy">eman.custorio@gmail.com</p>
                    </li>
                    <li className="item">
                        <p className="name">Nuworks</p>
                        <p className="description">Innovation Agency</p>
                        <p className="createdBy">developers@nuworks.ph</p>
                    </li>
                    <li className="item">
                        <p className="name">Bulacan State University</p>
                        <p className="description">Fraternity recruitment</p>
                        <p className="createdBy">bulacan.studens@yahoo.com</p>
                    </li>
                    <li className="item">
                        <p className="name">SMP Group</p>
                        <p className="description">Samahan ng malalamig ang pasko</p>
                        <p className="createdBy">no.relation@yahoo.com</p>
                    </li>
                </ul>
            </div>
        </div>
        )
    }
}

export default ChatRoomListContainer;