"use client";

import React from 'react'
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Storefront from "./components/Storefront";
import Hero from "./components/Hero";
import MissionCard from "./components/MissionCard/MissionCard";
import Logo from "./components/Logo/Logo";
import FarmerCard from "./components/FarmerCard/FarmerCard";

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
        <div>
          <Logo />
        </div>
        <div>
          <MissionCard
          title="Our Mission"
          text="We aim to bring the joy of tea to every home. Indulge with thoughfully curated blends, prizewinning teas, and handmade teaware."
          imageSrc="/teastuff.jpg"
          imageAlt="A cup of tea being brewed"
       />
      </div>
        <Storefront />
        <Storefront />
      </div>
    </div>
  );
}