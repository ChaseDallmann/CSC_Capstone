"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import styles from '../NavbarBasic/NavbarBasic.module.css';
import { AuthContext } from "../../Context/AuthContext";

export default function NavbarBasic() {
  const [scrolled, setScrolled] = useState(false);
  const { loggedInStatus, isAuthenticated, user, userRole, handleLogout } = React.useContext(AuthContext);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, 
[]);

  return (
    <nav className={`${styles.navbarBasic} ${scrolled ? styles.scrolled : ""}`}>
      <img
        src="/tea-logo2.png"
        alt="Tea Logo"
        className={`${styles.logoImg} ${scrolled ? styles.fadeIn : styles.hidden}`}
      />

      <div className={styles.navContainer}>
        <div className={`${styles.navLeft} ${styles.navLinks}`}>
          <Link href="/" className={styles.navLink}>Home</Link>
          <Link href="/Product" className={styles.navLink}>Product</Link>
          <Link href="/Cart" className={styles.navLink}>Cart</Link>
          <Link href="/Chat">Chat</Link>

          {isAuthenticated && (
            <>
              <Link href="/Orders" className={styles.navLink}>My Orders</Link>
              {userRole === "CUSTOMER_SERVICE" && (
                <Link href="/customerService/User" className={styles.navLink}>Find User</Link>
              )}
            </>
          )}

          {!isAuthenticated && (
            <>
              <Link href="/Login" className={styles.navLink}>Login</Link>
              <Link href="/Registration" className={styles.navLink}>Register</Link>
            </>
          )}
        </div>

        {isAuthenticated && (
          <div className={`${styles.navRight} ${styles.navLinks}`}>
            <Link id="user-profile" href="/Dashboard" className={`${styles.navLink} user-profile`}>
              Welcome, {user?.name || "User"}
            </Link>
            <a onClick={handleLogout} className={styles.navLink} role="button">
              Log out
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}