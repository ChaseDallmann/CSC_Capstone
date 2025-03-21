package com.teashop.teashop_backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.Message;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;
import com.teashop.teashop_backend.controller.AuthController;
import com.teashop.teashop_backend.service.JwtService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;


@Configuration
@EnableWebSocketMessageBroker
@Order(Ordered.HIGHEST_PRECEDENCE + 99)
@RequiredArgsConstructor
@Slf4j

public class WebSocketConfig implements WebSocketMessageBrokerConfigurer{

    private AuthenticationManager authenticationManager;
    private final AuthController authController;
    private final JwtService jwtService;
    private final ApplicationConfiguration applicationConfiguration;

        @Override
        public void configureMessageBroker(MessageBrokerRegistry registry) {
            registry.enableSimpleBroker("/user/queue/");
            registry.setApplicationDestinationPrefixes("/app");
            registry.setUserDestinationPrefix("/user");
        }

        @Override
        public void configureClientInboundChannel(ChannelRegistration registration) {
            registration.interceptors(new ChannelInterceptor() {
                @Override
                public Message<?> preSend(Message<?> message, MessageChannel channel) {
                    StompHeaderAccessor accessor =
                        MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);
                    
                    if (accessor != null && StompCommand.CONNECT.equals(accessor.getCommand())) {
                        log.debug("Processing CONNECT command with headers: {}", accessor.getMessageHeaders());
                        
                        String authorizationHeader = accessor.getFirstNativeHeader("Authorization");
                        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
                            String token = authorizationHeader.substring(7);
                            try {
                                String username = jwtService.extractUsername(token);
                                log.debug("Extracted username from token: {}", username);
                                
                                UserDetails userDetails = applicationConfiguration.userDetailsService().loadUserByUsername(username);
                                log.debug("Loaded user details for username: {}", username);
                                
                                if (jwtService.isTokenValid(token, userDetails)) {
                                    UsernamePasswordAuthenticationToken authentication = 
                                        new UsernamePasswordAuthenticationToken(
                                            userDetails, 
                                            null, 
                                            userDetails.getAuthorities()
                                        );
                                        
                                    SecurityContextHolder.getContext().setAuthentication(authentication);
                                    accessor.setUser(authentication);
                                    log.info("WebSocket connection authenticated for user: {}", username);
                                } else {
                                    log.warn("Invalid token for user: {}", username);
                                }
                            } catch (Exception e) {
                                log.error("Error authenticating WebSocket connection", e);
                            }
                        } else {
                            log.debug("No Authorization header found or not in Bearer format");
                        }
                    }
                    return message;
                }
            });
        }

        @Override
        public void registerStompEndpoints(StompEndpointRegistry registry) {
            registry.addEndpoint("/ws")
            .setAllowedOriginPatterns("*");
            
            registry.addEndpoint("/ws")
            .setAllowedOriginPatterns("*")
            .withSockJS();
        }

}