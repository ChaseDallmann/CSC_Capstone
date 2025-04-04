'use client';

import React, { useState, useEffect } from "react";
import { useRouter, usePathname, redirect } from "next/navigation";
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
  }, []);

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

        //Setting the user values from the session cookie
        setUser(session.user);
        setUserRole(session.user.role);
        setIsAuthenticated(true);
        updateClientSession();
      } catch (error) {
        handleLogout();
      }
    }
  };

  //Handling a user Login
  const handleLogin = (userData, token) => {
    createClientSession(userData, token);
    setUser(userData);
    setUserRole(userData.role);
    setIsAuthenticated(true);
    router.push("/");
  };

  //Handling a user Logout
  const handleLogout = () => {
    deleteClientSession();
    setUser(null);
    setUserRole(null);
    setIsAuthenticated(false);
  };

  //Returning the context to be used throughout react
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