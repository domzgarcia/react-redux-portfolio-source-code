import React, {Component} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import FlickrLoaderComp from 'Components/FlickrLoaderComp';

class ChatRoomMessage extends Component {
    constructor(props){
        super(props);
    }
    utilsTimeAgo(epoch){
        return moment(epoch).fromNow();
    }
    render(){
        let {email, displayName, text, createdAt, userData} = this.props;
        let toRight = (email === userData.email) ? '-right' : ''; 
        let self    = (email === userData.email) ? '-self' : '';

        return (
            <div className={"item-user "+toRight}>
                <p className="username">
                    <span>{displayName}</span>
                    <span className="timestamp">&nbsp;&lt;{this.utilsTimeAgo(createdAt)}&gt;</span>
                </p>
                <span className={"message "+self}>{text}</span>                                    
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    userData: state.chatStore.user.userData,
});

export default connect(mapStateToProps, null)(ChatRoomMessage);