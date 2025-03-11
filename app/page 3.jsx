"use client";

import React from 'react'
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Storefront from "./components/Storefront";

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [showBackground, setShowBackground] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 300);
      setShowBackground(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative">
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <Navbar />
      </nav>

      {/* Hero Section */}
      <div className="hero">
        <div className={`overlay ${scrolled ? "blur" : ""}`}></div>
        <div className={`logo ${scrolled ? "shrink" : ""}`}>
          <img src="/tea-logo2.png" alt="Tea Logo" className="logo-img" />
        </div>
      </div>

      {/* Main Content */}
      <div className={`background ${showBackground ? "show" : ""}`}>
        <Storefront />
        <Storefront />
      </div>
    </div>
  );
}