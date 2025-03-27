'use client'

import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
import React, { useEffect, useState, useContext } from 'react';
import NavbarBasic from "../../components/NavbarBasic/NavbarBasic";
import { redirect, useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export const fetchAccountInfo = async (userId) => {
    const token = Cookies.get('authToken');

    try {
        const response = await axios.get(`http://localhost:8080/user/${userId}`, {
            headers: { 
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });
        
        return response.data;
    } catch (error) {
        console.error('Failed to fetch account info:', error);
        throw error;
    }
};

const AccountInfo = () => {
    const [accountInfo, setAccountInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { isAuthenticated, user, handleLogout } = useContext(AuthContext);
    const router = useRouter();

    const loadAccountInfo = async () => {
        try {
            if (user?.id) {
                const data = await fetchAccountInfo(user.id);
                setAccountInfo(data);
                setIsLoading(false);
            }
        } catch (error) {
            console.error('Failed to fetch account info:', error);
            setError(error);
            setIsLoading(false);
            // Optionally redirect to login or show error
            router.push('/Login');
        }
    };

    useEffect(() => {
        // Only fetch if authenticated and user exists
        if (isAuthenticated && user) {
            loadAccountInfo();
        } else {
            setIsLoading(false);
            redirect('/Login');
        }
    }, [isAuthenticated, user]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading account information</div>;
    }
    
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