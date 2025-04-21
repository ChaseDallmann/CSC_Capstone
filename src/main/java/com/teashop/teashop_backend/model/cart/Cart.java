package com.teashop.teashop_backend.model.cart;

import com.teashop.teashop_backend.model.product.Product;
import com.teashop.teashop_backend.model.user.User;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.NonNull;

@Entity
@Table(name = "cart")
public class Cart {

    @Column(name = "cartID", unique = true, nullable = false)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int cartID;

    @NonNull
    @ManyToOne
    @JoinColumn(name = "userID", nullable = false)
    private User user;

    @NonNull
    @ManyToOne
    @JoinColumn(name = "productID", nullable = false)
    private Product product;

    @Column(name = "quantity", nullable = false)
    private int quantity;

    public int getCartID() {
        return cartID;
    }
    public void setCartID(int cartID) {
        this.cartID = cartID;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    @Override
    public String toString() {
        return "Cart [cartID=" + cartID + ", user=" + user + ", product=" + product + ", quantity=" + quantity + "]";
    }

    public Cart(int cartID, User user, Product product, int quantity) {
        this.cartID = cartID;
        this.user = user;
        this.product = product;
        this.quantity = quantity;
    }

    public Cart() {
        // Default constructor
    }
    public Cart(User user, Product product, int quantity) {
        this.user = user;
        this.product = product;
        this.quantity = quantity;
    }
    public Cart(User user, Product product) {
        this.user = user;
        this.product = product;
    }
    public Cart(Product product) {
        this.product = product;
    }
    public Cart(User user) {
        this.user = user;
    }
    public Cart(int cartID) {
        this.cartID = cartID;
    }
    public Cart(int cartID, User user) {
        this.cartID = cartID;
        this.user = user;
    }
    public Cart(int cartID, Product product) {
        this.cartID = cartID;
        this.product = product;
    }
    public Cart(int cartID, User user, Product product) {
        this.cartID = cartID;
        this.user = user;
        this.product = product;
    }
}
