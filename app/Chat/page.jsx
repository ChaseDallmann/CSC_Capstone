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
  const [activeCustomers, setActiveCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const router = useRouter();

  // Default CSR email - this should ideally come from your backend API or configuration
  const csrReceiverUser = 'dallmanc@csp.edu'; // Update this to a valid customer service email

  // Load chat history for customers or customer service
  useEffect(() => {
    if (!isAuthenticated || !user) return;

    // Debug logging
    console.log('Current user role:', userRole);
    console.log('User:', user);

    const loadChatHistory = async () => {
      try {
        // If user is customer service, load active customers with messages
        if (userRole === 'CUSTOMER_SERVICE') {
          console.log('Attempting to fetch active customers for CSR');
          try {
            const response = await fetch('http://localhost:8080/chat/active-customers', {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            });
            
            console.log('Active customers response status:', response.status);
            if (response.ok) {
              const text = await response.text(); // Get response as text first
              if (text && text.trim() !== '') {
                try {
                  const customersData = JSON.parse(text);
                  setActiveCustomers(customersData);
                } catch (parseError) {
                  console.error('Error parsing JSON for customers:', parseError);
                  setActiveCustomers([]);
                }
              } else {
                console.log('Empty customers response received');
                setActiveCustomers([]);
              }
            } else {
              // Handle non-200 responses
              console.error('Error fetching customers:', response.status, response.statusText);
              setActiveCustomers([]);
            }
          } catch (fetchError) {
            console.error('Error fetching customers:', fetchError);
            setActiveCustomers([]);
          }
        } else {
          // If user is a customer, load their chat history with customer service
          try {
            const response = await fetch(`http://localhost:8080/chat/history/${user.email}`, {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            });
            
            if (response.ok) {
              const text = await response.text(); // Get response as text first
              if (text && text.trim() !== '') {
                try {
                  const historyData = JSON.parse(text);
                  setMessages(historyData);
                } catch (parseError) {
                  console.error('Error parsing JSON:', parseError);
                  // Set empty array to avoid errors
                  setMessages([]);
                }
              } else {
                console.log('Empty response received');
                setMessages([]);
              }
            } else {
              // Handle non-200 responses
              console.error('Error fetching history:', response.status, response.statusText);
              setMessages([]);
            }
          } catch (fetchError) {
            console.error('Error fetching chat history:', fetchError);
            setMessages([]);
          }
        }
      } catch (error) {
        console.error('Error loading chat history:', error);
      }
    };

    loadChatHistory();
  }, [isAuthenticated, user, userRole, token]);

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
        
        // Subscribe to your own queue to receive messages
        const queue = `/user/${user?.email}/private`;
        client.subscribe(queue, (messageOutput) => {
          console.log('Received message: ', messageOutput);
          const chatMessage = JSON.parse(messageOutput.body);
          
          // Add the message to our state
          setMessages((prevMessages) => [...prevMessages, chatMessage]);
          
          // If this is a customer service rep and the message is from a customer not in our list
          if (userRole === 'CUSTOMER_SERVICE' && chatMessage.senderRole === 'customer') {
            // Check if this customer is already in our active customers list
            const customerExists = activeCustomers.some(c => c.email === chatMessage.sender);
            
            if (!customerExists) {
              // Add the new customer to our list
              setActiveCustomers(prev => [...prev, {
                name: chatMessage.sender,
                email: chatMessage.sender,
                lastMessage: chatMessage.content,
                timestamp: new Date().toISOString()
              }]);
            }
          }
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

  // Handle customer selection for customer service rep
  const handleSelectCustomer = (customer) => {
    setSelectedCustomer(customer);
    
    // Load chat history with this specific customer
    fetchCustomerChatHistory(customer.email);
  };
  
  // Fetch chat history with a specific customer
  const fetchCustomerChatHistory = async (customerEmail) => {
    try {
      const response = await fetch(`http://localhost:8080/chat/conversation/${customerEmail}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        try {
          const text = await response.text();
          if (text && text.trim() !== '') {
            try {
              const historyData = JSON.parse(text);
              setMessages(historyData);
            } catch (parseError) {
              console.error('Error parsing conversation JSON:', parseError);
              setMessages([]);
            }
          } else {
            console.log('Empty conversation response received');
            setMessages([]);
          }
        } catch (textError) {
          console.error('Error reading text:', textError);
          setMessages([]);
        }
      } else {
        console.error('Error fetching conversation:', response.status, response.statusText);
        setMessages([]);
      }
    } catch (error) {
      console.error('Error loading customer chat history:', error);
      setMessages([]);
    }
  };

  const sendMessage = () => {
    if (!isConnected) {
      console.error('WebSocket is not connected');
      return;
    }

    if (stompClient && messageContent.trim()) {
      // Determine the receiver based on role
      let receiver;
      
      if (userRole === 'CUSTOMER_SERVICE') {
        // If customer service rep, send to the selected customer
        if (!selectedCustomer) {
          alert('Please select a customer to chat with');
          return;
        }
        receiver = selectedCustomer.email;
      } else {
        // If customer, send to customer service
        receiver = csrReceiverUser;
      }
      
      // Map the roles correctly for the backend
      const senderRole = userRole === 'CUSTOMER_SERVICE' ? 'customerService' : 'customer';
      const receiverRole = userRole === 'CUSTOMER_SERVICE' ? 'customer' : 'customerService';

      // Debug before sending
      console.log('Preparing to send message:');
      console.log('From:', user?.email, 'Role:', senderRole);
      console.log('To:', receiver, 'Role:', receiverRole);

      const chatMessage = {
        content: messageContent,
        sender: user?.email, // Use email for consistent identification
        senderName: user?.name || user?.email, // Include name for display
        receiver: receiver,
        senderRole: senderRole,
        receiverRole: receiverRole,
        status: 'MESSAGE',
      };

      try {
        stompClient.publish({
          destination: '/app/chat.sendMessage',
          body: JSON.stringify(chatMessage)
        });

        // Optimistically add the message to local state
        setMessages((prevMessages) => [...prevMessages, chatMessage]);

        setMessageContent('');
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  return (
    <>
      <NavbarBasic />
      <div className="chat-container" style={{ display: 'flex', maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        {/* Customer Service UI with customer list */}
        {userRole === 'CUSTOMER_SERVICE' && (
          <div className="customer-list" style={{ width: '300px', borderRight: '1px solid #ddd', padding: '10px', marginRight: '20px' }}>
            <h2>Active Customers</h2>
            {activeCustomers.length === 0 ? (
              <p>No active customers</p>
            ) : (
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {activeCustomers.map((customer, index) => (
                  <li 
                    key={index} 
                    onClick={() => handleSelectCustomer(customer)}
                    style={{ 
                      padding: '10px',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      marginBottom: '8px',
                      cursor: 'pointer',
                      backgroundColor: selectedCustomer?.email === customer.email ? '#f0f0f0' : 'white'
                    }}
                  >
                    <div><strong>{customer.name || customer.email}</strong></div>
                    <div style={{ fontSize: '0.8em' }}>{customer.lastMessage?.substring(0, 30)}</div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
        
        {/* Chat Interface */}
        <div className="chat-interface" style={{ flex: 1 }}>
          <h1>
            {userRole === 'CUSTOMER' 
              ? 'Chat with Customer Service' 
              : selectedCustomer 
                ? `Chat with ${selectedCustomer.name || selectedCustomer.email}` 
                : 'Select a customer'
            }
          </h1>
          
          {connectionError && (
            <div style={{ color: 'red', marginBottom: '10px' }}>
              {connectionError}
            </div>
          )}
          
          <div className="chat-box" style={{ 
            height: '400px', 
            border: '1px solid #ddd', 
            borderRadius: '4px',
            padding: '10px',
            overflowY: 'auto',
            marginBottom: '10px',
            display: 'flex',
            flexDirection: 'column'
          }}>
            {messages.length === 0 ? (
              <div style={{ textAlign: 'center', marginTop: '170px', color: '#888' }}>
                {userRole === 'CUSTOMER_SERVICE' && !selectedCustomer 
                  ? 'Select a customer to view conversation' 
                  : 'No messages yet. Start the conversation!'}
              </div>
            ) : (
              messages.map((msg, index) => (
                <div
                  key={index}
                  style={{ 
                    alignSelf: msg.sender === user?.email ? 'flex-end' : 'flex-start',
                    backgroundColor: msg.sender === user?.email ? '#DCF8C6' : '#E8E8E8',
                    borderRadius: '10px',
                    padding: '8px 12px',
                    margin: '4px 0',
                    maxWidth: '70%'
                  }}
                >
                  <div style={{ fontWeight: 'bold', fontSize: '0.8em', marginBottom: '3px' }}>
                    {msg.senderName || msg.sender}
                  </div>
                  <div>{msg.content}</div>
                </div>
              ))
            )}
          </div>
          
          <div style={{ display: 'flex' }}>
            <input
              type="text"
              value={messageContent}
              onChange={(e) => setMessageContent(e.target.value)}
              placeholder="Type a message"
              disabled={!isConnected || (userRole === 'CUSTOMER_SERVICE' && !selectedCustomer)}
              style={{ flex: 1, padding: '10px', marginRight: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
            />
            <button 
              onClick={sendMessage} 
              disabled={!isConnected || (userRole === 'CUSTOMER_SERVICE' && !selectedCustomer)}
              style={{ 
                padding: '10px 20px', 
                backgroundColor: '#EAD0A5',
                border: 'none',
                borderRadius: '4px',
                cursor: isConnected && !(userRole === 'CUSTOMER_SERVICE' && !selectedCustomer) ? 'pointer' : 'not-allowed'
              }}
            >
              {isConnected ? 'Send' : 'Connecting...'}
            </button>
          </div>
          
          {!isConnected && <p>Attempting to connect...</p>}
        </div>
      </div>
    </>
  );
};

export default Chat;