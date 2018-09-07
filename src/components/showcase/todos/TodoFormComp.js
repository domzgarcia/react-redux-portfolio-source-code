import React from 'react';

import './main.css';
import FlickrLoaderComp from 'Components/FlickrLoaderComp';

const TodoFormComp = (props) => {
    let isActive = props.isOpen ? '-active' : '';

    return (
        <div className={"card " + isActive}>
            <FlickrLoaderComp isLoading={props.isFormLoading}/>
            <div className="title">What's on your mind?</div>
            <form onSubmit={props.onSubmit}>
                <input type="text" onChange={props.handleChange}/>
                
                <div className="settings-cont">
                    <div className="opt">
                        <p>Save todos with:</p>
                        <label>
                            {/* <input type="checkbox" /> */}
                            <span>Firebase</span>
                        </label>
                        {/* <label>
                            <input type="checkbox"/>
                            <span>LocalStorage</span>
                        </label> */}
                    </div>
                    <button type="submit" className="btn-add -green pull-right">Submit</button>
                </div>
                <div className="clearfix"></div>
            </form>
        </div>
    )
}

export default TodoFormComp;