package com.teashop.teashop_backend.model.user;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PasswordResetDto {
    private String email;
    private String newPassword;
    private String token;

    public PasswordResetDto() {
    }

    public PasswordResetDto(String email, String newPassword) {
        this.email = email;
        this.newPassword = newPassword;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}