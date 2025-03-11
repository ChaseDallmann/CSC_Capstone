package com.teashop.teashop_backend.security;

import java.util.Collection;
import java.util.Collections;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.teashop.teashop_backend.model.user.User;
import com.teashop.teashop_backend.model.user.User.Role;

public class UserDetailsImpl implements UserDetails {
    private static final long serialVersionUID = 1L;
    
    private final User user;
    
    public UserDetailsImpl(User user) {
        this.user = user;
    }
    
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Role role = user.getRole();
        if (role == null) {
            role = Role.customer; // Default role
        } else {
            role = Role.customerService;
        }
        return Collections.singletonList(new SimpleGrantedAuthority(role.toString()));
    }
    
    @Override
    public String getPassword() {
        return user.getPassword();
    }
    
    @Override
    public String getUsername() {
        return user.getEmail();
    }
    
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }
    
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }
    
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }
    
    @Override
    public boolean isEnabled() {
        return true;
    }
    
    // Add this getter to access the customer from AuthController
    public User getUser() {
        return user;
    }
}