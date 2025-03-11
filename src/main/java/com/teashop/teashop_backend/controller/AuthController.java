package com.teashop.teashop_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.teashop.teashop_backend.login.LoginDto;
import com.teashop.teashop_backend.login.LoginResponse;
import com.teashop.teashop_backend.model.customer.Customer;
import com.teashop.teashop_backend.model.customer.CustomerDto;
import com.teashop.teashop_backend.security.UserDetailsImpl;

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
            // Authenticate user credentials
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    loginDto.getEmail(),
                    loginDto.getPassword()
                )
            );

            // Check if authentication was successful
            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
            Customer customer = userDetails.getCustomer(); // Get the customer object from the UserDetailsImpl

            // Spring Security will automatically manage the session and session ID for the user
            // Returning customer information as part of the response
            return ResponseEntity.ok(new CustomerDto(customer)); // Convert to DTO if needed

        } catch (AuthenticationException e) {
            return ResponseEntity.badRequest().body(new LoginResponse("Invalid credentials"));
        }
    }
}
