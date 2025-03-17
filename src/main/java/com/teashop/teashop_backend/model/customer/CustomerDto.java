package com.teashop.teashop_backend.model.customer;   

import lombok.Data;

@Data
public class CustomerDto {
    private Integer id;
    private String email;
    private String name;
    private String role;
    
    public CustomerDto(Customer customer) {
        this.id = customer.getCustomerID();
        this.email = customer.getEmail();
        this.name = customer.getName();
        this.role = customer.getRole();
    }
}