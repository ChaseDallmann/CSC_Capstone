import Image from "next/image";
import React from "react";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";

type DisplayCardProps = {
  productID: number;
  title: string;
  imageSrc: string;
  price: string;
  description: string;
  manufacturer: string;
  stock: number;
};

export default function DisplayCard({ productID, title, imageSrc, price, description, manufacturer, stock }: DisplayCardProps) {
  const { user } = React.useContext(AuthContext);

  const handleAddToCart = async () => {
    console.log("User from context:", user); //debugging
    const cartItem = {
      productID,
      title,
      price,
      quantity: 1
    };

    if (user) {
      // if user is logged in, send cart data to the backend
      try {
        console.log("Attempting to add to cart:", { //debugging
          userId: user.id,
          productId: productID,
          quantity: 1
        });        
        await axios.post("http://localhost:8080/cart/add", {
          userId: user.id,
          productId: productID,
          quantity: 1
        });
        alert("Item added to cart!");
      } catch (error) {
        console.log("Error adding to cart:", error.response?.data || error.message);
        alert("Failed to add item to cart.");
      }
    } else {
      // User is not logged in, save cart data in localStorage  
      const existingCart = JSON.parse(localStorage.getItem("guestCart") || "[]");
      const updatedCart = [...existingCart, cartItem];
      localStorage.setItem("guestCart", JSON.stringify(updatedCart));

      alert("Item added to cart (Guest)");
    }
  };

  return (
    <div className="display-card">
      {imageSrc ? (
        <Image src={imageSrc} alt={title} width={200} height={200} className="product-image" />
      ) : (
        <p>No image available</p>
      )}
      <h3 className="product-title">{title}</h3>
      <p className="product-description">{description}</p>
      <p className="product-manufacturer">{manufacturer}</p>
      <p className="product-price"> ${price}</p>
      <p className="product-stock">Quantity On Hand:{currentStock}</p>
      <button 
        className="product-button"
        onClick={addToCart}
        disabled={currentStock <= 0}
      >
        {currentStock > 0 ? "Add to cart" : "Out of stock"}
      </button>
    </div>
  );
}
