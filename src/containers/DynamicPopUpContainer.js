import React, {Component} from 'react';
import {connect} from 'react-redux';
import Link from 'react-router-dom/Link';

import 'Src/assets/layouts/popup.scss';
import ChatCreateRoomContainer from 'Containers/showcase/chat/ChatCreateRoomContainer.js';

class DynamicPopUpContainer extends Component {
    constructor(props){
        super(props);
        this.handlePopup = this.handlePopup.bind(this);
    }
    componentDidMount(){
        // do nothing...
    }
    
    handlePopup(){
        this.props.openPopup();
    }

    render(){
        let {isOpen} = this.props;
        let popUpVisibility = (isOpen)?'-active':'';
        console.log(isOpen);

        return (
            <div className={"dynamicPopUpCont "+popUpVisibility}>
                <div className="contentProper -narrowWidth">
                    <button className="popupClose" onClick={this.handlePopup}>&times;</button>
                    
                    <ChatCreateRoomContainer />
                </div>
            </div>
        )
    }
}

export default DynamicPopUpContainer;
    