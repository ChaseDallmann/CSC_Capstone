'use client'

import { useState, useEffect } from "react";
import Navbar from "../components/NavbarBasic/NavbarBasic";
import DisplayCard from "../components/DisplayCard";
import axios from "axios";
import Logo from "../../public/tea-logo.png";

const ProductPage = () => {
    const [scrolled, setScrolled] = useState(false);
    const [products, setProducts] = useState([]);

    useEffect(() => {
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
        <div>
            <div className="relative">
                <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
                    <Navbar />
                </nav>

                {/* Main Content */}
                <div className="products">
                    <h1 className="text-2xl font-bold">Our Products</h1>
                    <div className="grid grid-cols-3 gap-4 p-4">
                        {products.length > 0 ? (
                            products.map((product, index) => (
                                <DisplayCard 
                                    key={product.productID} // Unique key to avoid React warnings
                                    title={product.productName}
                                    description={product.productDescription}
                                    manufacturer={product.manufacturer.manufacturerName}
                                    price={product.price} // Ensure `DisplayCard` supports price
                                />
                            ))
                        ) : (
                            <p>Loading products...</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
