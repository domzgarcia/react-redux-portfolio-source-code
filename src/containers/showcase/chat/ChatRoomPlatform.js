import React, {Component} from 'react';
import {connect} from 'react-redux';
import Link from 'react-router-dom/Link';

class ChatRoomPlatform extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="chatplatform">  
                <div className="chatHeaderPanel">
                    <p className="chatName">My Princess</p>
                    <p className="chatDesc">Ang princess kong mahal</p>
                </div>
                
                <div className="messagesCont">
                    {/* Message Panel */}
                    <div className="messagesPanelCont">
                        <ul className="messages">
                            <li>
                                <div className="item-user">
                                    <p className="username"><span>Christina Joy</span><span className="timestamp">&nbsp;&lt;Sept 9 2018, 9:30 PM&gt;</span></p>
                                    <span className="message">Hello world, what are you doing?</span>                                    
                                </div>
                                <div className="item-user">
                                    <p className="username"><span>Christina Joy</span><span className="timestamp">&nbsp;&lt;Sept 9 2018, 9:30 PM&gt;</span></p>
                                    <span className="message">Hey come on say something!</span>
                                </div>

                                <div className="item-user -right">
                                    <p className="username"><span>Domz Garcia</span><span className="timestamp">&nbsp;&lt;Sept 9 2018, 9:30 PM&gt;</span></p>
                                    <div className="clearfix"></div>
                                    <span className="message">A quick brown fox jump over the lazy dog! A quick brown fox jump over the lazy dog! A quick brown fox jump over the lazy dog! A quick brown fox jump over the lazy dog!</span>
                                </div>

                                <div className="item-user -right">
                                    <p className="username"><span>Domz Garcia</span><span className="timestamp">&nbsp;&lt;Sept 9 2018, 9:30 PM&gt;</span></p>
                                    <div className="clearfix"></div>
                                    <span className="message">over tick browthe lg!</span>
                                </div>
                            </li>
                            <li>
                                <div className="item-user">
                                    <p className="username"><span>Christina Joy</span><span className="timestamp">&nbsp;&lt;Sept 9 2018, 9:30 PM&gt;</span></p>
                                    <span className="message">Hello world, what are you doing?</span>                                    
                                </div>
                                <div className="item-user">
                                    <p className="username"><span>Christina Joy</span><span className="timestamp">&nbsp;&lt;Sept 9 2018, 9:30 PM&gt;</span></p>
                                    <span className="message">Hey come on say something!</span>
                                </div>

                                <div className="item-user -right">
                                    <p className="username"><span>Domz Garcia</span><span className="timestamp">&nbsp;&lt;Sept 9 2018, 9:30 PM&gt;</span></p>
                                    <div className="clearfix"></div>
                                    <span className="message">A quick brown fox jump over the lazy dog! A quick brown fox jump over the lazy dog! A quick brown fox jump over the lazy dog! A quick brown fox jump over the lazy dog!</span>
                                </div>

                                <div className="item-user -right">
                                    <p className="username"><span>Domz Garcia</span><span className="timestamp">&nbsp;&lt;Sept 9 2018, 9:30 PM&gt;</span></p>
                                    <div className="clearfix"></div>
                                    <span className="message">over tick browthe lg!</span>
                                </div>
                            </li>
                            <li>
                                <div className="item-user">
                                    <p className="username"><span>Christina Joy</span><span className="timestamp">&nbsp;&lt;Sept 9 2018, 9:30 PM&gt;</span></p>
                                    <span className="message">Hello world, what are you doing?</span>                                    
                                </div>
                                <div className="item-user">
                                    <p className="username"><span>Christina Joy</span><span className="timestamp">&nbsp;&lt;Sept 9 2018, 9:30 PM&gt;</span></p>
                                    <span className="message">Hey come on say something!</span>
                                </div>

                                <div className="item-user -right">
                                    <p className="username"><span>Domz Garcia</span><span className="timestamp">&nbsp;&lt;Sept 9 2018, 9:30 PM&gt;</span></p>
                                    <div className="clearfix"></div>
                                    <span className="message">A quick brown fox jump over the lazy dog! A quick brown fox jump over the lazy dog! A quick brown fox jump over the lazy dog! A quick brown fox jump over the lazy dog!</span>
                                </div>

                                <div className="item-user -right">
                                    <p className="username"><span>Domz Garcia</span><span className="timestamp">&nbsp;&lt;Sept 9 2018, 9:30 PM&gt;</span></p>
                                    <div className="clearfix"></div>
                                    <span className="message">React Redux awesome!</span>
                                </div>
                            </li>
                        </ul>

                        <div className="inputPanelCont">
                            <textarea></textarea>
                            <button className="btnSend">Send</button>
                        </div>    
                    </div>
                    {/* Visitor Panel */}
                    <div className="visitorsCont">
                        <div className="header">
                            <p>Visitors (3)</p>
                        </div>
                        <div className="searchComp">
                            <p className="lblSearch">Search User:</p>
                            <input type="text"/>
                        </div>
                        <ul className="visitors">
                            <li>
                                <div className="visitorDisplay">
                                    <p className="name">Domz Garcia</p>
                                </div>
                            </li>
                            <li>
                                <div className="visitorDisplay">
                                    <p className="name">Christina Joy</p>
                                </div>
                            </li>
                            <li>
                                <div className="visitorDisplay">
                                    <p className="name">Moderator 101</p>
                                </div>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>
        )
    }
}

export default ChatRoomPlatform;