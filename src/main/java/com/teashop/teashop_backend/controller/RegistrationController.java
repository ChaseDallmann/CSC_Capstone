package com.teashop.teashop_backend.controller;

import java.lang.annotation.Annotation;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import jakarta.persistence.Entity;
import java.util.*;

import com.teashop.teashop_backend.model.customer.Customer;
import com.teashop.teashop_backend.model.customer.CustomerRepository;
import com.teashop.teashop_backend.registration.SignUpDto;

@RestController
public class RegistrationController {

    private final CustomerRepository customerRepository;

    public RegistrationController(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
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
        String role = "ROLE_USER";  // Default role
        //Encrypting the password
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        password = passwordEncoder.encode(password);

        Customer customer = new Customer();
        customer.setEmail(email);
        customer.setFirstName(firstName);
        customer.setLastName(lastName);
        customer.setName(fullName);
        customer.setStreetAddress(address);
        customer.setState(state);
        customer.setCity(city);
        customer.setZipCode(zipcode);
        customer.setPassword(password);
        customer.setRole(role);

        if (email == null || firstName == null || lastName == null || fullName == null || address == null || city == null || zipcode == null || state == null || password == null || role == null) {
            return ResponseEntity.badRequest().body("Fields are left blank");
        } else {
            customerRepository.save(customer);
            return ResponseEntity.ok().body("Registration successful " + customer.getName() + " " + customer.getEmail());
        }
    }
}