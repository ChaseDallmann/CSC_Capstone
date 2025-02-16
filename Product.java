package com.teashop.teashop_backend;


import jakarta.persistence.*;

@Entity
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int productID;
    
    private String productDescription;
    private float price;
    private int productInventory;
    private int categoryID;
    private int manufacturerID;

    public Product(int productID, String productDescription, float price, int productInventory, int categoryID, int manufacturerID) {
        this.productID = productID;
        this.productDescription = productDescription;
        this.price = price;
        this.productInventory = productInventory;
        this.categoryID = categoryID;
        this.manufacturerID = manufacturerID;
    }

    public int getProductID() {
        return productID;
    }

    public void setProductID(int productID) {
        this.productID = productID;
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
    public int getCategoryID() {
        return categoryID;
    }

    public void setCategoryID(int categoryID) {
        this.categoryID = categoryID;
    }

    public int getManufacturerID() {
        return manufacturerID;
    }

    public void setManufacturerID(int manufacturerID) {
        this.manufacturerID = manufacturerID;
    }

    @Override
    public String toString() {
        return "product{" +
                "productID=" + productID +
                ", productDescription='" + productDescription + '\'' +
                ", price=" + price +
                ", productInventory=" + productInventory +
                ", categoryID=" + categoryID +
                ", manufacturerID=" + manufacturerID +
                '}';
    }

    public static void main(String[] args) {
        // Remove Object<Product> and just use Product
        Product product = new Product(1, "Green Tea is a type of tea that is made from Camellia sinensis leaves and buds that have not undergone the same withering and oxidation process used to make oolong teas and black teas.", 5.99f, 100, 1, 1);
        System.out.println(product);
    }
}
