package com.teashop.teashop_backend.controller.chat;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Controller
@RequiredArgsConstructor
@Slf4j

public class MessageController {

    private final SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/chat")
    public void chat(@Payload Message message) {
        log.info("Message received: {}", message);
        simpMessagingTemplate.convertAndSendToUser(message.to(), "/user/queue", message);
    }
    
}
