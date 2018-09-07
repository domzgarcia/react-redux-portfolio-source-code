import React, {Component} from 'react';
import {connect} from 'react-redux';

class ContactUsContainer extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <h1>Contact Us</h1>
        )
    }
    componentDidMount(){
        document.querySelector('title').innerText = 'Contact Us';
    }
}

function mapStateToProps(state) {
    return {};
};
const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactUsContainer);