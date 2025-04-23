"use client";

import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import NavbarBasic from "../components/NavbarBasic/NavbarBasic";
import Link from "next/link";
import { AuthContext } from "../Context/AuthContext";
import { Eye, EyeOff } from "lucide-react";

const LoginPage = () => {
  const router = useRouter();
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ loginErrors, setLoginErrors ] = useState("");
  const { handleLogin, isAuthenticated, handleSavedLogin } = useContext(AuthContext);
  const [ isView, setIsView ] = useState(false);
  const [ rememberMe, setRememberMe ] = useState(false);

  //Redirecting the user to the dashboard if they are already logged in
  useEffect(() => {
      if (isAuthenticated) {
        router.push('/Dashboard');
      }
  }, [isAuthenticated, router]);

  const handleCheckboxChange = (event) => {
    setRememberMe(event.target.checked);
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

    if (rememberMe) {
      localStorage.setItem("token", {})
    }

    try {
      const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080';
      const response = await axios.post(
        `${apiUrl}/auth/login`,
        {
          email: email,
          password: password,
        },
        { withCredentials: true }
      );

      if (response.status === 200 && response.data) {
        localStorage.removeItem("guestCart");
        handleLogin(response.data.user);
        if (rememberMe) {
          localStorage.setItem("token", response.data.token)
          handleSavedLogin(response.data.user, response.data.token);
        }
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
            <div className="password-container">
              <label htmlFor="password">Password</label>
              <div className="password-wrapper">
                <input
                  type={isView ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div className="icon-container" onClick={() => setIsView(!isView)}>
                  {isView ? <EyeOff size={20} /> : <Eye size={20} />}
                </div>
              </div>
            </div>
            <div className="remember-me">
              <label>
                <input type="checkbox" checked= {rememberMe} onChange={handleCheckboxChange} /> Remember me
              </label>
            </div>
            <button type="submit">Login</button>

            <br />
            <div className="text-center">
              <Link href="/Registration">Don't have an account? Sign up</Link>
              <br />
              <Link href="/ForgotPassword">Forgot password?</Link>
            </div>
            {loginErrors && <p className="error-message">{loginErrors}</p>}
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;