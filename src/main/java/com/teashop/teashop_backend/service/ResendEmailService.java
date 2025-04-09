package com.teashop.teashop_backend.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;

import java.util.Map;
import java.util.HashMap;

@Service
public class ResendEmailService {

    private final RestTemplate restTemplate;
    
    @Value("${frontend.url}")
    private String frontendUrl;

    public ResendEmailService() {
        this.restTemplate = new RestTemplate();
    }

    public boolean sendPasswordResetEmail(String email, String firstName, String token) {
        try {
            // Call the Next.js API route that handles sending emails via Resend
            String resetApiUrl = frontendUrl + "/api/send-reset";
            
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            
            Map<String, String> requestBody = new HashMap<>();
            requestBody.put("email", email);
            requestBody.put("firstName", firstName);
            requestBody.put("token", token);
            
            HttpEntity<Map<String, String>> request = new HttpEntity<>(requestBody, headers);
            
            ResponseEntity<Map> response = restTemplate.postForEntity(
                resetApiUrl, 
                request, 
                Map.class
            );
            
            return response.getStatusCode().is2xxSuccessful();
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}