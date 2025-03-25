'use client'

import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
import React, { useEffect, useState, useContext } from 'react';
import NavbarBasic from "../../components/NavbarBasic/NavbarBasic";

const AccountInfo = () => {
    const [accountInfo, setAccountInfo] = useState([]);
    const { loggedInStatus, authenticatedUser, user, userRole, handleLogout } = useContext(AuthContext);

        const fetchAccountInfo = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8080/user/${user.id}`,
                    {
                        withCredentials: true
                    });
                
                console.log(response.data);
                setAccountInfo(response.data);
            } catch (error) {
                console.log("Invalid user info", error);
            }
        };

        useEffect(() => {
        fetchAccountInfo();
        }, []);

    return (
        <>
        <NavbarBasic />
        <div>
            {/* Main Content */}
            <div className ="info-container">
                ac
            </div>
        </div>
        </>
    );
};

export default AccountInfo;