'use client'

import React from "react";
import styles from "./about.module.css";
import NavbarBasic from "../components/NavbarBasic/NavbarBasic";

export default function About() {
  return (
    <>
    <NavbarBasic />
    <div className={styles.aboutContainer}>
      <div className={styles.aboutHeader}>
        <h1>About Ace Teas</h1>
        <p>Learn more about us and our journey in bringing the best teas to you.</p>
      </div>

      <div className={styles.aboutContent}>
        <div className={styles.aboutSection}>
          <h2>Our Story</h2>
          <p>
            Ace Teas was founded with a simple mission: to provide premium, high-quality teas that offer a moment of peace and relaxation. We source our ingredients from around the world, ensuring the finest flavors and blends.
          </p>
        </div>
        
        <div className={styles.aboutSection}>
          <h2>Our Values</h2>
          <p>
            We believe in sustainability, quality, and community. Every tea we offer is ethically sourced, with a focus on environmental responsibility and supporting local farmers.
          </p>
        </div>
      </div>
    </div>
    </>
  );
}
