package com.teashop.teashop_backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.List;

@Configuration
public class CorsConfig {

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();

        // Get allowed origins from environment variable or use defaults
        String corsAllowedOrigins = System.getenv("CORS_ALLOWED_ORIGINS");
        if (corsAllowedOrigins != null && !corsAllowedOrigins.isEmpty()) {
            // Split by comma if multiple origins
            String[] origins = corsAllowedOrigins.split(",");
            for (String origin : origins) {
                config.addAllowedOrigin(origin.trim());
            }
        } else {
            // Default to localhost origins
            config.setAllowedOrigins(List.of(
                "http://localhost:3000", 
                "https://localhost:3000",
                "http://127.0.0.1:3000",
                "https://127.0.0.1:3000"
            ));
        }
        
        // Allow all headers
        config.setAllowedHeaders(List.of(
            "Origin", 
            "Content-Type", 
            "Accept", 
            "Authorization", 
            "X-Requested-With", 
            "Access-Control-Request-Method", 
            "Access-Control-Request-Headers"
        ));
        
        // Allow all common HTTP methods
        config.setAllowedMethods(List.of(
            "GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS", "HEAD"
        ));
        
        // Allow credentials (cookies, authorization headers)
        config.setAllowCredentials(true);
        
        // Cache preflight response for 1 hour
        config.setMaxAge(3600L);
        
        // Expose common headers
        config.setExposedHeaders(List.of(
            "Access-Control-Allow-Origin",
            "Access-Control-Allow-Credentials",
            "Authorization"
        ));

        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }
}