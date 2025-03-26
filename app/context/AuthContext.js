'use client';

import React, { useState, useEffect } from "react";
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

  // Check authentication on mount and route changes
  useEffect(() => {
    checkAuthStatus();
  }, [pathname]);

  const checkAuthStatus = () => {
    const session = getClientSession();
    if (session) {
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

        // Optionally update session to reset expiration
        updateClientSession();
      } catch (error) {
        handleLogout();
      }
    }
  };

  const handleLogin = (userData, token) => {
    createClientSession(userData, token);
    setUser(userData);
    setUserRole(userData.role);
    setIsAuthenticated(true);
    router.push("/");
  };

  const handleLogout = () => {
    deleteClientSession();
    setUser(null);
    setUserRole(null);
    setIsAuthenticated(false);
    router.push("/Login");
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      userRole,
      handleLogin, 
      handleLogout 
    }}>
      {children}
    </AuthContext.Provider>
  );
}