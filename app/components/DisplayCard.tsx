import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";
import Cookies from "js-cookie";


type DisplayCardProps = {
  title: string;
  imageSrc?: string; // Make imageSrc optional
  price: string | number;
  description: string;
  link?: string;
  manufacturer: string;
  stock: number;
  productID: number;
};

export default function DisplayCard({ 
  title, 
  imageSrc, 
  price, 
  description, 
  manufacturer, 
  stock,
  productID
}: DisplayCardProps) {
  const { user } = useContext(AuthContext);
  const token = Cookies.get("authToken");
  const defaultImageUrl = "/smithTea.png";

  const addToCart = () => {
    // Create item object for cart
    const numericPrice = typeof price === 'string' 
      ? parseFloat(price.replace(/[$,]/g, '')) 
      : price;
      
    const item = {
      productID: productID,
      title: title,
      price: numericPrice,
      quantity: 1,
      stock: stock
    };

    if (user) {
      // Authenticated user - add to database cart
      axios.post(`http://localhost:8080/cart/add`, {
        userID: user.id,
        productID: productID,
        quantity: 1
      }, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        withCredentials: true
      })
      .then(response => {
        console.log("Item added to server cart:", response.data);
        alert("Item added to cart");
      })
      .catch(error => {
        console.error("Error adding to cart:", error);
        
        // Fallback to localStorage for authenticated users if server fails
        const userCart = JSON.parse(localStorage.getItem(`userCart_${user.id}`) || "[]");
        
        const existingItemIndex = userCart.findIndex(
          (cartItem: any) => cartItem.productID === productID
        );
        
        if (existingItemIndex >= 0) {
          userCart[existingItemIndex].quantity += 1;
        } else {
          userCart.push(item);
        }
        
        localStorage.setItem(`userCart_${user.id}`, JSON.stringify(userCart));
        alert("Item added to local cart (server unavailable)");
      });
    } else {
      // Guest user - add to localStorage
      const guestCart = JSON.parse(localStorage.getItem("guestCart") || "[]");
      
      // Check if item already exists in cart
      const existingItemIndex = guestCart.findIndex(
        (cartItem: any) => cartItem.productID === productID
      );
      
      if (existingItemIndex >= 0) {
        // Update quantity if item exists
        guestCart[existingItemIndex].quantity += 1;
      } else {
        // Add new item if it doesn't exist
        guestCart.push(item);
      }
      
      localStorage.setItem("guestCart", JSON.stringify(guestCart));
      console.log("Item added to guest cart:", item);
      alert("Item added to cart");
    }
  };

  return (
    <div className="display-card">
      <div className="image-container" style={{ width: 200, height: 200, position: 'relative' }}>
        <Image 
          src={imageSrc || defaultImageUrl} 
          alt={title} 
          fill
          style={{ objectFit: 'cover' }}
          onError={(e) => {
            // Fallback to default image if external image fails
            (e.target as HTMLImageElement).src = defaultImageUrl;
          }}
        />
      </div>
      <h3 className="product-title">{title}</h3>
      <p className="product-description">Description: {description}</p>
      <p className="product-manufacturer">{manufacturer}</p>
      <p className="product-price">Price: {price}</p>
      <p className="product-stock">Stock: {stock}</p>
      <button 
        className="product-button"
        onClick={addToCart}
        disabled={stock <= 0}
      >
        {stock > 0 ? "Add to cart" : "Out of stock"}
      </button>
    </div>
  );
}