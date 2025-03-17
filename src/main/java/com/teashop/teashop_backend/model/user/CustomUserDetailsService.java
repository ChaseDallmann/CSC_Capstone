package com.teashop.teashop_backend.model.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.teashop.teashop_backend.security.UserDetailsImpl;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
    System.out.println("Attempting to load user with email: " + email);
    User user = userRepository.findByEmail(email)
        .orElseThrow(() -> {
            System.out.println("User not found with email: " + email);
            return new UsernameNotFoundException("User not found with email: " + email);
        });
    
    System.out.println("User found: " + user.getEmail());
    return new UserDetailsImpl(user);
}

    // Keep your other methods...
    public User loadCustomerByEmail(String email) {
        return userRepository.findByEmail(email)
            .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
    }

    public User loadCustomerById(int id) {
        return userRepository.findById(id)
            .orElseThrow(() -> new UsernameNotFoundException("User not found with id: " + id));
    }

    public User saveCustomer(User user) {
        return userRepository.save(user);
    }

    public void deleteCustomer(User user) {
        userRepository.delete(user);
    }

    public Iterable<User> getAllUsers() {
        return userRepository.findAll();
    }

    public boolean customerExists(String email) {
        return userRepository.findByEmail(email).isPresent();
    }

    public boolean customerExists(int id) {
        return userRepository.findById(id).isPresent();
    }
}