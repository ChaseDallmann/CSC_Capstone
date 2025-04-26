'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Pusher from 'pusher-js';
import NavbarBasic from "../components/NavbarBasic/NavbarBasic";
import ChatList from '../components/Conversation/ChatList';
import ChatBox from '../components/Conversation/ChatBox';

export default function ChatPage() {
  const [text, setText] = useState('');
  const [username, setUsername] = useState('');
  const [chats, setChats] = useState<{ username: string; message: string }[]>([]);

  useEffect(() => {
    const user = window.prompt('Enter your username:', 'Anonymous');
    setUsername(user || 'Anonymous');

    const pusher = new Pusher('6024a3eb434904f0d50c', {
      cluster: 'us2',
    });

    const channel = pusher.subscribe('chat');
    channel.bind('message', (data) => {
      setChats((prevChats) => [...prevChats, data]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, []);

  const handleTextChange = (e) => {
    if (e.key === 'Enter' && text.trim()) {
      const payload = {
        username,
        message: text,
      };

      axios.post('http://localhost:5000/message', payload).then(() => {
        setText('');
      });
    } else {
      setText(e.target.value);
    }
  };

  return (
    <>
    <NavbarBasic />
    <div className="chat-app">
      <header>
        <h1>Ace Teas Chat Group</h1>
      </header>
      <main>
        <ChatList chats={chats} />
        <ChatBox
          text={text}
          username={username}
          handleTextChange={handleTextChange}
        />
      </main>
    </div></>
  );
}