package com.teashop.teashop_backend.model.user;   

import com.teashop.teashop_backend.model.user.User.Role;

import lombok.Data;

@Data
public class UserDto {
    private Integer id;
    private String email;
    private String name;
    private Role role;
    // Add other non-sensitive fields you want to return
    
    // Constructor to create from User entity
    public UserDto(User user) {
        this.id = user.getUserID();
        this.email = user.getEmail();
        this.name = user.getName();
        this.role = user.getRole();
        // Map other fields as needed
    }
}