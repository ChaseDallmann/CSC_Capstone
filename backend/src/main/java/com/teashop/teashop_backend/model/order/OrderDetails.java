package com.teashop.teashop_backend.model.order;

import jakarta.persistence.*;

@Entity
@Table(name = "orderDetails")
public class OrderDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "orderDetailID")
    private int orderDetailID;

    @Column(name = "orderID", nullable = false)
    private int orderID;

    @Column(name = "productID", nullable = false)
    private int productID;

    @Column(name = "qty", nullable = false)
    private int qty;

    @Column(name = "orderPrice", nullable = true)
    private float orderPrice;

    public OrderDetails() {
    }

    public OrderDetails(int orderID, int productID, int qty, float price) {
        this.orderID = orderID;
        this.productID = productID;
        this.qty = qty;
        this.orderPrice = price;
    }

    public int getOrderDetailID() {
        return orderDetailID;
    }

    public void setOrderDetailID(int orderDetailID) {
        this.orderDetailID = orderDetailID;
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

    public int getQty() {
        return qty;
    }

    public void setQty(int qty) {
        this.qty = qty;
    }

    public float getPrice() {
        return orderPrice;
    }

    public void setPrice(float price) {
        this.orderPrice = price;
    }

    @Override
    public String toString() {
        return "OrderDetails{" +
                "orderDetailID=" + orderDetailID +
                ", orderID=" + orderID +
                ", productID=" + productID +
                ", qty=" + qty +
                ", price=" + orderPrice +
                '}';
    }
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof OrderDetails)) return false;

        OrderDetails that = (OrderDetails) o;

        if (orderDetailID != that.orderDetailID) return false;
        if (orderID != that.orderID) return false;
        if (productID != that.productID) return false;
        if (qty != that.qty) return false;
        return Float.compare(that.orderPrice, orderPrice) == 0;
    }
    @Override
    public int hashCode() {
        int result = orderDetailID;
        result = 31 * result + orderID;
        result = 31 * result + productID;
        result = 31 * result + qty;
        result = 31 * result + (orderPrice != +0.0f ? Float.floatToIntBits(orderPrice) : 0);
        return result;
    }
}
