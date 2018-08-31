import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import logo from '../logo.svg';
import '../App.css';

import HeaderContainer from 'Containers/HeaderContainer.js';
import FooterContainer from 'Containers/FooterContainer.js';

import AboutContainer from 'Containers/AboutContainer.js';
import ShowcaseContainer from 'Containers/ShowcaseContainer.js';
import ContactUsContainer from 'Containers/ContactUsContainer.js';

class HomepageContainer extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>
                </div>

                {/*Modal*/}

                {/*Header*/}
                <HeaderContainer />

                {/*Body*/}
                
                <pre>Hello world</pre>

                <Switch>
                    <Route path='/about' component={AboutContainer}/>
                    <Route path='/showcase' component={ShowcaseContainer}/>
                    <Route path='/contact-us' component={ContactUsContainer}/>
                </Switch>
                
                {/*Footer*/}
                <FooterContainer />
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

export default connect(mapStateToProps, mapDispatchToProps)(HomepageContainer);

// export default HomepageContainer;