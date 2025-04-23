'use client'

import React, { useContext, useEffect, useState } from 'react';
import { redirect, useRouter } from 'next/router';
import NavbarBasic from '../components/NavbarBasic/NavbarBasic';
import Link from 'next/link';
import { AuthContext } from '../Context/AuthContext';
import { fetchAccountInfo } from '../components/FetchAccountInfo/FetchAccountInfo';
import axios from 'axios';
import Cookies from 'js-cookie';

export default function Orders() {
    const { isAuthenticated, user, userRole, handleLogout } = useContext(AuthContext);
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [userOrders, setUserOrders] = useState([]);
    const router = useRouter();

    const loadUserData = async () => {
        try {
            setIsLoading(true);
            if (user?.id) {
                const data = await fetchAccountInfo(user.id);
                setUserData(data);
            }
        } catch (error) {
            console.error('Failed to fetch user data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const showUserOrders = async () => {
        try {
            const token = Cookies.get('authToken');
            const response = await axios.get(
                `http://localhost:8080/orders/${user?.id}`, {
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            setUserOrders(response.data);
        } catch (error) {
            console.error('Failed to fetch user orders:', error);
        }
    };

    useEffect(() => {
        if (!isAuthenticated) {
            redirect('/');
        } else if (user?.id) {
            loadUserData();
            showUserOrders();
        }
    }, [isAuthenticated, user?.id]);

    // Handle view order details
    const handleViewOrderDetails = (orderID) => {
        router.push(`/Dashboard/OrderDetails/${orderID}`);
    };

    

    return (
        <>
            <NavbarBasic />
            <div className="orders-container">
                <h1>Your Orders</h1>
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <ul>
                        {userOrders.map((order) => (
                            <li key={order.orderID} className="order-item">
                                <p>Order ID: {order.orderID}</p>
                                <p>Status: {order.status}</p>
                                <p>Total Amount: ${order.totalAmount.toFixed(2)}</p>
                                <button 
                                    className="view-order-btn"
                                    onClick={() => handleViewOrderDetails(order.orderID)}
                                    style={{ marginTop: '10px', padding: '10px', backgroundColor: '#EAD0A5', color: 'white', border: 'none', borderRadius: '5px' }}>
                                    View Order Details
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    );
}