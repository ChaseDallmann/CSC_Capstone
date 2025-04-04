'use client';

import React, { useState, useContext, useEffect } from 'react';
import { redirect, useRouter } from 'next/navigation';
import axios from 'axios';
import Cookies from 'js-cookie';
import { AuthContext, AuthProvider } from '../../Context/AuthContext';
import NavbarBasic from '../../components/NavbarBasic/NavbarBasic';

const ChangeInfoPage = () => {
    const { user, isAuthenticated, handleLogout } = useContext(AuthContext);
    const router = useRouter();

    const [emailData, setEmailData] = useState({
        email: ''
    })
    // Form state
    const [userData, setUserData] = useState({
        name: '',
        streetAddress: '',
        city: '',
        zipCode: ''
    });

    // Error and loading states
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [submitError, setSubmitError] = useState(null);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [isDataLoading, setIsDataLoading] = useState(true);

    // Check if email already exists
    const emailDuplicateCheck = async () => {
        try {
            // Only check for duplicate if the email has been changed
            if (user?.email == emailData.email) {
                return false; // Not a duplicate if unchanged
            }
            
            const token = Cookies.get('authToken');
            // Make a GET request to check if the email exists
            // Check to see if the emailData.email is a dupliate of a database entry
            const response = await axios.get(`http://localhost:8080/user/email?email=${encodeURIComponent(emailData.email)}`, {
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            
            console.log("Email check response:", response.data);
            // If response is true, email exists (is duplicate)
            return response.data;
        }
        catch (error) {
            console.error('Error checking email:', error);
            setSubmitError('Failed to check email availability. Please try again.');
            return true; // Prevent submission on error
        }
    };

    // Fetch user data when component mounts
    useEffect(() => {
        const fetchUserData = async () => {
            if (!user?.id) return;

            try {
                setIsDataLoading(true);
                const token = Cookies.get('authToken');
                const response = await axios.get(`http://localhost:8080/user/${user.id}`, {
                    headers: { 
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                });

                setEmailData({
                    email: response.data.email || ''
                });

                // Update form data with fetched user information
                setUserData({
                    name: response.data.name || '',
                    streetAddress: response.data.streetAddress || '',
                    city: response.data.city || '',
                    zipCode: response.data.zipCode ? response.data.zipCode.toString() : ''
                });
            } catch (error) {
                console.error('Failed to fetch user data:', error);
                setSubmitError('Failed to load user information');
            } finally {
                setIsDataLoading(false);
            }
        };

        fetchUserData();
    }, [user?.id]);

    // Validation function
    const validateForm = () => {
        const newErrors = {};

        // Name validation
        if (!userData.name || userData.name.trim().length < 2) {
            newErrors.name = 'Name must be at least 2 characters long';
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailData.email || !emailRegex.test(emailData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        // Zip code validation (if provided)
        if (userData.zipCode) {
            const zipCodeRegex = /^\d{5}(-\d{4})?$/;
            if (!zipCodeRegex.test(userData.zipCode)) {
                newErrors.zipCode = 'Please enter a valid zip code';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle input changes
    const handleChange = (element) => {
        const { name, value } = element.target;
        setEmailData(prevState => ({
            ...prevState,
            [name]: value
        }))
        setuserData(prevState => ({
            ...prevState,
            [name]: value
        }));
        
        // Clear specific field error when user starts typing
        if (errors[name]) {
            setErrors(prevErrors => {
                const newErrors = {...prevErrors};
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    //Email change handler
    const handleSubmitEmailChange = async (event) => {
        event.preventDefault();
        setSubmitError(null);
        setSubmitSuccess(false);

        //Checking to see if the email is a duplicate email
        if(emailDuplicateCheck()) {
            setSubmitError('Email already exists');
            setIsLoading(false);
            return;
        }

        setIsLoading(true);

        try {
            const token = Cookies.get('authToken');

            const submissionData = {
                ...emailData
            };

            const response = await axios.put(
                `http://localhost:8080/user/${user.id}`,
                submissionData,
                {
                    headers: { 
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                }
            );

            setSubmitSuccess(true);

            // Show success message for 2 seconds then redirect to Dashboard
            setTimeout(() => {
                handleLogout();
                redirect('/Login');
            }, 2000);


        } catch (error) {
            // Handle errors
            console.error('Update failed:', error);
            setSubmitError(error.response?.data?.message || 'Failed to update profile. Please try again.');
        } finally {
            // Only stop loading
            setIsLoading(false);
            // DO NOT clear form data or reset other states here
        }
    }

    // Submit handler
    const handleSubmit = async (event) => {
        event.preventDefault();
        setSubmitError(null);
        setSubmitSuccess(false);

        // Validate form
        if (!validateForm()) {
            return;
        }

        // Start loading
        setIsLoading(true);

        try {
            // Get authentication token
            const token = Cookies.get('authToken');

            // Prepare data for submission (convert zipCode to number)
            const submissionData = {
                ...userData,
                zipCode: userData.zipCode ? parseInt(userData.zipCode) : 0
            };

            // Send update request
            const response = await axios.put(
                `http://localhost:8080/user/${user.id}`, 
                submissionData, 
                {
                    headers: { 
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                }
            );

            // Handle successful update
            setSubmitSuccess(true);
            
            // Show success message for 2 seconds then redirect to Dashboard
            setTimeout(() => {
                handleLogout();
                redirect('/Login');
            }, 2000);

        } catch (error) {
            // Handle errors
            console.error('Update failed:', error);
            setSubmitError(error.response?.data?.message || 'Failed to update profile. Please try again.');
        } finally {
            // Only stop loading
            setIsLoading(false);
            // DO NOT clear form data or reset other states here
        }
    };

    // Redirect if not authenticated
    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/Login');
        }
    }, [isAuthenticated]);

    // Loading state
    if (isDataLoading) {
        return (
            <>
                <NavbarBasic />
                <div className="login-container">
                    <div className="login-box">
                        <h2>Loading Profile...</h2>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <NavbarBasic />
            <div className="login-container">
                <div className="login-box">
                    <h2>Update Profile</h2>
                    
                    {submitError && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                            {submitError}
                        </div>
                    )}

                    {submitSuccess && (
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
                            Profile updated successfully! Redirecting...
                        </div>
                    )}

                    <div className='email-container'>
                        <form onSubmit={handleSubmitEmailChange}>
                            <label htmlFor="email">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={emailData.email}
                                    onChange={handleChange}
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-sm mb-2">{errors.email}</p>
                                )}
                        </form>
                        <button 
                            type="submit" 
                            disabled={isLoading}
                        >
                            {isLoading ? 'Updating...' : 'Update Email'}
                        </button>
                        <br />
                    </div>

                    <form onSubmit={handleSubmit}>
                        <label htmlFor="name">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={userData.name}
                            onChange={handleChange}
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm mb-2">{errors.name}</p>
                        )}

                        <label htmlFor="streetAddress">Street Address</label>
                        <input
                            type="text"
                            id="streetAddress"
                            name="streetAddress"
                            value={userData.streetAddress}
                            onChange={handleChange}
                        />

                        <label htmlFor="city">City (Optional)</label>
                        <input
                            type="text"
                            id="city"
                            name="city"
                            value={userData.city}
                            onChange={handleChange}
                        />

                        <label htmlFor="zipCode">Zip Code (Optional)</label>
                        <input
                            type="text"
                            id="zipCode"
                            name="zipCode"
                            value={userData.zipCode}
                            onChange={handleChange}
                        />
                        {errors.zipCode && (
                            <p className="text-red-500 text-sm mb-2">{errors.zipCode}</p>
                        )}

                        <button 
                            type="submit" 
                            disabled={isLoading}
                        >
                            {isLoading ? 'Updating...' : 'Update Info'}
                        </button>

                        <div className="password-container">
                            <div className="password-box">
                                <h2>Change Password</h2>
                                <label htmlFor="currentPassword">Current Password</label>
                                <input type="password" id="currentPassword" name="currentPassword" />
                                <label htmlFor="newPassword">New Password</label>
                                <input type="password" id="newPassword" name="newPassword" />
                                <label htmlFor="confirmPassword">Confirm New Password</label>
                                <input type="password" id="confirmPassword" name="confirmPassword" />
                                <button type='button' disabled={isLoading}> {isLoading ? "Updating..." : "Change Password"}</button>
                            </div>
                        </div> 
                    </form>
                </div>
            </div> 
        </>
    );
};

export default ChangeInfoPage;