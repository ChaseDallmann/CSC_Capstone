'use client';

import React, { useState } from "react";
import axios from "axios";
import { Great_Vibes } from 'next/font/google';
import Router, { useRouter } from "next/navigation";
import NavbarBasic from '../components/NavbarBasic/NavbarBasic';
import Link from "next/link";

const greatVibes = Great_Vibes({
  subsets: ['latin'],
  weight: '400',
});

const LoginPage = () => {

  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginErrors, setLoginErrors] = useState('');

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const response = await axios.post(
        "http://localhost:8080/auth/login",
        {
          email: email,
          password: password,
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
        router.push("/");
      }
    } catch (error) {
      setLoginErrors('Invalid credentials');
      console.log("login error", error);
    }
  };

  return (
    <>
      <NavbarBasic />
      <div className="login-container">
        <div className="login-box">
          <h1 style={{ fontFamily: greatVibes.style.fontFamily }}>Welcome Back!</h1>
          <h2>We've put the kettle on for you!</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit">Login</button>
            
            <br />
            <div className="text-center">
              <Link href="/Registration" className="text-indigo-600 hover:text-indigo-800">
                Don't have an account? Sign up
              </Link>
            </div>
          </form>

          {loginErrors && <p className="error">{loginErrors}</p>}
        </div>

        <img src="/placeholder.png" className="kettle-ani" />
      </div>
    </>
  );
};

export default LoginPage;
