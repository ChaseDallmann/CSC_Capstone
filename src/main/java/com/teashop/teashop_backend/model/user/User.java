package com.teashop.teashop_backend.model.user;

import jakarta.persistence.*;

@Entity
@Table(name = "user") // The table name in your database
public class User {

    @Id
    private String username;
    private String password;
    private String role;

    // Getters and setters

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
