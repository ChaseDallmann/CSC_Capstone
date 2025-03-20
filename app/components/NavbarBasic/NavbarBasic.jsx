"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import styles from '../NavbarBasic/NavbarBasic.module.css';
import { AuthContext } from "../../context/AuthContext";

export default function NavbarBasic() {
  const [scrolled, setScrolled] = useState(false);
  const { loggedInStatus, user, userRole, handleLogout } = React.useContext(AuthContext);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`${styles.navbarBasic} ${scrolled ? styles.scrolled : ""}`}>
      <img
        src="/tea-logo2.png"
        alt="Tea Logo"
        className={`${styles.logoImg} ${scrolled ? styles.fadeIn : styles.hidden}`}
      />
      {/* Navigation links */}
      <div className={styles.navLinks}>
        <Link href="/" className={styles.navLink}>Home</Link>
        <Link href="/Product" className={styles.navLink}>Product</Link>
        
        {loggedInStatus === "LOGGED_IN" ? (
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