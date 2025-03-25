"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AuthContext } from "../Context/AuthContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated, user, userRole, handleLogout } = React.useContext(AuthContext);

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
            <Link href="/Orders">My Orders</Link>
            <Link href="/Cart">Cart</Link>
            <button onClick={handleLogout} className="logout-btn">
              Log out
            </button>
            {userRole === "CUSTOMER_SERVICE" && <Link href="/customerService/User">Find User</Link>}
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