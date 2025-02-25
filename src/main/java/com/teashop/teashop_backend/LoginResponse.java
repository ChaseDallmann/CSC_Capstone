package com.teashop.teashop_backend;

public class LoginResponse {
    private String message;
    
    public LoginResponse(String message) {
        this.message = message;
    }
    
    // Getter and setter
    public String getMessage() {
        return message;
    }
}