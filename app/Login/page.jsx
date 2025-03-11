"use client"; // Make this a client component

import { useState } from "react";
import { useRouter } from "next/navigation"; // Use next/navigation instead of next/router
import Link from "next/link";
import Navbar from "../components/Navbar";
import Storefront from "../components/Storefront";

export default function Login() {
  const [scrolled, setScrolled] = useState(false);
  const [showBackground, setShowBackground] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    //Calling the login endpoint
    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include", // Important for cookies
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(data.customer));
        router.push("/"); // Redirect after login
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

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
    
      {/* Add the login form here */}
      {/* This is the login form */}
      <div className="max-w-md mx-auto mt-8 px-4 py-8 bg-white shadow-lg rounded-md">
        <h2 className="text-2xl font-semibold text-center">
            Sign in to your account
          </h2>

          {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">{error}</div>}

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="sr-only">Email address</label>
              <input
                type="email"
                required
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="sr-only">Password</label>
              <input
                type="password"
                required
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className=""
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>

            <div className="text-center">
              <Link href="/register" className="text-indigo-600 hover:text-indigo-800">
                Don't have an account? Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
