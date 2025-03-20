package com.teashop.teashop_backend.controller.chat;

import com.teashop.teashop_backend.model.chat.ChatMessage;
import com.teashop.teashop_backend.model.chat.ChatTranscript;
import com.teashop.teashop_backend.model.chat.ChatTranscriptRepository;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @Autowired
    private ChatTranscriptRepository chatTranscriptRepository;


    @MessageMapping("/chat.sendMessage")
    public void sendMessage(@Payload ChatMessage chatMessage) {
        //save chat
        saveChatTranscript(chatMessage);
    
        //check the sender role
        if ("customer".equals(chatMessage.getSenderRole())) {
            //ensure customers are only sending messages to customer service
            if ("customerService".equals(chatMessage.getReceiverRole())) {
                simpMessagingTemplate.convertAndSendToUser(chatMessage.getReceiver(), "/private", chatMessage);
            } else {
                //handle invalid option
                throw new IllegalArgumentException("Customer can only send messages to customer service.");
            }
        } else if ("customerService".equals(chatMessage.getSenderRole())) {
            //ensure customer service is only sending messages to customers
            if ("customer".equals(chatMessage.getReceiverRole())) {
                simpMessagingTemplate.convertAndSendToUser(chatMessage.getReceiver(), "/private", chatMessage);
            } else {
                //handle invalid option
                throw new IllegalArgumentException("Customer service can only send messages to customers.");
            }
        } 
    }
    

    public void saveChatTranscript(ChatMessage chatMessage) {
        ChatTranscript chatTranscript = new ChatTranscript();
        chatTranscript.setSender(chatMessage.getSender());
        chatTranscript.setReceiver(chatMessage.getReceiver());
        chatTranscript.setMessage(chatMessage.getContent());
        chatTranscript.setStatus(chatMessage.getStatus());
        chatTranscript.setTimestamp(LocalDateTime.now());
        chatTranscriptRepository.save(chatTranscript);
    }

}