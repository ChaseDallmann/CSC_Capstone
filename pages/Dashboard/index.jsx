
import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import NavbarBasic from '../components/NavbarBasic/NavbarBasic';
import Link from 'next/link';
import { AuthContext } from '../../utils/auth-context';
import { fetchAccountInfo } from '../../utils/fetch-account-info';
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
        console.log('Fetching user data for ID:', user.id);
        const data = await fetchAccountInfo(user.id);
        console.log('Received user data:', data);
        setUserData(data);
      } else {
        console.log('No user ID available');
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
      if (!token) {
        console.error('No auth token available');
        return;
      }
      
      if (!user?.id) {
        console.error('No user ID available');
        return;
      }
      
      // Ensure API URL has https:// prefix
      let apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
      if (apiUrl && !apiUrl.startsWith('http')) {
        apiUrl = 'https://' + apiUrl;
      }
      console.log('Fetching orders from:', `${apiUrl}/orders/${user.id}`);
      
      const response = await axios.get(
        `${apiUrl}/orders/${user.id}`, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      
      console.log('Received orders data:', response.data);
      setUserOrders(response.data);
    } catch (error) {
      console.error('Failed to fetch user orders:', error);
      console.error('Error details:', error.response?.data || error.message);
    }
  };

  useEffect(() => {
    // If not authenticated, redirect to login
    if (!isAuthenticated) {
      router.push('/Login');
    } else if (user?.id) {
      // Fetch account info when component mounts or when user changes
      loadUserData();
      showUserOrders();
    }
  }, [isAuthenticated, user?.id, router]);
  
  // Debug logging
  useEffect(() => {
    console.log('Auth state:', { isAuthenticated, userData, userOrders, user });
    console.log('API URL:', process.env.NEXT_PUBLIC_API_URL);
  }, [isAuthenticated, userData, userOrders, user]);

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