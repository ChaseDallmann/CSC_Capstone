
'use client'

import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import NavbarBasic from '../NavbarBasic/NavbarBasic';
import { AuthContext } from '../../../utils/auth-context';
import axios from 'axios';
import Cookies from 'js-cookie';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { redirect } from 'next/navigation';

export default function OrderDetails() {
  const router = useRouter();
  const { orderID } = router.query;
  const { isAuthenticated, user } = useContext(AuthContext);
  const [orderDetails, setOrderDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userOrders, setUserOrders] = useState(null);
  const [orderDate, setOrderDate] = useState(null);
  const [productsMap, setProductsMap] = useState({});

  useEffect(() => {
    if (!isAuthenticated) {
      redirect('/');
      return;
    }

    // Fetch all products to create a map for product details
    const fetchProductsMap = async () => {
      try {
        const token = Cookies.get('authToken');
        
        // Ensure API URL has https:// prefix
        let apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
        if (apiUrl && !apiUrl.startsWith('http')) {
          apiUrl = 'https://' + apiUrl;
        }
        
        console.log('Fetching products from:', `${apiUrl}/products`);
        const response = await axios.get(
          `${apiUrl}/products`, {
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          withCredentials: true
        });
        
        // Create a map of product ID to product details
        const productsData = {};
        response.data.forEach(product => {
          productsData[product.productID] = product;
        });
        
        setProductsMap(productsData);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    const showUserOrders = async () => {
      try {
        const token = Cookies.get('authToken');
        
        // Ensure API URL has https:// prefix
        let apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
        if (apiUrl && !apiUrl.startsWith('http')) {
          apiUrl = 'https://' + apiUrl;
        }
        
        console.log('Fetching user orders from:', `${apiUrl}/orders/${user?.id}`);
        const response = await axios.get(
          `${apiUrl}/orders/${user?.id}`, {
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          withCredentials: true
        });
        
        setUserOrders(response.data);
        
        // Find the current order in the response data
        const currentOrder = response.data.find(order => order.orderID.toString() === orderID);
        
        if (currentOrder && currentOrder.orderDate) {
          const d = new Date();
          d.setTime(currentOrder.orderDate);
          const dateValue = JSON.stringify(d);
          const formattedDate = dateValue.slice(1, 11);
          const formattedTime = dateValue.slice(12, 20);
          const formattedDateTime = `${formattedDate} ${formattedTime}`;
          setOrderDate(formattedDateTime);
        }
      } catch (error) {
        console.error('Failed to fetch user orders:', error);
      }
    };

    // Fetch order details
    const fetchOrderDetails = async () => {
      try {
        setIsLoading(true);
        const token = Cookies.get('authToken');
        
        // Ensure API URL has https:// prefix
        let apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
        if (apiUrl && !apiUrl.startsWith('http')) {
          apiUrl = 'https://' + apiUrl;
        }
        
        console.log('Fetching order details from:', `${apiUrl}/order-details/${user?.id}/${orderID}`);
        const response = await axios.get(
          `${apiUrl}/order-details/${user?.id}/${orderID}`, {
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          withCredentials: true
        });
        setOrderDetails(response.data);
      } catch (error) {
        console.error('Failed to fetch order details:', error);
        setError('Failed to load order details. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    if (orderID && user?.id) {
      fetchProductsMap();
      fetchOrderDetails();
      showUserOrders();
    }
  }, [isAuthenticated, orderID, user?.id, router]);

  // Find the current order in userOrders
  const currentOrder = userOrders?.find(order => order.orderID.toString() === orderID);

  return (
    <>
      <NavbarBasic />
      <div className="order-details-container">
        <div className="order-details-dheader">
          <h1 id="order-deatails-header">Order Details - #{orderID}</h1>
        </div>
        
        {isLoading ? (
          <div className="loading-indicator">Loading order details...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : (
          <div className="order-details-content">
            {orderDetails.length > 0 && currentOrder ? (
              <>
                <div className="order-summary">
                  <h2>Order Summary</h2>
                  <p>Order ID: {currentOrder.orderID}</p>
                  <p>Date: {orderDate || 'N/A'}</p>
                  <p>Status: {currentOrder.status || 'Processing'}</p>
                </div>
                
                <div className="order-items">
                  <h2>Ordered Items</h2>
                  <table className="items-table">
                    <thead>
                      <tr>
                        <th>Product ID</th>
                        <th>Product Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orderDetails.map((item, index) => {
                        const product = productsMap[item.productID] || {};
                        return (
                          <tr key={index}>
                            <td>{item.productID}</td>
                            <td>{product.productName || 'Product name not available'}</td>
                            <td>{item.qty}</td>
                            <td>${item.price ? item.price.toFixed(2) : '0.00'}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                
                <div className="order-total">
                  <h3>Total Amount: ${currentOrder.totalAmount ? currentOrder.totalAmount.toFixed(2) : '0.00'}</h3>
                </div>
              </>
            ) : (
              <p>No details found for this order.</p>
            )}
          </div>
        )}
      </div>
    </>
  );
}