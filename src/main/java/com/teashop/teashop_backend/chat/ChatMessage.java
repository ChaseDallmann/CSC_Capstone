package com.teashop.teashop_backend.chat;

import com.google.protobuf.Extension.MessageType;

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
}
