'use client';

import React, { useState, useEffect } from "react";
import { redirect, useRouter, usePathname } from "next/navigation";
import { createSession, deleteSession } from '../context/Session';
import { create } from "domain";

// Create context
export const AuthContext = React.createContext();

// Export the provider component
export function AuthProvider({ children }) {
    const router = useRouter();
    const pathname = usePathname();
    const [loggedInStatus, setLoggedInStatus] = useState("NOT_LOGGED_IN");
    const [user, setUser] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [authenticatedUser, setAuthenticatedUser] = useState(false);
    
    // Check login status on mount and route change
    useEffect(() => {
        checkLoginStatus();
    }, [pathname]); // Re-run when the path changes
    
    const checkLoginStatus = () => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem("authToken");
            const storedUser = localStorage.getItem("user");
            const storedRole = localStorage.getItem("userRole");
        
            if (token && storedUser) {
                const parsedUser = JSON.parse(storedUser);
                setLoggedInStatus("LOGGED_IN");
                setUser(parsedUser);
                setAuthenticatedUser(true);
                
                // Ensure userRole is also set from localStorage or from the user object
                if (storedRole) {
                    try {
                        setUserRole(JSON.parse(storedRole));
                    } catch (e) {
                        // If parsing fails, use as is
                        setUserRole(storedRole);
                    }
                } else if (parsedUser.role) {
                    setUserRole(parsedUser.role);
                }
            } else {
                setLoggedInStatus("NOT_LOGGED_IN");
                setUser(null);
                setUserRole(null);
                setAuthenticatedUser(false);
            }
        }
    };
    
    const handleLogin = (userData, token) => {
        localStorage.setItem("authToken", token);
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("userRole", userData.role);
        setAuthenticatedUser(true);
        setLoggedInStatus("LOGGED_IN");
        setUserRole(userData.role);
        setUser(userData);
        router.push("/");
    };
    
    const handleLogout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        localStorage.removeItem("userRole");
        setAuthenticatedUser(false);
        setLoggedInStatus("NOT_LOGGED_IN");
        setUser(null);
        setUserRole(null);
        router.push("/Login");
    };
    
    return (
        <AuthContext.Provider value={{ 
            loggedInStatus, 
            user, 
            userRole,
            authenticatedUser, 
            setUserRole,
            handleLogin, 
            handleLogout 
        }}>
            {children}
        </AuthContext.Provider>
    );
}