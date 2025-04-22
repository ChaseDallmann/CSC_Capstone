package com.teashop.teashop_backend.model.chat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class ChatMessage {
    private String content;
    private String sender;
    private String receiver;
    private String senderRole;
    private String receiverRole; 
    private Status status;
}