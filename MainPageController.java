package com.teashop.teashop_backend;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;
import java.util.List;

@RestController
@RequestMapping("/api")
public class MainPageController {

    private final CustomerRepository customerRepository;
    private final ProductRepository productRepository;

    public MainPageController(CustomerRepository customerRepository, ProductRepository productRepository) {
        this.customerRepository = customerRepository;
        this.productRepository = productRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        return customerRepository.findByEmail(loginRequest.getEmail())
            .filter(customer -> customer.getPassword().equals(loginRequest.getPassword()))
            .map(customer -> ResponseEntity.ok().body(customer))
            .orElse(ResponseEntity.status(401).build());
    }

    @GetMapping("/customers")
        public List<Customer> getAllCustomers() {
            return customerRepository.findAll();
        }

    @GetMapping("/customers/{id}")
    public ResponseEntity<Customer> getCustomerById(@PathVariable int id) {
        return customerRepository.findById(id)
            .map(ResponseEntity::ok)
            .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/products")
    public List<Product> getAllProducts() {
        return productRepository.getProducts();
    }

    @GetMapping("/products/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable int id) {
        Optional<Product> product = Optional.ofNullable(productRepository.getProductById(id));
        return product.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
}
