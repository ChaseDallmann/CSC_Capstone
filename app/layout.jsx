"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./Context/AuthContext";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <title>Ace Teas</title>
        <link rel="icon" href="/tea-icon.ico" type="image/x-icon" />
      </head>
      <body>
        <AuthProvider>
          <main>{children}</main>
          <footer className="site-footer">
            <div className="footer-content">
              <p>&copy; {new Date().getFullYear()} Ace Teas. All rights reserved.</p>
              <div className="footer-links">
                <Link href="/About">About</Link>
                <Link href="/Contact">Contact</Link>
                <Link href="/PrivacyPolicy">Privacy Policy</Link>
              </div>
            </div>
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}