'use client';

import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import Link from "next/link";
import NavbarBasic from "../components/NavbarBasic/NavbarBasic";

const Cart = () => {
  const { user } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      if (user) {
        // Fetch cart from backend if logged in
        try {
          const response = await axios.get(`http://localhost:8080/cart/${user.id}`);
          setCartItems(response.data);
        } catch (error) {
          console.error("Error fetching cart:", error);
        }
      } else {
        // Load guest cart from localStorage
        const guestCart = JSON.parse(localStorage.getItem("guestCart") || "[]");
        setCartItems(guestCart);
      }
      setLoading(false);
    };

    fetchCart();
  }, [user]);

  // delete item from cart
  const removeItem = (productID) => {
    if (user) {
      axios.delete(`http://localhost:8080/cart/remove/${user.id}/${productID}`)
        .then(() => {
          setCartItems(cartItems.filter(item => item.productID !== productID));
        })
        .catch(error => console.error("Error removing item:", error));
    } else {
      const updatedCart = cartItems.filter(item => item.productID !== productID);
      setCartItems(updatedCart);
      localStorage.setItem("guestCart", JSON.stringify(updatedCart));
    }
  };

  // Calculate total price
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

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

//get authicated user working -- adjust stock number when added to cart -- fix css -- fix delete function