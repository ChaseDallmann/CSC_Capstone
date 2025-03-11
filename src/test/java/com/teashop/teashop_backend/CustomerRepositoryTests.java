package com.teashop.teashop_backend;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.annotation.Rollback;

import com.teashop.teashop_backend.model.category.Category;
import com.teashop.teashop_backend.model.category.CategoryRepository;
import com.teashop.teashop_backend.model.customer.Customer;
import com.teashop.teashop_backend.model.customer.CustomerRepository;
import com.teashop.teashop_backend.model.manufacturer.Manufacturer;
import com.teashop.teashop_backend.model.manufacturer.ManufacturerRepository;
import com.teashop.teashop_backend.model.product.Product;
import com.teashop.teashop_backend.model.product.ProductRepository;

import java.util.Random;
import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Rollback(false)
public class CustomerRepositoryTests {

    private static final String ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    private static final String NUMBERS = "0123456789";
    private static final String RANDOM = ALPHABET + NUMBERS;

    private static final String[] EMAIL_DOMAINS = {"@gmail.com", "@yahoo.com", "@hotmail.com", "@outlook.com", "@aol.com"};

    private final Random random = new Random();
    BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    private String generateRandomString(int length, String chars) {
        StringBuilder sb = new StringBuilder(length);
        for (int i = 0; i < length; i++) {
            sb.append(chars.charAt(random.nextInt(chars.length())));
        }
        return sb.toString();
    }

    private String generateRandomEmail() {
        return generateRandomString(2, ALPHABET) +
               generateRandomString(3, NUMBERS) +
               EMAIL_DOMAINS[random.nextInt(EMAIL_DOMAINS.length)];
    }

    private String generateRandomName() {
        return generateRandomString(5, ALPHABET);
    }

    private String generateRandomPassword() {
        return encoder.encode(generateRandomString(5, ALPHABET) + generateRandomString(3, NUMBERS));
    }

    private String generateRandomState() {
        return generateRandomString(3, ALPHABET);
    }

    private String generateRandomAddress() {
        return generateRandomString(3, NUMBERS) + " " + generateRandomString(4, ALPHABET);
    }

    private String generateRandomCity() {
        return generateRandomString(5, ALPHABET);
    }

    private int generateRandomZipCode() {
        return Integer.parseInt(generateRandomString(5, NUMBERS));
    }

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private CustomerRepository customerRepo;

    @Autowired
    private ProductRepository productRepo;

    @Autowired
    private CategoryRepository categoryRepo;

    @Autowired
    private ManufacturerRepository manufacturerRepo;

    @Test
    public void testCreateCustomer() {
        Customer customer = new Customer();
        customer.setEmail("test1234@example.com");
        customer.setFirstName("John");
        customer.setLastName("Doe");
        customer.setPassword(encoder.encode("test1234"));  
        customer.setState("California");
        customer.setStreetAddress("123 Fake St");
        customer.setCity("Los Angeles");
        customer.setZipCode(90001);
        customer.setName(customer.getFirstName() + " " + customer.getLastName());

        Customer savedCustomer = customerRepo.save(customer);
        Customer existCustomer = entityManager.find(Customer.class, savedCustomer.getCustomerID());

        assertThat(existCustomer).isNotNull();
        assertThat(existCustomer.getEmail()).isEqualTo(customer.getEmail());
    }

    @Test
    public void testCreateRandomCustomer() {
        Customer customer = new Customer();
        customer.setEmail(generateRandomEmail());
        customer.setFirstName(generateRandomName());
        customer.setLastName(generateRandomName());
        customer.setPassword(generateRandomPassword());
        customer.setState(generateRandomState());
        customer.setStreetAddress(generateRandomAddress());
        customer.setCity(generateRandomCity());
        customer.setZipCode(generateRandomZipCode());
        customer.setName(customer.getFirstName() + " " + customer.getLastName());

        Customer savedCustomer = customerRepo.save(customer);
        Customer existCustomer = entityManager.find(Customer.class, savedCustomer.getCustomerID());

        assertThat(existCustomer).isNotNull();
        assertThat(existCustomer.getEmail()).isEqualTo(customer.getEmail());
    }

    @Test
    public void testCreateProduct() {
        Category category = new Category();
        category = categoryRepo.save(category);

        Manufacturer manufacturer = new Manufacturer(0, generateRandomName(), "12345@test.com");
        manufacturer = manufacturerRepo.save(manufacturer);

        Product product = new Product();
        product.setProductName("Boba Tea");
        product.setProductDescription("A delicious boba tea");
        product.setPrice(10.99f);
        product.setCategory(category);
        product.setManufacturer(manufacturer);

        Product savedProduct = productRepo.save(product);
        Product existProduct = entityManager.find(Product.class, savedProduct.getProductID());

        assertThat(existProduct).isNotNull();
        assertThat(existProduct.getProductName()).isEqualTo(product.getProductName());
    }
}
