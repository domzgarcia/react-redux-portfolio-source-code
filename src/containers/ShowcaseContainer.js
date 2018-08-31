import React, {Component} from 'react';
import {connect} from 'react-redux';

class ShowcaseContainer extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <h1>Showcase Page</h1>
        )
    }
}

function mapStateToProps(state) {
    return {};
};
const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowcaseContainer);

// export default ShowcaseContainer;