package com.teashop.teashop_backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.teashop.teashop_backend.model.category.Category;
import com.teashop.teashop_backend.model.category.CategoryRepository;
import com.teashop.teashop_backend.model.manufacturer.Manufacturer;
import com.teashop.teashop_backend.model.manufacturer.ManufacturerRepository;
import com.teashop.teashop_backend.model.product.Product;
import com.teashop.teashop_backend.model.product.ProductRepository;
import com.teashop.teashop_backend.model.user.User;
import com.teashop.teashop_backend.model.user.UserRepository;

import java.util.Optional;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
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

    @GetMapping("users")
        public List<User> getAllCustomers() {
            return userRepository.findAll();
        }

    @GetMapping("user/{id}")
    public ResponseEntity<User> getCustomerById(@PathVariable int id) {
        return userRepository.findById(id)
            .map(ResponseEntity::ok)
            .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("user/{id}")
        public ResponseEntity<?> updateUser(@PathVariable int id, @RequestBody User updatedUser) {
            return userRepository.findById(id)
                .map(existingUser -> {
                    if (updatedUser.getName() != null) {
                        existingUser.setName(updatedUser.getName());
                    }
                    
                    if (updatedUser.getEmail() != null) {
                        existingUser.setEmail(updatedUser.getEmail());
                    }
                    
                    if (updatedUser.getStreetAddress() != null) {
                        existingUser.setStreetAddress(updatedUser.getStreetAddress());
                    }
                    
                    if (updatedUser.getCity() != null) {
                        existingUser.setCity(updatedUser.getCity());
                    }
                    
                    if (updatedUser.getZipCode() != 0) {
                        existingUser.setZipCode(updatedUser.getZipCode());
                    }
                    
                    // Save the updated user
                    User savedUser = userRepository.save(existingUser);
                    
                    return ResponseEntity.ok(savedUser);
                })
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

    @GetMapping("manufacturers")
    public List<Manufacturer> getAllManufacturers() {
        return manufacturerRepository.findAll();
    }
    
}
