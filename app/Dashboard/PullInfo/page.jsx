'use client'

import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
import React, { useEffect, useState, useContext } from 'react';
import NavbarBasic from "../../components/NavbarBasic/NavbarBasic";
import { redirect, useRouter } from 'next/navigation';
import { getClientSession } from "../../Context/Session";
import Cookies from 'js-cookie';

const AccountInfo = () => {
    const [accountInfo, setAccountInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { isAuthenticated, user, handleLogout } = useContext(AuthContext);
    const router = useRouter();

    const fetchAccountInfo = async () => {
        try {
            // Retrieve the token directly from cookies
            const token = Cookies.get('authToken');
            
            console.log('Fetching user info with detailed diagnostics:', {
                userId: user?.id,
                tokenPresent: !!token,
                tokenLength: token?.length,
                tokenFirstChars: token?.substring(0, 10),
                tokenLastChars: token?.slice(-10)
            });

            const response = await axios.get(`http://localhost:8080/user/${user.id}`, {
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            
            console.log('Fetch Response:', response.data);
            setAccountInfo(response.data);
            setIsLoading(false);
        } catch (error) {
            console.error('Detailed Fetch Error:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status,
                headers: error.response?.headers,
                requestHeaders: error.config?.headers
            });

            // More specific error handling
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status === 401) {
                    console.warn('Unauthorized: Token might be invalid or expired');
                    handleLogout(); // Use the logout method from context
                } else if (error.response.status === 403) {
                    console.warn('Forbidden: Insufficient permissions');
                }
            } else if (error.request) {
                // The request was made but no response was received
                console.warn('No response received from server');
            } else {
                // Something happened in setting up the request that triggered an Error
                console.warn('Error setting up the request', error.message);
            }

            setError(error.message || "Failed to fetch account information");
            setIsLoading(false);
        }
    };

    useEffect(() => {
        // Only fetch if authenticated and user exists
        if (isAuthenticated && user) {
            fetchAccountInfo();
        } else {
            console.warn('Not authenticated or no user object');
            setIsLoading(false);
            router.push('/Login');
        }
    }, [isAuthenticated, user]);

    // Rest of the component remains the same...
    
    return (
        <>
        <NavbarBasic />
        <div className="info-container">
            {accountInfo ? (
                <div>
                    <h1>Account Information</h1>
                    <p>Name: {accountInfo.name}</p>
                    <p>Email: {accountInfo.email}</p>
                    <p>Role: {accountInfo.role}</p>
                </div>
            ) : (
                <p>No account information available</p>
            )}
        </div>
        </>
    );
};

export default AccountInfo;