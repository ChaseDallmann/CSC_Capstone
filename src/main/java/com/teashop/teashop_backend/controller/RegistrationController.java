package com.teashop.teashop_backend.controller;

import java.lang.annotation.Annotation;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import jakarta.persistence.Entity;
import java.util.*;
import com.teashop.teashop_backend.Customer;
import com.teashop.teashop_backend.CustomerRepository;
import com.teashop.teashop_backend.User;
import com.teashop.teashop_backend.UserRepository;
import com.teashop.teashop_backend.registration.SignUpDto;

@Controller
public class RegistrationController {

    private final UserRepository userRepository;

    public RegistrationController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Display the registration form
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody SignUpDto signUpDto) {
        String email = signUpDto.getEmail();
        String fullName = signUpDto.getName();
        String firstName = signUpDto.getName().split(" ")[0];
        String lastName = signUpDto.getName().split(" ")[1];
        String address = signUpDto.getAddress();
        String city = signUpDto.getCity();
        Integer zipcode = signUpDto.getZipcode();
        String state = signUpDto.getState();
        String password = signUpDto.getPassword();
        //Encrypting the password
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        password = passwordEncoder.encode(password);

        User user = new User();
        user.setEmail(email);
        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setName(fullName);
        user.setStreetAddress(address);
        user.setState(state);
        user.setCity(city);
        user.setZipCode(zipcode);
        user.setPassword(password);

        if (email == null || firstName == null || lastName == null || fullName == null || address == null || city == null || zipcode == null || state == null || password == null) {
            return ResponseEntity.badRequest().body("Fields are left blank");
        } else {
            userRepository.save(user);
            return ResponseEntity.ok().body("Registration successful " + user.getName() + " " + user.getEmail());
        }
    }
}