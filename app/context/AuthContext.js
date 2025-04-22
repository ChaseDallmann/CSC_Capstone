'use client';

import React, { useState, useEffect, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { 
  createClientSession, 
  getClientSession, 
  deleteClientSession,
  updateClientSession 
} from "../Context/Session";

export const AuthContext = React.createContext({
  user: null,
  isAuthenticated: false,
  userRole: null,
  handleLogin: () => {},
  handleLogout: () => {},
});

export function AuthProvider({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);


  // Handling a user Logout
  const handleLogout = useCallback(() => {
    deleteClientSession();
    if (localStorage.getItem("token")) {
      localStorage.removeItem("token");
    }
    setUser(null);
    setUserRole(null);
    setIsAuthenticated(false);
  }, []);

  // Check authentication on mount and route changes
  const checkAuthStatus = useCallback(() => {
    const session = getClientSession();
    if (session || localStorage.getItem("token")) {
      try {
        const decoded = jwtDecode(session.token);

        // Check token expiration
        if (decoded.exp * 1000 < Date.now()) {
          handleLogout();
          return;
        }

        setUser(session.user);
        setUserRole(session.user.role);
        setIsAuthenticated(true);
        updateClientSession();
      } catch (error) {
        handleLogout();
      }
    }
  }, [handleLogout]);

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  // Handling a user login that is not saved
  const handleLogin = (userData) => {
    setUser(userData);
    setUserRole(userData.role);
    setIsAuthenticated(true);
  };

  // Handling a user Login that is saved
  const handleSavedLogin = (userData, token) => {
    createClientSession(userData, token);
    setUser(userData);
    setUserRole(userData.role);
    setIsAuthenticated(true);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      userRole,
      handleLogin,
      handleSavedLogin,
      handleLogout 
    }}>
      {children}
    </AuthContext.Provider>
  );
}
