package com.teashop.teashop_backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.teashop.teashop_backend.controller.login.LoginDto;
import com.teashop.teashop_backend.controller.login.LoginResponse;
import com.teashop.teashop_backend.controller.registration.SignUpDto;
import com.teashop.teashop_backend.model.user.PasswordResetDto;
import com.teashop.teashop_backend.model.user.PasswordResetToken;
import com.teashop.teashop_backend.model.user.PasswordResetTokenRepository;
import com.teashop.teashop_backend.model.user.User;
import com.teashop.teashop_backend.model.user.UserDto;
import com.teashop.teashop_backend.model.user.UserRepository;
import com.teashop.teashop_backend.service.AuthenticationService;
import com.teashop.teashop_backend.service.JwtService;
import com.teashop.teashop_backend.service.ResendEmailService;

import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthenticationService authenticationService;
    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final PasswordResetTokenRepository tokenRepository;
    private final ResendEmailService emailService;

    public AuthController(AuthenticationService authenticationService, 
                         JwtService jwtService, 
                         UserRepository userRepository,
                         BCryptPasswordEncoder passwordEncoder,
                         PasswordResetTokenRepository tokenRepository, ResendEmailService emailService) {
        this.authenticationService = authenticationService;
        this.jwtService = jwtService;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenRepository = tokenRepository;
        this.emailService = emailService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody SignUpDto signUpDto) {
        // Check if the email already exists
        if (userRepository.findByEmail(signUpDto.getEmail()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(Map.of("message", "Email already exists"));
        }
        // Check if any required fields are missing
        if (signUpDto.getEmail() == null || signUpDto.getFirstName() == null || signUpDto.getLastName() == null ||
            signUpDto.getAddress() == null || signUpDto.getCity() == null || signUpDto.getZipcode() == null ||
            signUpDto.getState() == null || signUpDto.getPassword() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(Map.of("message", "Fields are left blank"));
        }
        // Register the user
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
        response.setUser(new UserDto(authenticatedUser));
        return ResponseEntity.ok(response);

    } catch (AuthenticationException e) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
            .body(new LoginResponse("Invalid credentials"));
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody PasswordResetDto passwordResetDto) {
        // Validate the token
        Optional<PasswordResetToken> tokenOptional = tokenRepository.findByToken(passwordResetDto.getToken());
        if (tokenOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("message", "Invalid or expired token"));
        }

        PasswordResetToken token = tokenOptional.get();
        if (token.isExpired()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("message", "Token has expired"));
        }

        // Update the user's password
        User user = token.getUser();
        user.setPassword(passwordEncoder.encode(passwordResetDto.getNewPassword()));
        userRepository.save(user);
        
        // Delete the token
        tokenRepository.delete(token);

        return ResponseEntity.ok(Map.of("message", "Password reset successful"));
}

    @GetMapping("/verify-token")
    public ResponseEntity<?> verifyToken(@RequestParam String token) {
        // Check if the token is valid
        Optional<PasswordResetToken> tokenOptional = tokenRepository.findByToken(token);
        if (tokenOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("message", "Invalid or expired token"));
        }

        PasswordResetToken passwordResetToken = tokenOptional.get();
        if (passwordResetToken.isExpired()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("message", "Token has expired"));
        }

        return ResponseEntity.ok(Map.of("message", "Token is valid"));
    }
    
    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody Map<String, String> request) {
        //Mapping the request url to get an email string
        String email = request.get("email");
        
        if (email == null || email.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Email is required"));
        }
        
        // Find the user by email
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isEmpty()) {
            // For security reasons, don't reveal that the email doesn't exist
            return ResponseEntity.ok(Map.of("message", "If your email exists in our system, you will receive a password reset link shortly"));
        }
        
        //Create a user object from the found user from the email search
        User user = userOptional.get();
        
        // Generate a token
        String token = UUID.randomUUID().toString();
        
        // Save the token in the database
        PasswordResetToken resetToken = new PasswordResetToken(token, user);
        tokenRepository.save(resetToken);
        user.setPreviousPassword(user.getPassword());

        
        // Send the reset email
        boolean emailSent = emailService.sendPasswordResetEmail(
            user.getEmail(), 
            user.getFirstName(), 
            token
        );
        
        if (!emailSent) {
            return ResponseEntity.internalServerError().body(Map.of("message", "Failed to send reset email"));
        }
        
        return ResponseEntity.ok(Map.of("message", "Reset email sent successfully"));
    }
    
    @PutMapping("/reset-token")
    public ResponseEntity<?> saveResetToken(@RequestBody Map<String, String> request) {
        //Mapping the url request data into a email and token string
        String email = request.get("email");
        String token = request.get("token");
        
        if (email == null || token == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "Email and token are required"));
        }
        
        // Find the user by email
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isEmpty()) {
            return ResponseEntity.ok(Map.of("message", "Reset token processed"));
        }
        
        User user = userOptional.get();
        
        // Remove any existing tokens for this user
        tokenRepository.findByUser(user).ifPresent(tokenRepository::delete);
        
        // Create the reset token
        PasswordResetToken resetToken = new PasswordResetToken(token, user);
        
        try {
            //Saving the reset token
            tokenRepository.save(resetToken);
            //Setting the previous password to prevent reuse of passwords in the future
            user.setPreviousPassword(user.getPassword());
            userRepository.save(user);
            return ResponseEntity.ok(Map.of("message", "Reset token saved successfully"));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of(
                "message", "Failed to save reset token",
                "error", e.getMessage()
            ));
        }
    }
    
    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String currentPassword = request.get("currentPassword");
        String newPassword = request.get("newPassword");
        
        if (email == null || currentPassword == null || newPassword == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "Email, current password, and new password are required"));
        }
        
        // Find the user by email
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("message", "Invalid credentials"));
        }
        
        User user = userOptional.get();
        
        // Verify current password
        if (!passwordEncoder.matches(currentPassword, user.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("message", "Current password is incorrect"));
        }
        
        // Update the password
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
        
        return ResponseEntity.ok(Map.of("message", "Password changed successfully"));
    }
}