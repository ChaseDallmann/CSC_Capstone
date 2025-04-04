"use client";

import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { redirect, useRouter } from "next/navigation";
import NavbarBasic from "../components/NavbarBasic/NavbarBasic";
import Link from "next/link";
import { AuthContext } from "../Context/AuthContext";

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginErrors, setLoginErrors] = useState("");
  const { handleLogin, isAuthenticated } = useContext(AuthContext);

  //Redirecting the user to the dashboard if they are already logged in
  useEffect(() => {
      if (isAuthenticated) {
        redirect('/Dashboard')
      }
  });

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

      if (response.status === 200 && response.data) {
        handleLogin(response.data.user, response.data.token);
        router.push("/");
      }
    } catch (error) {
      setLoginErrors("Invalid credentials");
      console.log("Login error", error);
    }
  };

  return (
    <>
      <NavbarBasic />
      <div className="login-container">
        <div className="login-box">
          <h1>Welcome Back!</h1>
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
              <Link href="/Registration">Don't have an account? Sign up</Link>
              <br />
              <Link href="/Login/ForgotPassword">Forgot password?</Link>
            </div>
          </form>
          {loginErrors && <p className="error">{loginErrors}</p>}
        </div>
      </div>
    </>
  );
};

export default LoginPage;