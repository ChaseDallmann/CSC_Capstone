package com.teashop.teashop_backend.model.product;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.List;
import com.teashop.teashop_backend.model.category.Category;


@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
    List<Product> findByCategory(Category category);
    Optional<Product> findByProductName(String productName);
}
