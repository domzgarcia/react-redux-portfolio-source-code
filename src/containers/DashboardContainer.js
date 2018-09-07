import React, {Component} from 'react';
import {connect} from 'react-redux';

class DashboardContainer extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <h1>Dashboard</h1>
        )
    }
    componentDidMount(){
        document.querySelector('title').innerText = 'Home';
    }
}

function mapStateToProps(state) {
    return {};
};
const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);