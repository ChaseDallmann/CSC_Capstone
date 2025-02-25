package com.teashop.teashop_backend.registration;

import lombok.Data;

@Data
public class SignUpDto {
    private String firstName;
    private String lastName;
    private String name;
    private String email;
    private String address;
    private String city;
    private String state;
    private Integer zipcode;
    private String password;
}