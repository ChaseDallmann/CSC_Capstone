'use client';

import React from 'react';

export default function Hero({ scrolled }) {
  return (
    <div className="hero">
      <div className={`overlay ${scrolled ? "blur" : ""}`}></div>
      <div className={`logo ${scrolled ? "shrink" : ""}`}>
        <img src="/tea-logo2.png" alt="Tea Logo" className="logo-img" />
      </div>
    </div>
  );
}
