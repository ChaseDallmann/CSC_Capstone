package com.teashop.teashop_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.teashop.teashop_backend.LoginResponse;
import com.teashop.teashop_backend.login.LoginDto;

@RestController
@RequestMapping("/auth")
public class AuthController {
    
    private final AuthenticationManager authenticationManager;

    @Autowired
    public AuthController(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDto loginDto) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    loginDto.getEmail(),
                    loginDto.getPassword()
                )
            );
            
            if (authentication.isAuthenticated()) {
                return ResponseEntity.ok(new LoginResponse("Welcome " + loginDto.getEmail()));
            }
            
            return ResponseEntity.badRequest().body(new LoginResponse("Invalid credentials"));
            
        } catch (AuthenticationException e) {
            return ResponseEntity.badRequest().body(new LoginResponse("Invalid credentials"));
        }
    }
}