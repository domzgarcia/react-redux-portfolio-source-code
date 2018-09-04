import React, {Component} from 'react';
import {connect} from 'react-redux';

class AboutContainer extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <h1>About Page</h1>
        )
    }
}

function mapStateToProps(state) {
    return {};
};
const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(AboutContainer);