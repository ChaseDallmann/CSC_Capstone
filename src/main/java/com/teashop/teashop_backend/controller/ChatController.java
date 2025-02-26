package com.teashop.teashop_backend.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;

import com.teashop.teashop_backend.chat.ChatMessage;

@Controller

public class ChatController {
    //add user
    @MessageMapping("/chat.addUser")
    @SendTo("/topic/public")
    public ChatMessage addUser(
        @Payload ChatMessage chatMessage
        //TODO: Potential to add DB logic
    ) {
       return chatMessage;
    }


    //send message
    @MessageMapping("/chat.sendMessage")
    @SendTo("/topic/public")
    public ChatMessage sendMessage(
        @Payload ChatMessage chatMessage
    ) {
        //TODO: Potential to add db logic
        return chatMessage;
    }
}
