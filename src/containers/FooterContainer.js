import React, {Component} from 'react';
import {connect} from 'react-redux';

import '../assets/layouts/header.css';

class FooterContainer extends Component {
    constructor(props){
        super(props);
    }
    componentWillReceiveProps(props){
        const {pathname} = props.routerReducer.location;
        
        if(pathname.indexOf('')>-1){
            document.querySelector('title').innerText = 'Home';
        }
        if(pathname.indexOf('about')>-1){
            document.querySelector('title').innerText = 'About';
        }
        if(pathname.indexOf('showcase')>-1){
            document.querySelector('title').innerText = 'Showcase';
        }
        if(pathname.indexOf('todo')>-1){
            document.querySelector('title').innerText = 'Todo App - Showcase';
        }
        if(pathname.indexOf('chat')>-1){
            document.querySelector('title').innerText = 'Chat App - Showcase';
        }
        if(pathname.indexOf('contact')>-1){
            document.querySelector('title').innerText = 'Contact Us';
        }
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
    return {...state};
};
const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(FooterContainer);