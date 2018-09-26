import React, {Component} from 'react';
import {connect} from 'react-redux';
import Link from 'react-router-dom/Link';

import 'Src/assets/layouts/popup.scss';
import ChatCreateRoomContainer from '../showcase/chat/containers/ChatCreateRoomContainer';
import { POPUP_CREATE_ROOM } from '../showcase/chat/actions/actionType';
import { closeOpenPopup } from '../showcase/chat/actions/action';

class DynamicPopUpContainer extends Component {
    constructor(props){
        super(props);
        this.handlePopup = this.handlePopup.bind(this);
    }
    componentDidMount(){
        // do nothing...
    }
    
    handlePopup(){
        this.props.closeOpenPopup();
        // I'm thinking if essential to reset popupType here...
    }

    render(){
        let {isOpen, popupType} = this.props;
        let popUpVisibility = (isOpen)?'-active':'';

        console.log(isOpen, this.props.popupType);

        return (
            <div className={"dynamicPopUpCont "+popUpVisibility}>
                <div className="contentProper -narrowWidth">
                    <button className="popupClose" onClick={this.handlePopup}>&times;</button>

                    {(function(){
                        switch(popupType){
                            case POPUP_CREATE_ROOM: 
                            return <ChatCreateRoomContainer />;

                            default:
                                return <div>BOOM</div>;
                        }
                    })(popupType)}

                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    popupType: state.chatStore.appUI.popupType
});

const mapDispatchToProps = {
    closeOpenPopup: closeOpenPopup
};

export default connect(mapStateToProps, mapDispatchToProps)(DynamicPopUpContainer);
    