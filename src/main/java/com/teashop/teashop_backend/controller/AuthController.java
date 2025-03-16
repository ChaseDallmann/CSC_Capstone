package com.teashop.teashop_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.teashop.teashop_backend.controller.login.LoginDto;
import com.teashop.teashop_backend.controller.login.LoginResponse;
import com.teashop.teashop_backend.controller.registration.SignUpDto;
import com.teashop.teashop_backend.model.user.User;
import com.teashop.teashop_backend.model.user.UserDto;
import com.teashop.teashop_backend.service.AuthenticationService;
import com.teashop.teashop_backend.service.JwtService;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthenticationService authenticationService;
    private final JwtService jwtService;

    @Autowired
    public AuthController(AuthenticationService authenticationService, JwtService jwtService) {
        this.authenticationService = authenticationService;
        this.jwtService = jwtService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody SignUpDto signUpDto) {
        User registeredUser = authenticationService.register(signUpDto);
        return ResponseEntity.ok(new UserDto(registeredUser));
    }

    @PostMapping("/login")
public ResponseEntity<?> login(@RequestBody LoginDto loginDto) {
    try {
        User authenticatedUser = authenticationService.authenticate(loginDto);
        String token = jwtService.generateToken(authenticatedUser);
        LoginResponse response = new LoginResponse();
        response.setToken(token);
        response.setExpiresIn(jwtService.getExpirationTime());
        response.setSuccess(true);
        response.setMessage("Login successful");
        response.setUser(new UserDto(authenticatedUser)); // Include user data
        return ResponseEntity.ok(response);

    } catch (AuthenticationException e) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
            .body(new LoginResponse("Invalid credentials")); // This constructor sets success=false
        }
    }
}