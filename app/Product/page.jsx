//https://letsreact.org/how-to-fetch-data-from-json-files-in-react-and-display-it-in-a-component/

'use client'

import { useState, useEffect } from "react";
import React from "react";
import Navbar from "../components/Navbar";
import DisplayCard from "../components/DisplayCard";
import axios from "axios";
import Logo from "../../public/tea-logo.png";
import NavbarBasic from "../components/NavbarBasic/NavbarBasic";
import Hero from "../components/Hero";
import { AuthContext, AuthProvider } from "../context/AuthContext";

const ProductPage = () => {
    const { loggedInStatus, authenticatedUser, user, userRole, handleLogout } = React.useContext(AuthContext);
    const [scrolled, setScrolled] = useState(false);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        localStorage.getItem(userRole);
        const handleScroll = () => {
            setScrolled(window.scrollY > 0);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const getProducts = async () => {
        try {
            const response = await axios.get("http://localhost:8080/products");
            if (response.status === 200) {
                setProducts(response.data);
            }
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    useEffect(() => {
        getProducts();
    }, []); 

    return (
        <>
        <NavbarBasic />
        <div>
                {/* Main Content */}
                <div className="product-container">
                    <div className="product-box">
                        <h1 className="product-title">Our Products</h1>
                        <div className="product-cards">
                            {products.length > 0 ? (
                                products.map((product, index) => (
                                    <DisplayCard 
                                        key={product.productID}
                                        title={product.productName}
                                        description={product.productDescription}
                                        manufacturer={product.manufacturer.manufacturerName}
                                        stock={product.productInventory}
                                        price={product.price}
                                    />
                                )
                            )
                            ) : (
                                <p>Loading products...</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
    </>
    );
};

export default ProductPage;
