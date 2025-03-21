"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { loggedInStatus, user, authenticatedUser, userRole, setUserRole, handleLogout } = React.useContext(AuthContext);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    
    // Check if userRole is null but user exists and has a role
    if (!userRole && user && user.role) {
      setUserRole(user.role);
    }
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [user, userRole, setUserRole]);

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
        {loggedInStatus === "LOGGED_IN" && authenticatedUser === true ? (
          <>
            <Link href="/Orders">My Orders</Link>
            <Link href="/Cart">Cart</Link>
            <button onClick={handleLogout} className="logout-btn">
              Log out
            </button>
            {user?.role === "CUSTOMER_SERVICE" && <Link href="/customerService/User">Find User</Link>}
            <Link id="user-profile" href="/Dashboard" className="user-profile">Welcome, {user?.name || "User"}</Link>
          </>
        ) : (
          <>
            <Link href="/Login">Login</Link>
            <Link href="/Registration">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}