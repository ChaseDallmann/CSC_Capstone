import React, { useState, useEffect } from 'react';
import Message from '../components/Conversation/Message';
import Pusher from 'pusher-js';
import NavbarBasic from '../components/NavbarBasic/NavbarBasic';
import ChatList from '../components/Conversation/ChatList';
import ChatBox from '../components/Conversation/ChatBox';
import { AuthContext } from '../../utils/auth-context';
import Conversation from '../components/Conversation/Conversation';

const ChatApp = () => {

    return (
        <>
            <NavbarBasic />
            <div className="chat-app">
                <Conversation />
                <ChatBox />
                <ChatList />
            </div>
        </>
    );
};

export default ChatApp;
