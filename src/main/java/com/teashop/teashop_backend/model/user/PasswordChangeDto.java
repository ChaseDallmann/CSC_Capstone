package com.teashop.teashop_backend.model.user;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PasswordChangeDto {
    private int userId;
    private String currentPassword;
    private String newPassword;

    public PasswordChangeDto() {
    }

    public PasswordChangeDto(int userId, String currentPassword, String newPassword) {
        this.userId = userId;
        this.currentPassword = currentPassword;
        this.newPassword = newPassword;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getCurrentPassword() {
        return currentPassword;
    }

    public void setCurrentPassword(String currentPassword) {
        this.currentPassword = currentPassword;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }
}