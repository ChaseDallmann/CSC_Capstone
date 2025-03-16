"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "../context/AuthProvider";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <img
        src="/tea-logo2.png"
        alt="Tea Logo"
        className={`nav-logo ${scrolled ? "fade-in" : "hidden"}`}
      />
      {/* Navigation links */}
      <div className="nav-links">
        <Link href="/">Home</Link>
        <Link href="/Product">Product</Link>
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
        <Link href="/Dashboard">Dashboard</Link>
      </div>
    </nav>
  );
}