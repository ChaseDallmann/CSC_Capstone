//https://www.geeksforgeeks.org/how-to-build-spring-boot-project-in-vscode/

package com.teashop.teashop_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
public class TeashopBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(TeashopBackendApplication.class, args);
    }
}

@RestController
@RequestMapping("/api/test")
class TestController {

    @GetMapping
    public String testEndpoint() {
        return "Tea Shop API is working!";
    }
}
