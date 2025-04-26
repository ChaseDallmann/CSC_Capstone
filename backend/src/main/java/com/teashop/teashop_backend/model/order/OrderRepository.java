package com.teashop.teashop_backend.model.order;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Integer> {
    Optional<Order> findByOrderID(int orderID);
    List<Order> findAll();
    List<Order> findByUserID(int userID);
}
