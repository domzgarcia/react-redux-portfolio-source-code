import React, {Component} from 'react';
import {connect} from 'react-redux';

import '../assets/layouts/header.css';

class FooterContainer extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div>
                <pre>React + Redux 2018 sample website made with &#9825;</pre>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {};
};
const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(FooterContainer);