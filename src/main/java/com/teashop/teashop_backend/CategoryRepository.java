package com.teashop.teashop_backend;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.teashop.teashop_backend.model.category.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer> {
}
