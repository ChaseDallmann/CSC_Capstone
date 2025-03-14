package com.teashop.teashop_backend.model.order;

public class Order {
    int orderID;
    int productID;
    int customerID;
    int quantity;
    float total;

    public Order(int orderID, int productID, int customerID, int quantity, float total) {
        this.orderID = orderID;
        this.productID = productID;
        this.customerID = customerID;
        this.quantity = quantity;
        this.total = total;
    }

    public int getOrderID() {
        return orderID;
    }

    public void setOrderID(int orderID) {
        this.orderID = orderID;
    }

    public int getProductID() {
        return productID;
    }

    public void setProductID(int productID) {
        this.productID = productID;
    }

    public int getCustomerID() {
        return customerID;
    }

    public void setCustomerID(int customerID) {
        this.customerID = customerID;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public float getTotal() {
        return total;
    }

    public void setTotal(float total) {
        this.total = total;
    }

    @Override
    public String toString() {
        return "order{" +
                "orderID=" + orderID +
                ", productID=" + productID +
                ", customerID=" + customerID +
                ", quantity=" + quantity +
                ", total=" + total +
                '}';
    }
}
