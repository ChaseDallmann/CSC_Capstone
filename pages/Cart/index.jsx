'use client';

import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../utils/auth-context";
import Link from "next/link";
import NavbarBasic from "../components/NavbarBasic/NavbarBasic";
import Cookies from "js-cookie";

const Cart = () => {
  const { user, isAuthenticated } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = Cookies.get('authToken');

  useEffect(() => {
    const fetchCart = async () => {
      if (isAuthenticated) {
        // Fetch cart from backend if logged in
        try {
          const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080';
          const response = await axios.get(`${apiUrl}/cart/${user?.id}`, {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            },
            withCredentials: true
          });
          
          if (response.data && Array.isArray(response.data)) {
            // Transform backend data to match the expected format if needed
            const formattedItems = response.data.map(item => ({
              cartID: item.cartID,
              productID: item.product?.productID || item.productId || 0,
              title: item.product?.productName || item.title || "Unknown Product",
              price: item.product?.price || item.price || 0,
              quantity: item.quantity || 1,
              stock: item.product?.productInventory || item.stock || 0
            }));
            setCartItems(formattedItems);
          } else {
            console.error("Invalid cart data format:", response.data);
            
            // Try local fallback for authenticated users
            const userCart = JSON.parse(localStorage.getItem(`userCart_${user.id}`) || "[]");
            if (userCart && userCart.length > 0) {
              setCartItems(userCart);
              console.log("Using local cart data for authenticated user");
            }
          }
        } catch (error) {
          console.error("Error fetching cart:", error);
          
          // Try local fallback for authenticated users
          const userCart = JSON.parse(localStorage.getItem(`userCart_${user.id}`) || "[]");
          if (userCart && userCart.length > 0) {
            setCartItems(userCart);
            console.log("Using local cart data for authenticated user");
          }
        }
      } else {
        // Load guest cart from localStorage
        const guestCart = JSON.parse(localStorage.getItem("guestCart") || "[]");
        setCartItems(guestCart);
        console.log("Loaded guest cart from localStorage:", guestCart);
      }
      setLoading(false);
    };

    fetchCart();
  }, [user, token]);

  // delete item from cart
  const removeItem = async (productID) => {
    if (user) {
      // Find the cart item with the correct ID to get its cartId for deletion
      const cartItem = cartItems.find(item => item.productID === productID);
      const cartID = cartItem?.cartID;
      
      if (cartID) {
        try {
          // If we have a cartID, delete from server
          const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080';
          await axios.delete(`${apiUrl}/cart/remove/${cartID}`, {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            },
            withCredentials: true
          });
          
          // Remove from local state
          setCartItems(cartItems.filter(item => item.productID !== productID));
        } catch (error) {
          console.error("Error removing item:", error);
          
          // Fallback to local storage if server fails
          const userCart = JSON.parse(localStorage.getItem(`userCart_${user.id}`) || "[]");
          const updatedUserCart = userCart.filter(item => item.productID !== productID);
          localStorage.setItem(`userCart_${user.id}`, JSON.stringify(updatedUserCart));
          
          // Update UI
          setCartItems(cartItems.filter(item => item.productID !== productID));
        }
      } else {
        // If no cartId, just update local storage and UI
        const userCart = JSON.parse(localStorage.getItem(`userCart_${user.id}`) || "[]");
        const updatedUserCart = userCart.filter(item => item.productID !== productID);
        localStorage.setItem(`userCart_${user.id}`, JSON.stringify(updatedUserCart));
        
        // Update UI
        setCartItems(cartItems.filter(item => item.productID !== productID));
      }
    } else {
      // Guest user - update localStorage
      const updatedCart = cartItems.filter(item => item.productID !== productID);
      setCartItems(updatedCart);
      localStorage.setItem("guestCart", JSON.stringify(updatedCart));
    }
  };

  // Calculate total price
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  //If the cart has 0 items return cart is empty, otherwise show the items price and quantity
  return (
    <>
    <NavbarBasic />
    <div className="cart-container">
      <h1>Your Cart</h1>
      {loading ? (
        <p>Loading...</p>
      ) : cartItems.length > 0 ? (
        <>
          {cartItems.map((item) => (
            <div key={item.productID} className="cart-item">
              <p>{item.title} - ${item.price} x {item.quantity}</p>
              <button onClick={() => removeItem(item.productID)}>Remove</button>
            </div>
          ))}
          <h2>Total: ${totalPrice.toFixed(2)}</h2>
          <Link href={`/Checkout?total=${totalPrice.toFixed(2)}`}>
            <button className="checkout-button">Proceed to Checkout</button>
          </Link>
        </>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
    </>
  );
};

export default Cart;