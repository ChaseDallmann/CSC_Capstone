package com.teashop.teashop_backend;

import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.ArrayList;

@Repository
public class ProductRepository {

    private List<Product> products = new ArrayList<>();

    public ProductRepository() {
        products.add(new Product(1, "Green Tea", 5.00f, 100, 1, 1));
        products.add(new Product(2, "Black Tea", 5.00f, 100, 1, 1));
        products.add(new Product(3, "Oolong Tea", 5.00f, 100, 1, 1));
        products.add(new Product(4, "White Tea", 5.00f, 100, 1, 1));
        products.add(new Product(5, "Herbal Tea", 5.00f, 100, 1, 1));
        products.add(new Product(6, "Chai Tea", 5.00f, 100, 1, 1));
        products.add(new Product(7, "Matcha Tea", 5.00f, 100, 1, 1));
        products.add(new Product(8, "Pu-erh Tea", 5.00f, 100, 1, 1));
        products.add(new Product(9, "Rooibos Tea", 5.00f, 100, 1, 1));
        products.add(new Product(10, "Yerba Mate Tea", 5.00f, 100, 1, 1));
    }

    public List<Product> getProducts() {
        return products;
    }

    public Product getProductById(int id) {
        for (Product p : products) {
            if (p.getProductID() == id) {
                return p;
            }
        }
        return null;
    }
}
