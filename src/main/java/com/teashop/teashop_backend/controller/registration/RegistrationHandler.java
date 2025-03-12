package com.teashop.teashop_backend.controller.registration;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.teashop.teashop_backend.model.user.User;

@Controller
@RequestMapping("/api/registration")
public class RegistrationHandler {
    
    private static final Logger logger = LoggerFactory.getLogger(RegistrationHandler.class);

    @PostMapping
    @ResponseBody
    public String registerCustomer(@RequestBody User newCustomer) {
        // Log the registration attempt
        logger.info("Attempting to register customer: {}", newCustomer.getEmail());

        // Add validation logic
        if (newCustomer.getName() == null || newCustomer.getName().isEmpty()) {
            logger.error("Registration failed: Name is required");
            return "Registration failed: Name is required";
        }

        if (newCustomer.getEmail() == null || !isValidEmail(newCustomer.getEmail())) {
            logger.error("Registration failed: Invalid email");
            return "Registration failed: Invalid email";
        }

        // TODO: Add password validation
        
        logger.info("Customer registered successfully: {}", newCustomer.getEmail());
        return "Registration successful";
    }

    // Simple email validation method
    private boolean isValidEmail(String email) {
        String emailRegex = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$";
        return email.matches(emailRegex);
    }
}