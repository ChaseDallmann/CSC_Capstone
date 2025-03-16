package com.teashop.teashop_backend.chat;

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
    private MessageType type;
    
    // Define your own MessageType enum
    public enum MessageType {
        CHAT,
        JOIN,
        LEAVE
        // Add other message types as needed
    }
}