package com.teashop.teashop_backend.model.product;

import com.teashop.teashop_backend.model.category.Category;
import com.teashop.teashop_backend.model.manufacturer.Manufacturer;

import jakarta.persistence.*;

@Entity
@Table(name = "product")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "productID")
    private int productID;

    @Column(name = "productName", nullable = false)
    private String productName;

    @Column(name = "productDescription")
    private String productDescription;

    @Column(name = "price", nullable = false)
    private float price;

    @Column(name = "productInventory", nullable = false)
    private int productInventory;

    @ManyToOne
    @JoinColumn(name = "categoryID", nullable = false)
    private Category category;

    @ManyToOne
    @JoinColumn(name = "manufacturerID", nullable = false)
    private Manufacturer manufacturer;

    public Product() {
    }

    public Product(String productName, String productDescription, float price, int productInventory, Category category, Manufacturer manufacturer) {
        this.productName = productName;
        this.productDescription = productDescription;
        this.price = price;
        this.productInventory = productInventory;
        this.category = category;
        this.manufacturer = manufacturer;
    }

    public int getProductID() {
        return productID;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getProductDescription() {
        return productDescription;
    }

    public void setProductDescription(String productDescription) {
        this.productDescription = productDescription;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    public int getProductInventory() {
        return productInventory;
    }

    public void setProductInventory(int productInventory) {
        this.productInventory = productInventory;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Manufacturer getManufacturer() {
        return manufacturer;
    }

    public void setManufacturer(Manufacturer manufacturer) {
        this.manufacturer = manufacturer;
    }

    @Override
    public String toString() {
        return "Product{" +
                "productID=" + productID +
                ", productName='" + productName + '\'' +
                ", productDescription='" + productDescription + '\'' +
                ", price=" + price +
                ", productInventory=" + productInventory +
                ", category=" + (category != null ? category.getCategoryName() : "N/A") +
                ", manufacturer=";
    }
}
