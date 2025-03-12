//https://www.geeksforgeeks.org/how-to-build-spring-boot-project-in-vscode/

package com.teashop.teashop_backend;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@ComponentScan("com.teashop.teashop_backend")
public class TeashopBackendApplication {

    private static final Logger log = LoggerFactory.getLogger(TeashopBackendApplication.class);

    public static void main(String[] args) {
        SpringApplication.run(TeashopBackendApplication.class, args);
        log.info("Tea Shop is up and running");
    }
}