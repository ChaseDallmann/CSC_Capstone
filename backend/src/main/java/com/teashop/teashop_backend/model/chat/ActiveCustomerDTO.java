package com.teashop.teashop_backend.model.chat;

import java.time.LocalDateTime;

/**
 * Data Transfer Object for active customer information
 */
public class ActiveCustomerDTO {
    private String email;
    private String name;
    private String lastMessage;
    private LocalDateTime timestamp;

    public ActiveCustomerDTO() {
    }

    public ActiveCustomerDTO(String email, String name, String lastMessage, LocalDateTime timestamp) {
        this.email = email;
        this.name = name;
        this.lastMessage = lastMessage;
        this.timestamp = timestamp;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLastMessage() {
        return lastMessage;
    }

    public void setLastMessage(String lastMessage) {
        this.lastMessage = lastMessage;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
}