"use client";

import React from 'react';
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Storefront from "./components/Storefront";
import Hero from "./components/Hero";
import MissionCard from "./components/MissionCard/MissionCard";
import { AuthContext, AuthProvider } from './context/AuthContext';
import Router, { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [showBackground, setShowBackground] = useState(false);
  const { loggedInStatus, user, userRole, handleLogout } = React.useContext(AuthContext);

  useEffect(() => {
    { userRole === "CUSTOMER_SERVICE" &&
      router.refresh;
    }
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
        <div className="logo-container">
          <img
            src="/tea-logo2.png"
            alt="Website logo"
            className="main.logo"
          ></img>
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
      </div>
    </div>
  );
}