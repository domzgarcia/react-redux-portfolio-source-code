import React from 'react';

import 'Components/flickrLoader.css';

const FlickrLoaderComp = (props) => {
    let loaderVisibility = (props.isLoading) ? '-active' : '';
    return (
        <div className={"flickrloader-cont " + loaderVisibility}>
            <div className="lds-css ng-scope">
                <div className="wh100 lds-flickr">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </div>
    )
}

export default FlickrLoaderComp;

