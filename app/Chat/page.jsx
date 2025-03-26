'use client';

import React, { useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import NavbarBasic from '../components/NavbarBasic/NavbarBasic';
import { AuthContext } from '../context/AuthContext';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';


const Chat = () => {
  const { authenticatedUser, user, userRole } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [messageContent, setMessageContent] = useState('');
  const [stompClient, setStompClient] = useState(null);

  const router = useRouter();

  useEffect(() => {
    //direct to login page if user is not authenticated
    if (!authenticatedUser) {
      router.push('/Login'); 
      return;
    }

    //establish WebSocket
    const socket = new SockJS('/ws');
    const client = Stomp.over(socket);
    setStompClient(client);

    client.connect({}, (frame) => {
      console.log('Connected: ' + frame);
      client.subscribe(`/user/queue/messages`, (messageOutput) => {
        const chatMessage = JSON.parse(messageOutput.body);
        setMessages((prevMessages) => [...prevMessages, chatMessage]);
      });
    });

    return () => {
      if (client) {
        client.disconnect();
      }
    };
  }, [authenticatedUser, router]);

  const sendMessage = () => {
    if (stompClient && messageContent.trim()) {
      const chatMessage = {
        content: messageContent,
        sender: user?.name,
        receiver: 'customerService',
        senderRole: userRole,
        receiverRole: 'customerService',
        status: 'MESSAGE',
      };
      stompClient.send('/app/chat.sendMessage', {}, JSON.stringify(chatMessage));
      setMessageContent('');
    }
  };

  return (
    <>
      <NavbarBasic />
      <div className="chat-container">
        <h1>Chat with Customer Service</h1>
        <div className="chat-box">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${msg.sender === user?.name ? 'sent' : 'received'}`}
            >
              <strong>{msg.sender}:</strong> {msg.content}
            </div>
          ))}
        </div>
        <input
          type="text"
          value={messageContent}
          onChange={(e) => setMessageContent(e.target.value)}
          placeholder="Type a message"
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </>
  );
};

export default Chat;