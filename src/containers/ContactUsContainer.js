import React, {Component} from 'react';
import {connect} from 'react-redux';

class ContactUsContainer extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <h1 className="page-title">Contact Us</h1>
        )
    }
}

function mapStateToProps(state) {
    return {};
};
const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactUsContainer);