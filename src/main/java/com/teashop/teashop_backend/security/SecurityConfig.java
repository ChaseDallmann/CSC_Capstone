package com.teashop.teashop_backend.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.authentication.AuthenticationProvider;
import com.teashop.teashop_backend.config.ApplicationConfiguration;
import com.teashop.teashop_backend.config.JwtAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final ApplicationConfiguration applicationConfiguration;
    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final AuthenticationProvider authenticationProvider;

    public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter, AuthenticationProvider authenticationProvider, ApplicationConfiguration applicationConfiguration) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
        this.authenticationProvider = authenticationProvider;
        this.applicationConfiguration = applicationConfiguration;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(AbstractHttpConfigurer::disable)
                .cors(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(requests -> requests
                        .requestMatchers("/auth/**", "/products/**", "/ws/**", "/ms/**")
                        .permitAll()
                        .anyRequest()
                        .authenticated())
                .sessionManagement(management -> management
                    .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .exceptionHandling(ex -> {
                    ex.authenticationEntryPoint((request, response, authenticationException) -> 
                        response.sendError(401, "Unauthorized"));
                    ex.accessDeniedHandler((request, response, accessDeniedException) -> 
                        response.sendError(403, "Forbidden"));
                });
        return http.build();
    }
}