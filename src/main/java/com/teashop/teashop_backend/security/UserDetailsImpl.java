package com.teashop.teashop_backend.security;

import java.util.Collection;
import java.util.Collections;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.teashop.teashop_backend.model.customer.Customer;

public class UserDetailsImpl implements UserDetails {
    private static final long serialVersionUID = 1L;
    
    private final Customer customer;
    
    public UserDetailsImpl(Customer customer) {
        this.customer = customer;
    }
    
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        String role = customer.getRole();
        if (role == null || role.isEmpty()) {
            role = "ROLE_USER"; // Default role
        } else if (!role.startsWith("ROLE_")) {
            role = "ROLE_" + role;
        }
        return Collections.singletonList(new SimpleGrantedAuthority(role));
    }
    
    @Override
    public String getPassword() {
        return customer.getPassword();
    }
    
    @Override
    public String getUsername() {
        return customer.getEmail();
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
    public Customer getCustomer() {
        return customer;
    }
}