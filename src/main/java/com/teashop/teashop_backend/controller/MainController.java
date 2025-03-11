package com.teashop.teashop_backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.ui.Model;

import com.teashop.teashop_backend.CategoryRepository;
import com.teashop.teashop_backend.Manufacturer;
import com.teashop.teashop_backend.ManufacturerRepository;
import com.teashop.teashop_backend.model.category.Category;
import com.teashop.teashop_backend.model.customer.Customer;
import com.teashop.teashop_backend.model.customer.CustomerRepository;
import com.teashop.teashop_backend.model.product.Product;
import com.teashop.teashop_backend.model.product.ProductRepository;
import com.teashop.teashop_backend.registration.*;

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

    @GetMapping("manufacturers")
    public List<Manufacturer> getAllManufacturers() {
        return manufacturerRepository.findAll();
    }

    @GetMapping("manufacturers/{id}")
    public ResponseEntity<Manufacturer> getManufacturerById(@PathVariable int id) {
        Optional<Manufacturer> manufacturer = manufacturerRepository.findById(id);
        return manufacturer.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

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
