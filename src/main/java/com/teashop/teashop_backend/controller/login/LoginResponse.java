package com.teashop.teashop_backend.controller.login;

import com.teashop.teashop_backend.model.user.UserDto;

import lombok.Data;

@Data
public class LoginResponse {
    private String message;
    private boolean success;
    private UserDto user;
    private String token;
    private long expiresIn;

    // Constructor for error responses
    public LoginResponse(String message) {
        this.message = message;
        this.success = false; // Changed to false for error responses
    }

    // Constructor for successful logins
    public LoginResponse() {
        this.success = true; // Default to true for success
    }

    public LoginResponse(String message, String token) {
        this.message = message;
        this.token = token;
        this.success = true;
    }

    public LoginResponse(String message, String token, long expiresIn) {
        this.message = message;
        this.token = token;
        this.expiresIn = expiresIn;
        this.success = true;
    }

    public LoginResponse(String message, UserDto user, String token, long expiresIn) {
        this.message = message;
        this.user = user;
        this.token = token;
        this.expiresIn = expiresIn;
        this.success = true;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getToken() { // Fixed method name
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public long getExpiresIn() {
        return expiresIn;
    }

    public void setExpiresIn(long expiresIn) {
        this.expiresIn = expiresIn;
    }

    public UserDto getUser() {
        return user;
    }
    
    public void setUser(UserDto user) {
        this.user = user;
    }
}