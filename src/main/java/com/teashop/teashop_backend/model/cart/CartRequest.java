package com.teashop.teashop_backend.model.cart;

public class CartRequest {
    private int userID;
    private int productID;
    private int quantity;

    
    public int getUserID() {
        return userID;
    }

    public void setUserID(int userId) {
        this.userID = userId;
    }

    public int getProductID() {
        return productID;
    }

    public void setProductID(int productId) {
        this.productID = productId;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}