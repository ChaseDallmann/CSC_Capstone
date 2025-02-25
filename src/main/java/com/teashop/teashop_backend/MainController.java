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

    private final CustomerRepository customerRepository;
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final ManufacturerRepository manufacturerRepository;

    public MainController(CustomerRepository customerRepository, ProductRepository productRepository, CategoryRepository categoryRepository, ManufacturerRepository manufacturerRepository) {
        this.customerRepository = customerRepository;
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

    @GetMapping("customers")
        public List<Customer> getAllCustomers() {
            return customerRepository.findAll();
        }

    @GetMapping("customers/{id}")
    public ResponseEntity<Customer> getCustomerById(@PathVariable int id) {
        return customerRepository.findById(id)
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
