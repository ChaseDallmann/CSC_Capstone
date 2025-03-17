"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import NavbarBasic from "../components/NavbarBasic/NavbarBasic";

const App = ({ children }) => {
  const router = useRouter();
  const [loggedInStatus, setLoggedInStatus] = useState("NOT_LOGGED_IN");
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = () => {
    const token = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      setLoggedInStatus("LOGGED_IN");
      setUser(JSON.parse(storedUser));
    } else {
      setLoggedInStatus("NOT_LOGGED_IN");
      setUser(null);
    }
  };

  const handleLogin = (userData, token) => {
    localStorage.setItem("authToken", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setLoggedInStatus("LOGGED_IN");
    setUser(userData);
    router.push("/"); // Redirect to home after login
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setLoggedInStatus("NOT_LOGGED_IN");
    setUser(null);
    router.push("/login"); // Redirect to login after logout
  };

  return (
    <>
      <Navbar loggedInStatus={loggedInStatus} user={user} handleLogout={handleLogout} />
      <NavbarBasic loggedInStatus={loggedInStatus} user={user} handleLogout={handleLogout} />
    </>
  );
};

export default App;
