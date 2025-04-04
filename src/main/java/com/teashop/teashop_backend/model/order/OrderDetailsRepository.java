package com.teashop.teashop_backend.model.order;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.Date;
import java.util.List;

@Repository
public interface OrderDetailsRepository extends JpaRepository<OrderDetails, Integer> {
    Optional<OrderDetails> findByOrderDetailID(int orderDetailID);
    List<OrderDetails> findAll();
    List<OrderDetails> findByOrderID(int orderID);
    List<OrderDetails> findByProductID(int productID);
    List<OrderDetails> findByOrderIDAndProductID(int orderID, int productID);
}
