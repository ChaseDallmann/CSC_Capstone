package com.teashop.teashop_backend.model.cart;

import lombok.Data;

@Data
public class CartUpdateRequest {
    private int cartId;
    private int quantity;
}