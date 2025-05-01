import React, { useState, useEffect } from 'react';
import { pusherClient } from '../../../lib/pusher';
import Message from '../Conversation/Message'


const Conversation = () => {
    const [messages, setMessages] = useState<string[]>([]);
    const [message, setMessage] = useState<string>("");

    const onSendMessageHandler = async () => {
        setMessages((prev) => [...prev, message]);
        setMessage("");
        };

        const uniqueMessages = messages.filter(
            (value, index, self) => self.indexOf(value) === index
        );

    useEffect(() => {
        pusherClient.subscribe('chat');

        pusherClient.bind('user-message', (data: {message: string }) => {
            console.log("REALTIME MSG: ", data.message)
        });

        return () => pusherClient.unsubscribe('chat');
    }, []);

    return (
        <div className="w-full h-full flex items-center justify-center p-6">
          <div className="size-[500px] bg-slate-200 rounded-md shadow-lg flex flex-col justify-between">
            <h1 className="p-4 bg-white border">User Profile </h1>
            <div className="w-full h-full overflow-y-auto p-4 flex flex-col gap-y-4">
              {!uniqueMessages.length ? (
                <div className="text-center text-gray-500">No messages yet</div>
              ) : (
                uniqueMessages.map((message, index) => (
                  <Message key={index} message={message} />
                ))
              )}
            </div>
    
            <div className="flex items-center gap-x-2 bg-white border h-[60px] ">
              <input
                placeholder="Type your message here ..."
                value={message}
                className="w-full flex-1 bg-transparent h-full  border-none rounded-none"
                onChange={(e) => setMessage(e.target.value)}
              />
              <button
                onClick={onSendMessageHandler}
                className="rounded-none h-full "
              >
              </button>
            </div>
          </div>
        </div>
      );
    };
    
    export default Conversation;