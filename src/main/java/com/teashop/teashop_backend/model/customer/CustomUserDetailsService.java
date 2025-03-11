package com.teashop.teashop_backend.model.customer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.teashop.teashop_backend.security.UserDetailsImpl;

import java.util.Collections;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private CustomerRepository customerRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Customer customer = customerRepository.findByEmail(email)
            .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
        
        return new UserDetailsImpl(customer);
    }

    // Keep your other methods...
    public Customer loadCustomerByEmail(String email) {
        return customerRepository.findByEmail(email)
            .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
    }

    public Customer loadCustomerById(int id) {
        return customerRepository.findById(id)
            .orElseThrow(() -> new UsernameNotFoundException("User not found with id: " + id));
    }

    public Customer saveCustomer(Customer customer) {
        return customerRepository.save(customer);
    }

    public void deleteCustomer(Customer customer) {
        customerRepository.delete(customer);
    }

    public Iterable<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    public boolean customerExists(String email) {
        return customerRepository.findByEmail(email).isPresent();
    }

    public boolean customerExists(int id) {
        return customerRepository.findById(id).isPresent();
    }
}