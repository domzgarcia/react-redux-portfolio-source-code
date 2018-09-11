import React, {Component} from 'react';
import {connect} from 'react-redux';
import Link from 'react-router-dom/Link';
import firebase from 'firebase';

class ChatRoomContainer extends Component {
    constructor(props){
        super(props);
    }

    render (){
        let {userData} = this.props;
        
        return (
            <div>

            <div className="chatroom">
                <hr/>
                <div className="profileCont">
                    <div className="imgCont">
                        <img src={userData.photoURL}/>
                    </div>
                    <div className="description">
                        <p className="name">{userData.displayName}</p>
                        <p className="email">{userData.email}</p>
                    </div>
                </div>
                <hr/>

                <div className="chatRoomCont">
                    <div className="roomsCont">
                    <p className="lbl-rooms"> Available Rooms:</p>
                        <ul class="list">
                            <li className="item">
                                <p className="name">BMW</p>
                                <p className="description">Try not to cry.</p>
                                <p className="createdBy">domgarcia.fp@gmail.com</p>
                            </li>
                            <li className="item">
                                <p className="name">Cabal Online</p>
                                <p className="description">Gamer Community</p>
                                <p className="createdBy">eman.custorio@gmail.com</p>
                            </li>
                            <li className="item">
                                <p className="name">Nuworks</p>
                                <p className="description">Innovation Agency</p>
                                <p className="createdBy">developers@nuworks.ph</p>
                            </li>
                            <li className="item">
                                <p className="name">Bulacan State University</p>
                                <p className="description">Fraternity recruitment</p>
                                <p className="createdBy">bulacan.studens@yahoo.com</p>
                            </li>
                            <li className="item">
                                <p className="name">SMP Group</p>
                                <p className="description">Samahan ng malalamig ang pasko</p>
                                <p className="createdBy">no.relation@yahoo.com</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

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
                                    <p className="username"><span>Christina Joy</span><span className="timestamp">&lt;&nbsp;Sept 9 2018, 9:30 PM&nbsp;&gt;</span></p>
                                    <span className="message">Hello world, what are you doing?</span>                                    
                                </div>
                                <div className="item-user">
                                    <p className="username"><span>Christina Joy</span><span className="timestamp">&lt;&nbsp;Sept 9 2018, 9:30 PM&nbsp;&gt;</span></p>
                                    <span className="message">Hey come on say something!</span>
                                </div>

                                <div className="item-user -right">
                                    <p className="username"><span>Domz Garcia</span><span className="timestamp">&lt;&nbsp;Sept 9 2018, 9:30 PM&nbsp;&gt;</span></p>
                                    <div className="clearfix"></div>
                                    <span className="message">A quick brown fox jump over the lazy dog! A quick brown fox jump over the lazy dog! A quick brown fox jump over the lazy dog! A quick brown fox jump over the lazy dog!</span>
                                </div>

                                <div className="item-user -right">
                                    <p className="username"><span>Domz Garcia</span><span className="timestamp">&lt;&nbsp;Sept 9 2018, 9:30 PM&nbsp;&gt;</span></p>
                                    <div className="clearfix"></div>
                                    <span className="message">over tick browthe lg!</span>
                                </div>
                            </li>
                            <li>
                                <div className="item-user">
                                    <p className="username"><span>Christina Joy</span><span className="timestamp">&lt;&nbsp;Sept 9 2018, 9:30 PM&nbsp;&gt;</span></p>
                                    <span className="message">Hello world, what are you doing?</span>                                    
                                </div>
                                <div className="item-user">
                                    <p className="username"><span>Christina Joy</span><span className="timestamp">&lt;&nbsp;Sept 9 2018, 9:30 PM&nbsp;&gt;</span></p>
                                    <span className="message">Hey come on say something!</span>
                                </div>

                                <div className="item-user -right">
                                    <p className="username"><span>Domz Garcia</span><span className="timestamp">&lt;&nbsp;Sept 9 2018, 9:30 PM&nbsp;&gt;</span></p>
                                    <div className="clearfix"></div>
                                    <span className="message">A quick brown fox jump over the lazy dog! A quick brown fox jump over the lazy dog! A quick brown fox jump over the lazy dog! A quick brown fox jump over the lazy dog!</span>
                                </div>

                                <div className="item-user -right">
                                    <p className="username"><span>Domz Garcia</span><span className="timestamp">&lt;&nbsp;Sept 9 2018, 9:30 PM&nbsp;&gt;</span></p>
                                    <div className="clearfix"></div>
                                    <span className="message">over tick browthe lg!</span>
                                </div>
                            </li>
                            <li>
                                <div className="item-user">
                                    <p className="username"><span>Christina Joy</span><span className="timestamp">&lt;&nbsp;Sept 9 2018, 9:30 PM&nbsp;&gt;</span></p>
                                    <span className="message">Hello world, what are you doing?</span>                                    
                                </div>
                                <div className="item-user">
                                    <p className="username"><span>Christina Joy</span><span className="timestamp">&lt;&nbsp;Sept 9 2018, 9:30 PM&nbsp;&gt;</span></p>
                                    <span className="message">Hey come on say something!</span>
                                </div>

                                <div className="item-user -right">
                                    <p className="username"><span>Domz Garcia</span><span className="timestamp">&lt;&nbsp;Sept 9 2018, 9:30 PM&nbsp;&gt;</span></p>
                                    <div className="clearfix"></div>
                                    <span className="message">A quick brown fox jump over the lazy dog! A quick brown fox jump over the lazy dog! A quick brown fox jump over the lazy dog! A quick brown fox jump over the lazy dog!</span>
                                </div>

                                <div className="item-user -right">
                                    <p className="username"><span>Domz Garcia</span><span className="timestamp">&lt;&nbsp;Sept 9 2018, 9:30 PM&nbsp;&gt;</span></p>
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

            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    userData: state.chatStore.user.userData
});

export default connect(mapStateToProps, null)(ChatRoomContainer);