package com.teashop.teashop_backend.login;

import com.teashop.teashop_backend.model.customer.CustomerDto;

import lombok.Data;

@Data
public class LoginResponse {
    private String message;
    private boolean success;
    private CustomerDto customer;

    // Constructor for error responses
    public LoginResponse(String message) {
        this.message = message;
        this.success = false;
    }

    // Constructor for successful logins
    public LoginResponse(String message, CustomerDto customer) {
        this.message = message;
        this.success = true;
        this.customer = customer;
    }
}