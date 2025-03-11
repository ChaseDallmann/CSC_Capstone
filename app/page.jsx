"use client";

import React from 'react'
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Storefront from "./components/Storefront";
import Hero from "./components/Hero";

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
      <Hero scrolled={scrolled} />

      {/* Main Content */}
      <div className={`background ${showBackground ? "show" : ""}`}>
        <Storefront />
        <Storefront />
        <Storefront />
        <Storefront />
      </div>
    </div>
  );
}