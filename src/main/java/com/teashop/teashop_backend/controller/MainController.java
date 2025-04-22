package com.teashop.teashop_backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.teashop.teashop_backend.model.category.Category;
import com.teashop.teashop_backend.model.category.CategoryRepository;
import com.teashop.teashop_backend.model.manufacturer.Manufacturer;
import com.teashop.teashop_backend.model.manufacturer.ManufacturerRepository;
import com.teashop.teashop_backend.model.order.Order;
import com.teashop.teashop_backend.model.order.OrderDetails;
import com.teashop.teashop_backend.model.order.OrderDetailsRepository;
import com.teashop.teashop_backend.model.order.OrderRepository;
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
    private final OrderRepository orderRepository;
    private final OrderDetailsRepository orderDetailsRepository;

    public MainController(UserRepository userRepository, OrderDetailsRepository orderDetailsRepository, ProductRepository productRepository, CategoryRepository categoryRepository, ManufacturerRepository manufacturerRepository, OrderRepository orderRepository) {
        this.userRepository = userRepository;
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
        this.manufacturerRepository = manufacturerRepository;
        this.orderRepository = orderRepository;
        this.orderDetailsRepository = orderDetailsRepository;
    }

    @GetMapping("users")
        public List<User> getAllCustomers() {
            return userRepository.findAll();
        }

    @GetMapping("user/check-email")
    public Boolean emailDuplicateCheck(@RequestParam String email) {
        // Check if the email already exists in the database
        // If it exists, return true
        // If it doesn't exist, return false
        return userRepository.findByEmail(email).isPresent();
    }

    @GetMapping("user/find-by-email/{email}")
    public Optional<User> getUserByEmail(@PathVariable String email) {
        // Check if the email already exists in the database
        // If it exists, return the true
        // If it doesn't exist, return false
        return userRepository.findByEmail(email);
    }
    
    //Only useful for customer service
    @GetMapping("orders")
    public List<Order> getOrderById() {
        return orderRepository.findAll();
    }

    @GetMapping("user/check-password")
    public Boolean checkPreviousPassword(@RequestParam String email, @RequestParam String password) {
    return userRepository.findByEmail(email)
            .map(user -> !user.getPreviousPassword().equals(password))
            .orElse(true);
    }

    //Only useful for customer service
    @GetMapping("order-details")
    public List<OrderDetails> getOrderDetails() {
    return orderDetailsRepository.findAll();
    }

    //Mappings used for customer dashboard
    @GetMapping("orders/{userID}")
    public List<Order> getOrdersByUser(@PathVariable int userID) {
        return orderRepository.findByUserID(userID);
    }

    @GetMapping("order-details/{userID}/{orderID}")
    public List<OrderDetails> getOrderDetailsByOrder(@PathVariable int userID, @PathVariable int orderID) {
        // Check if the order belongs to the user
        return orderDetailsRepository.findByOrderID(orderID);
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
