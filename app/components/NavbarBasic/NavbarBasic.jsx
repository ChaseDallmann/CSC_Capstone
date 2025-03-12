"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import styles from './NavbarBasic.module.css';

export default function NavbarBasic() {
  const [scrolled, setScrolled] = useState(false);

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
        className={`${styles.logoImg} ${scrolled ? styles.fadeIn : ""}`}
      />
      {/* Navigation links */}
      <div className={styles.navLinks}>
        <Link href="/" className={styles.navLink}>Home</Link>
        <Link href="/Product" className={styles.navLink}>Product</Link>
        <Link href="/Login" className={styles.navLink}>Login</Link>
        <Link href="/Registration" className={styles.navLink}>Registration</Link>
      </div>
    </nav>
  );
}