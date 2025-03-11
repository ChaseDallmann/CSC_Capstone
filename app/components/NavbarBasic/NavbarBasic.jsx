"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import styles from './NavbarBasic.module.css';


export default function loginStatus() {

}

export default function NavbarBasic({ loggedIn, user}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

    return (
      <nav className={styles.navbarBasic}>
          <img src="/tea-logo2.png" alt="Tea Logo" className={styles.logoImg} />

          <div className={styles.navLinks}>
              <Link href="/" className={styles.navLink}>Home</Link>
              <Link href="/product" className={styles.navLink}>Product</Link>

              {loggedIn ? (
                  <span className={styles.navUser}>
                      Welcome, {user?.name || "User"} | <button onClick={logout}>Logout</button>
                  </span>
              ) : (
                  <Link href="/login" className={styles.navLink}>Login</Link>
              )}
          </div>
      </nav>
    );
  }

  const logout = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("user");
  window.location.href = "/login"; // Redirect after logout
  };
