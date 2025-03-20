'use client';

import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import NavbarBasic from '../components/NavbarBasic/NavbarBasic';
import Link from 'next/link';
import { AuthContext, AuthProvider } from '../context/AuthContext';

export default function Dashboard() {
  const router = useRouter();
  const { loggedInStatus, user, userRole, handleLogout } = React.useContext(AuthContext);

  useEffect(() => {
    localStorage.getItem(userRole);
    if (loggedInStatus !== "LOGGED_IN" && userRole !== "CUSTOMER_SERVICE") {
        router.push("/Login");
    }
}, []);

  return (
    <>
      <NavbarBasic />
      <div className="dashboard-container">
        <h1>Welcome to Your Dashboard, {user?.name || "User"}</h1>
        
        <div className="dashboard-content">
          <div className="dashboard-card">
            <h2>My Account</h2>
            <p>Email: {user?.email}</p>
            {user?.name && <p>Name: {user.name}</p>}
            <button className="edit-profile-btn">Edit Profile</button>
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