import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import '../assets/layouts/header.css';

class HeaderContainer extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <header id="headerNav">
                <div className="container">
                    <ul className="list">
                        <li><Link className="link" to="/">Home</Link></li>
                        <li><Link className="link" to="/about">About</Link></li>
                        <li><Link className="link" to="/showcase">Showcase</Link></li>
                        <li><Link className="link" to="/contact-us">Contact Us</Link></li>
                    </ul>
                </div>
            </header>
        )
    }
}

function mapStateToProps(state) {
    return {};
};
const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);