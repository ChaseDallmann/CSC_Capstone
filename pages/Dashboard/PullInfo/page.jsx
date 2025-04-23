'use client'

import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
import React, { useEffect, useState, useContext } from 'react';
import NavbarBasic from "../../components/NavbarBasic/NavbarBasic";
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { fetchAccountInfo } from "../../components/FetchAccountInfo/FetchAccountInfo";

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
            router.push('/Login');
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