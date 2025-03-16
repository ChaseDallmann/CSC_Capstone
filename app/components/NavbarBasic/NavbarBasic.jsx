'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '../../context/AuthProvider';

const NavbarBasic = () => {
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    // Optionally redirect to home or login page
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link href="/">TeaShop</Link>
      </div>
      <div className="navbar-links">
        <Link href="/">Home</Link>
        <Link href="/products">Products</Link>
        
        {isAuthenticated ? (
          <>
            <Link href="/profile">
              Welcome, {user?.firstName || 'User'}
            </Link>
            <Link href="/orders">My Orders</Link>
            <button onClick={handleLogout} className="logout-btn">
              Log out
            </button>
          </>
        ) : (
          <>
            <Link href="/Login">Login</Link>
            <Link href="/Registration">Register</Link>
          </>
        )}
        <Link href="/cart">Cart</Link>
      </div>
    </nav>
  );
};

export default NavbarBasic;