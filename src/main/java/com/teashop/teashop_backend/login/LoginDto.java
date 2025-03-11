package com.teashop.teashop_backend.login;

import lombok.Data;

@Data
public class LoginDto {
    private String email;
    private String password;
    private String role;
}