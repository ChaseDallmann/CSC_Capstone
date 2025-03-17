'use client';

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Create context
export const AuthContext = React.createContext();

// Export the provider component
export function AuthProvider({ children }) {
    const router = useRouter();
    const [loggedInStatus, setLoggedInStatus] = useState("NOT_LOGGED_IN");
    const [user, setUser] = useState(null);
    
    useEffect(() => {
        checkLoginStatus();
    }, []);
    
    const checkLoginStatus = () => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem("authToken");
            const storedUser = localStorage.getItem("user");
        
            if (token && storedUser) {
                setLoggedInStatus("LOGGED_IN");
                setUser(JSON.parse(storedUser));
            } else {
                setLoggedInStatus("NOT_LOGGED_IN");
                setUser(null);
            }
        }
    };
    
    const handleLogin = (userData, token) => {
        localStorage.setItem("authToken", token);
        localStorage.setItem("user", JSON.stringify(userData));
        setLoggedInStatus("LOGGED_IN");
        setUser(userData);
        router.push("/");
    };
    
    const handleLogout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        setLoggedInStatus("NOT_LOGGED_IN");
        setUser(null);
        router.push("/login");
    };
    
    return (
        <AuthContext.Provider value={{ loggedInStatus, user, handleLogin, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
}