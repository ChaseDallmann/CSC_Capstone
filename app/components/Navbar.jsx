"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

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
        <Link href="/Login">Login</Link>
        <Link href="/Register">Register</Link>
      </div>
    </nav>
  );
}