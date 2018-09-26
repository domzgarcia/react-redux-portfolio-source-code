import React from 'react';

import './skeleton.css';

const ChatRoomListSkeletonComp = (props) => {

    function _splitDivs(loadersNum){
       const isActive  = (props.isLoading) ? '-active' : '';
       let markupStart = `<div class="skeleton-parent-cont ${isActive}">`;
       let markupEnd   = `</div>`;

       for(var i=0; i < loadersNum; i++){
        
        markupStart += `<div class="columnDiv"></div>`;
        
        if(i === loadersNum-1){
            const htmlStr = markupStart.concat(markupEnd);
            return (
                <p dangerouslySetInnerHTML={{__html: htmlStr}} ></p>
            )
        }
       }
    }

    return (
        <div className="fluid-layout">
            {_splitDivs( props.len )}
        </div>
    )
}

export default ChatRoomListSkeletonComp;