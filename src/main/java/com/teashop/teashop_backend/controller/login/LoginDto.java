package com.teashop.teashop_backend.controller.login;

import com.teashop.teashop_backend.model.user.User.Role;

import lombok.Data;

@Data
public class LoginDto {
    private String email;
    private String password;
    private Role role;
}