package com.teashop.teashop_backend.service;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.teashop.teashop_backend.config.ApplicationConfiguration;
import com.teashop.teashop_backend.controller.login.LoginDto;
import com.teashop.teashop_backend.controller.registration.SignUpDto;
import com.teashop.teashop_backend.model.user.User;
import com.teashop.teashop_backend.model.user.User.Role;
import com.teashop.teashop_backend.model.user.UserRepository;

@Service
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public AuthenticationService(UserRepository userRepository, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager, ApplicationConfiguration applicationConfiguration) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
    }

    public User register(SignUpDto input) {
        User user = new User();
        user.setEmail(input.getEmail());
        user.setFirstName(input.getFirstName());
        user.setLastName(input.getLastName());
        user.setStreetAddress(input.getAddress());
        user.setState(input.getState());
        user.setCity(input.getCity());
        user.setZipCode(input.getZipcode());
        user.setPassword(passwordEncoder.encode(input.getPassword()));
        user.setRole(Role.CUSTOMER);

        if (input.getEmail() == null || input.getFirstName() == null || input.getLastName() == null ||
            input.getAddress() == null || input.getCity() == null || input.getZipcode() == null ||
            input.getState() == null || input.getPassword() == null) {
            throw new IllegalArgumentException("Fields are left blank");
        } else {
            return userRepository.save(user);
        }

    }

    public User authenticate(LoginDto input) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(input.getEmail(), input.getPassword()));
        return userRepository.findByEmail(input.getEmail()).orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }
}
