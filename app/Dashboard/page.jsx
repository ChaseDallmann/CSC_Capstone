'use client';

import React, { useContext, useEffect, useState } from 'react';
import { redirect, useRouter } from 'next/navigation';
import NavbarBasic from '../components/NavbarBasic/NavbarBasic';
import Link from 'next/link';
import { AuthContext } from '../Context/AuthContext';
import { fetchAccountInfo } from '../Dashboard/PullInfo/page';
import axios from 'axios';
import Cookies from 'js-cookie';

export default function Dashboard() {
  const { isAuthenticated, user, userRole, handleLogout } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userOrders, setUserOrders] = useState([]);
  const router = useRouter();

  // Function to load user data
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
    // If not authenticated, redirect to login
    if (!isAuthenticated) {
      redirect('/');
    } else if (user?.id) {
      // Fetch account info when component mounts or when user changes
      loadUserData();
      showUserOrders();
    }
  }, [isAuthenticated, user?.id]);

  // Create a refresh button handler
  const handleRefresh = () => {
    loadUserData();
    showUserOrders();
  };

  return (
    <>
      <NavbarBasic />
      <div className="dashboard-container">
        <div className="dashboard-header-container">
          <h1 id="dashboard-header">Welcome to Your Dashboard, {userData?.name || user?.name || "User"}</h1>
          <button 
            onClick={handleRefresh} 
            className="refresh-btn"
            style={{ 
              background: 'transparent', 
              border: 'none',
              cursor: 'pointer',
              fontSize: '14px',
              color: '#666',
              textDecoration: 'underline',
              marginLeft: '10px'
            }}
          >
            Refresh
          </button>
        </div>
        
        {isLoading ? (
          <div className="loading-indicator">Loading your information...</div>
        ) : (
          <div className="dashboard-content">
            <div className="dashboard-card">
              <h2>My Account</h2>
              <p>Email: {userData?.email || user?.email}</p>
              <p>Name: {userData?.name || user?.name}</p>
              {userData?.streetAddress && <p>Address: {userData.streetAddress}</p>}
              {userData?.city && <p>City: {userData.city}</p>}
              {userData?.zipCode > 0 && <p>Zip Code: {userData.zipCode}</p>}
              <button onClick={() => router.push("/Dashboard/ChangeInfo")} className="edit-profile-btn">
                Edit Profile
              </button>
            </div>
            
            <div className="dashboard-card">
              <h2>My Orders</h2>
              <div className='order-list-container'>
                <div className='order-list'>
                  {userOrders.length > 0 ? (
                    userOrders.map((order) => (
                      <div key={order.orderID} className="order-item">
                        <Link href={`/Dashboard/OrderDetails/${order.orderID}`}>
                          <p>Order ID: {order.orderID}</p>
                        </Link>
                        <p>Status: {order.status}</p>
                      </div>
                    ))
                  ) : (
                    <p>No orders found.</p>
                  )}
                </div>
              </div>
              <br />
              <Link href="/Product">
                <button className="shop-now-btn">Shop Now</button>
              </Link>
            </div>

            <div className="dashboard-card">
              <h2>Tea Preferences</h2>
              <p>Set your tea preferences to get personalized recommendations.</p>
              <button className="preferences-btn">Set Preferences</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}