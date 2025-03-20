'use client';

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthContext, AuthProvider } from "@/app/context/AuthContext";
import NavbarBasic from "@/app/components/NavbarBasic/NavbarBasic";
import Link from "next/link";
import axios from "axios";


export default function findUser() {
    const router = useRouter();
    const { loggedInStatus, user, userRole, handleLogout } = React.useContext(AuthContext);
    const [search, setSearch] = useState("");
    const [userList, setUserList] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        AuthContext.call(checkLoginStatus);
        localStorage.getItem(userRole);
        if (loggedInStatus !== "LOGGED_IN" && userRole !== "CUSTOMER_SERVICE") {
            router.push("/Login");
        }
    }, []);

    const handleSearch = async () => {
        try {
            const res = await axios.get(`/api/users?search=${search}`);
            setUserList(res.data);
        } catch (error) {
            setError(error.response.data.message);
        }
    };

    return (
        <>
            <NavbarBasic />
            <div className="find-user-container">
                <h1>Find User</h1>
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by email or name"
                />
                <button onClick={handleSearch}>Search</button>
                {error && <p className="error-message">{error}</p>}
                <div className="user-list">
                    {userList.map((user) => (
                        <div key={user._id} className="user-card">
                            <h2>{user.name}</h2>
                            <p>Email: {user.email}</p>
                            <p>Role: {user.role}</p>
                            <Link href={`/customer_service/User/${user._id}`}>
                                <button className="view-user-btn">View User</button>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}