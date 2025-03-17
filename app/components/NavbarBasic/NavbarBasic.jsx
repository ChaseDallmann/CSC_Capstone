"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import styles from './NavbarBasic.module.css';
import { AuthContext } from "../../context/AuthContext";

export default function NavbarBasic() {
  const [scrolled, setScrolled] = useState(false);
  const { loggedInStatus, user, handleLogout } = React.useContext(AuthContext);

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
            <Link href="/Profile" className={styles.navLink}>Welcome, {user?.firstName || "User"}</Link>
            <Link href="/Orders" className={styles.navLink}>My Orders</Link>
            <Link href="/Cart" className={styles.navLink}>Cart</Link>
            <button onClick={handleLogout} className={styles.logoutBtn}>
              Log out
            </button>
          </>
        ) : (
          <>
            <Link href="/Login" className={styles.navLink}>Login</Link>
            <Link href="/Registration" className={styles.navLink}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}