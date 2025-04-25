'use client'

import { useState, useEffect } from "react";
import React from "react";
import NavbarBasic from "../components/NavbarBasic/NavbarBasic";
import DisplayCard from "../components/DisplayCard";
import axios from "axios";
import { AuthContext } from "../../utils/auth-context";

const categoryMap = {
    1: "Black Tea",
    2: "Green Tea",
    3: "White Tea",
    4: "Oolong Tea",
    5: "Herbal Tea",
    6: "Pu-erh Tea"
};

const ProductPage = () => {
    const { loggedInStatus, authenticatedUser, user, userRole, handleLogout } = React.useContext(AuthContext);
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All"); // Defaults to "All"

    const getProducts = async () => {
        try {
            const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080';
            const response = await axios.get(`${apiUrl}/products`);
            if (response.status === 200) {
                console.log("API Response:", response.data); // Debugging
                setProducts(response.data);
            }
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    // Filtering logic 
    const filteredProducts = selectedCategory === "All"
        ? products
        : products.filter(product => {
            const categoryID = product.category?.categoryID;
            const categoryName = categoryMap[categoryID];
            console.log(`Checking: Product ${product.productName} (Category ID: ${categoryID}) -> ${categoryName}`);
            return categoryName === selectedCategory;
        });

    return (
        <>
            <NavbarBasic />
            <div>
                <div className="product-container">
                    <div className="product-box">
                        <h1 className="productpage-title">
                            {selectedCategory === "All" ? "All Teas" : `${selectedCategory}`}
                        </h1>

                        {/* Dropdown for filtering */}
                        <div className="filter-dropdown">
                            <label>Sort by Tea Type: </label>
                            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                                <option value="All">All</option>
                                {Object.values(categoryMap).map((category, index) => (
                                    <option key={index} value={category}>{category}</option>
                                ))}
                            </select>
                        </div>

                        <div className="product-cards">
                            {filteredProducts.length > 0 ? (
                                filteredProducts.map((product) => (
                                    <DisplayCard 
                                        key={product.productID}
                                        imageSrc={product.imageURL}
                                        productID={product.productID}
                                        title={product.productName}
                                        description={product.productDescription}
                                        manufacturer={product.manufacturer?.manufacturerName || "Unknown"}
                                        stock={product.productInventory}
                                        price={product.price}
                                    />
                                ))
                            ) : (
                                <p>No products available for this category.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductPage;