package com.teashop.teashop_backend.controller.login;

import lombok.Data;

@Data
public class LoginDto {
    private String email;
    private String password;
}