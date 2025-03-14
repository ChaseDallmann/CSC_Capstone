'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import NavbarBasic from '../components/NavbarBasic/NavbarBasic';
import { useUser } from '../context/UserContext';
import Link from 'next/link';

export default function Dashboard() {
  const { user, loading } = useUser();
  const router = useRouter();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push('/Login');
    }
  }, [user, loading, router]);

  // Show loading state while checking authentication
  if (loading) {
    return <div>Loading...</div>;
  }

  // Don't render the page content if user is not authenticated
  if (!user) {
    return null;
  }

  return (
    <>
      <NavbarBasic />
      <div className="dashboard-container">
        <h1>Welcome to Your Dashboard, {user.firstName || user.email?.split('@')[0] || 'User'}</h1>
        
        <div className="dashboard-content">
          <div className="dashboard-card">
            <h2>My Account</h2>
            <p>Email: {user.email}</p>
            {user.firstName && <p>Name: {user.firstName} {user.lastName}</p>}
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

      <style jsx>{`
        .dashboard-container {
          max-width: 1200px;
          margin: 120px auto 40px;
          padding: 0 20px;
        }
        
        h1 {
          margin-bottom: 40px;
          color: #2c3e50;
        }
        
        .dashboard-content {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
        }
        
        .dashboard-card {
          background: white;
          border-radius: 8px;
          padding: 20px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        
        .dashboard-card h2 {
          color: #2c3e50;
          margin-bottom: 15px;
        }
        
        button {
          background-color: #4b6584;
          color: white;
          border: none;
          padding: 10px 15px;
          border-radius: 4px;
          cursor: pointer;
          margin-top: 15px;
          transition: background-color 0.3s;
        }
        
        button:hover {
          background-color: #3d5166;
        }
      `}</style>
    </>
  );
}