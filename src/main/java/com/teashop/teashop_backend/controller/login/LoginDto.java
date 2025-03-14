package com.teashop.teashop_backend.controller.login;

import com.teashop.teashop_backend.model.user.User.Role;

import lombok.Data;

@Data
public class LoginDto {
    private String email;
    private String name;
    private String city;
    private String address;
    private String state;
    private Integer  zipcode;
    private String password;
    private Role role;
}