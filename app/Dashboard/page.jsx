'use client';

import React, { useContext, useEffect, useState } from 'react';
import { redirect, useRouter } from 'next/navigation';
import NavbarBasic from '../components/NavbarBasic/NavbarBasic';
import Link from 'next/link';
import { AuthContext } from '../Context/AuthContext';
import { fetchAccountInfo } from '../Dashboard/PullInfo/page'; // adjust import path as needed

export default function Dashboard() {
  const { isAuthenticated, user, userRole, handleLogout } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // If not authenticated, redirect to login
    if (!isAuthenticated) {
      redirect('/');
      return;
    }

    // Fetch account info when component mounts
    const loadUserData = async () => {
      try {
        if (user?.id) {
          const data = await fetchAccountInfo(user.id);
          setUserData(data);
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    loadUserData();
  }, [isAuthenticated, user]);

  // If not authenticated, don't render anything
  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <NavbarBasic />
      <div className="dashboard-container">
        <h1>Welcome to Your Dashboard, {user?.name || "User"}</h1>
        
        <div className="dashboard-content">
          <div className="dashboard-card">
            <h2>My Account</h2>
            <p>Email: {userData?.email}</p>
            {user?.name && <p>Name: {user.name}</p>}
            <button onClick={() => router.push("/Dashboard/ChangeInfo")} className="edit-profile-btn">
              Edit Profile
            </button>
          </div>
          
          <div className="dashboard-card">
            <h2>My Orders</h2>
            <p>You have no orders yet.</p>
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
      </div>
    </>
  );
}