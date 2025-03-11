package com.teashop.teashop_backend.model.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    // Custom query if needed, e.g., find by username
    User findByUsername(String username);
}
