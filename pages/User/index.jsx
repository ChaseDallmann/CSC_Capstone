'use client';

import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "../Context/AuthContext";
import NavbarBasic from "../components/NavbarBasic/NavbarBasic";
import axios from "axios";
import Cookies from 'js-cookie';

export default function CustomerServiceSearch() {
    const { isAuthenticated, userRole } = useContext(AuthContext);
    const [searchType, setSearchType] = useState('id'); // 'id' or 'email'
    const [searchTerm, setSearchTerm] = useState("");
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // Validate user role and authentication
    useEffect(() => {
        if (!isAuthenticated) {
            window.location.href = '/Login';
        }
        // Optional: Restrict to specific roles if needed
        if (userRole !== 'CUSTOMER_SERVICE') {
            window.location.href = '/Dashboard';
        }
    }, [isAuthenticated, userRole]);

    const emailSearch = async () => {
        try {
            const token = Cookies.get('authToken');
            const response = await axios.get(
                `http://localhost:8080/user/find-by-email/${searchTerm}`, {
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            setUserData(response.data);
        } catch (error) {
            console.error('Search failed:', error);
            setError(error.response?.data?.message || 'User not found');
        }
    }

    const handleSearch = async (element) => {
        element.preventDefault();
        
        // Reset previous search
        setUserData(null);
        setError(null);

        // Validate input
        if (!searchTerm.trim()) {
            setError("Please enter a search term");
            return;
        }

        setIsLoading(true);

        // Perform search based on type
        if (searchType === 'email') {
            await emailSearch(searchTerm);
            return;
        }
        // If searchType is 'id', proceed with the ID search

        try {
            // Get authentication token
            const token = Cookies.get('authToken');

            // Determine search endpoint based on search type
            const searchEndpoint = `http://localhost:8080/user/${searchTerm}`

            // Make API call
            const response = await axios.get(searchEndpoint, {
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });

            setUserData(response.data);
        } catch (error) {
            console.error('Search failed:', error);
            setError(error.response?.data?.message || 'User not found');
        } finally {
            setIsLoading(false);
        }
    };

    const renderUserDetails = () => {
        if (!userData) return null;

        return (
            <div className="dashboard-card mt-6">
                <h2 className="text-xl font-bold mb-4 border-b pb-2">User Details</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="font-semibold">Name:</p>
                        <p>{userData.name || 'N/A'}</p>
                    </div>
                    <div>
                        <p className="font-semibold">Email:</p>
                        <p>{userData.email || 'N/A'}</p>
                    </div>
                    <div>
                        <p className="font-semibold">User ID:</p>
                        <p>{userData.id || 'N/A'}</p>
                    </div>
                    <div>
                        <p className="font-semibold">Role:</p>
                        <p>{userData.role || 'N/A'}</p>
                    </div>
                    {userData.streetAddress && (
                        <div className="col-span-2">
                            <p className="font-semibold">Address:</p>
                            <p>{userData.streetAddress + ", " + userData.city + ", " + userData.state + ', ' + userData.zipCode}</p>
                        </div>
                    )}
                </div>

                {userData.orders && (
                    <div className="mt-6">
                        <h3 className="text-lg font-semibold mb-3 border-b pb-2">Order History</h3>
                        {userData.orders.length > 0 ? (
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="p-2">Order ID</th>
                                        <th className="p-2">Date</th>
                                        <th className="p-2">Total</th>
                                        <th className="p-2">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {userData.orders.map((order) => (
                                        <tr key={order.id} className="border-b">
                                            <td className="p-2">{order.id}</td>
                                            <td className="p-2">{new Date(order.createdAt).toLocaleDateString()}</td>
                                            <td className="p-2">${order.total.toFixed(2)}</td>
                                            <td className="p-2">{order.status}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p>No order history found</p>
                        )}
                    </div>
                )}
            </div>
        );
    };

    return (
        <>
            <NavbarBasic />
            <div className="dashboard-container">
                <div className="login-box">
                    <h1 className="text-center">Customer Service</h1>
                    <h2 className="text-center mb-6">User Lookup</h2>
                    
                    <form onSubmit={handleSearch} className="space-y-4">
                        <div className="filter-dropdown">
                            <label htmlFor="searchType" className="block text-sm font-medium text-gray-700">
                                Search By
                            </label>
                            <select
                                id="searchType"
                                value={searchType}
                                onChange={(e) => setSearchType(e.target.value)}
                                className="mt-1 block w-full"
                            >
                                <option value="id">User ID</option>
                                <option value="email">Email</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="searchTerm" className="block text-sm font-medium text-gray-700 mb-2">
                                {searchType === 'id' ? 'User ID' : 'Email Address'}
                            </label>
                            <div className="flex">
                                <input
                                    id="searchTerm"
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder={`Enter ${searchType === 'id' ? 'User ID' : 'Email Address'}`}
                                    className="flex-grow mr-2 block w-full rounded-md border border-gray-300 shadow-sm py-2 px-3"
                                />
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="button"
                                >
                                    {isLoading ? 'Searching...' : 'Search'}
                                </button>
                            </div>
                        </div>
                    </form>

                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4" role="alert">
                            {error}
                        </div>
                    )}

                    {renderUserDetails()}
                </div>
            </div>
        </>
    );
}