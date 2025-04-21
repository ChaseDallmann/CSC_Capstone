package com.teashop.teashop_backend.model.order;

public class Order {
    int orderID;
    int productID;
    int customerID;
    int quantity;
    float total;

    @Column(name = "userID", nullable = false)
    private int userID;

    @Column(name = "orderDate", nullable = false)
    private Date orderDate;

    @Column(name = "totalAmount", nullable = false)
    private double totalAmount;

    @Column(name = "status", nullable = true)
    private String status;

    public Order() {
    }

    public Order(int userID, Date orderDate, float totalAmount, String status) {
        this.userID = userID;
        this.orderDate = orderDate;
        this.totalAmount = totalAmount;
        this.status = status;
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

    public double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(double totalAmount) {
        this.totalAmount = totalAmount;
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
