package com.teashop.teashop_backend.model.product;

import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.ArrayList;

@Service
public class ProductService {
    
    public List<Product> getFeaturedProducts() {
        List<Product> featuredProducts = new ArrayList<>();
        // Add sample featured products
        featuredProducts.add(new Product());
        featuredProducts.add(new Product());
        return featuredProducts;
    }
    
    public List<Product> getProductsByCategory(int categoryId) {
        return new ArrayList<>();
    }
}