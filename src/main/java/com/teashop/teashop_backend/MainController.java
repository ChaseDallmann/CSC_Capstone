package com.teashop.teashop_backend;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.ui.Model;

import java.util.Optional;
import java.util.List;


@RestController
@RequestMapping("/")
public class MainController {

    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final ManufacturerRepository manufacturerRepository;

    public MainController(UserRepository userRepository, ProductRepository productRepository, CategoryRepository categoryRepository, ManufacturerRepository manufacturerRepository) {
        this.userRepository = userRepository;
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
        this.manufacturerRepository = manufacturerRepository;
    }

    /*@PostMapping("customerlogin")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        return customerRepository.findByEmail(loginRequest.getEmail())
            .filter(customer -> customer.getPassword().equals(loginRequest.getPassword()))
            .map(customer -> ResponseEntity.ok().body(customer))
            .orElse(ResponseEntity.status(401).build());
    }*/

    @GetMapping("users")
        public List<User> getAllCustomers() {
            return userRepository.findAll();
        }

    @GetMapping("customers/{id}")
    public ResponseEntity<User> getCustomerById(@PathVariable int id) {
        return userRepository.findById(id)
            .map(ResponseEntity::ok)
            .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("products")
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @GetMapping("products/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable int id) {
        Optional<Product> product = productRepository.findById(id);
        return product.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("categories")
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }
    
}
