package com.teashop.teashop_backend.controller.login;

import com.teashop.teashop_backend.model.user.UserDto;

import lombok.Data;

@Data
public class LoginResponse {
    private String message;
    private boolean success;
    private UserDto user;

    // Constructor for error responses
    public LoginResponse(String message) {
        this.message = message;
        this.success = false;
    }

    // Constructor for successful logins
    public LoginResponse(String message, UserDto user) {
        this.message = message;
        this.success = true;
        this.user = user;
    }
}