'use client';

import React, { useContext, useState, useEffect } from 'react';
import { redirect, useRouter } from 'next/navigation';
import NavbarBasic from '../components/NavbarBasic/NavbarBasic';
import { AuthContext } from '../Context/AuthContext';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

const Chat = () => {
  const { isAuthenticated, user, token, userRole } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [messageContent, setMessageContent] = useState('');
  const [stompClient, setStompClient] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionError, setConnectionError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      redirect('/Login'); 
      return;
    }

    const socket = new SockJS('http://localhost:8080/ws');
    const client = new Client({
      webSocketFactory: () => socket,
      connectHeaders: {
        Authorization: `Bearer ${token}`
      },
      onConnect: (frame) => {
        console.log('STOMP Connected successfully: ', frame);
        setIsConnected(true);
        setConnectionError(null);
        
        // Subscribe to user-specific message queue
        client.subscribe(`/user/queue/private`, (messageOutput) => {
          console.log('Received message: ', messageOutput);
          const chatMessage = JSON.parse(messageOutput.body);
          setMessages((prevMessages) => [...prevMessages, chatMessage]);
        });
      },
      onStompError: (frame) => {
        console.error('STOMP Broker Error: ', frame);
        setConnectionError('STOMP Connection Error: ' + frame.headers['message']);
        setIsConnected(false);
      },
      onWebSocketError: (error) => {
        console.error('WebSocket Error: ', error);
        setConnectionError('WebSocket Connection Error');
        setIsConnected(false);
      },
      onDisconnect: (frame) => {
        console.log('STOMP Disconnected: ', frame);
        setIsConnected(false);
      }
    });

    try {
      client.activate();
      setStompClient(client);
    } catch (error) {
      console.error('Error activating client: ', error);
      setConnectionError('Failed to activate STOMP client');
    }

    return () => {
      if (client) {
        client.deactivate();
      }
    };
  }, [isAuthenticated, token, router]);

  const sendMessage = () => {
    if (!isConnected) {
      console.error('WebSocket is not connected');
      return;
    }

    if (stompClient && messageContent.trim()) {
      // Determine receiver role based on sender's role
      const receiverRole = userRole === 'CUSTOMER' 
        ? 'CUSTOMER_SERVICE' 
        : 'CUSTOMER';

      const chatMessage = {
        content: messageContent,
        sender: user?.name,
        // Use the authenticated user's name as the receiver
        receiver: userRole === 'CUSTOMER_SERVICE' ? 'customer' : user?.name,
        senderRole: userRole,
        receiverRole: receiverRole,
        status: 'MESSAGE',
      };

      try {
        stompClient.publish({
          destination: '/app/chat.sendMessage',
          body: JSON.stringify(chatMessage)
        });

        // Optimistically add message to local state
        setMessages((prevMessages) => [...prevMessages, {
          ...chatMessage,
          sender: user?.name
        }]);

        setMessageContent('');
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  return (
    <>
      <NavbarBasic />
      <div className="chat-container">
        <h1>
          {userRole === 'CUSTOMER' 
            ? 'Chat with Customer Service' 
            : 'Customer Chat'}
        </h1>
        {connectionError && (
          <div style={{ color: 'red', marginBottom: '10px' }}>
            {connectionError}
          </div>
        )}
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
          disabled={!isConnected}
        />
        <button 
          onClick={sendMessage} 
          disabled={!isConnected}
        >
          {isConnected ? 'Send' : 'Connecting...'}
        </button>
        {!isConnected && <p>Attempting to connect...</p>}
      </div>
    </>
  );
};

export default Chat;