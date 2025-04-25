'use client';

import React, { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Cookies from 'js-cookie';
import { AuthContext, AuthProvider } from '../../../utils/auth-context';
import NavbarBasic from '../../components/NavbarBasic/NavbarBasic';

const ChangeInfoPage = () => {
    const { user, isAuthenticated, handleLogout } = useContext(AuthContext);
    const router = useRouter();

    // Form state
    const [userData, setUserData] = useState({
        email: '',
        name: '',
        streetAddress: '',
        city: '',
        state: '',
        zipCode: ''
    });
    
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    
    // Error and loading states
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isPasswordLoading, setIsPasswordLoading] = useState(false);
    const [submitError, setSubmitError] = useState(null);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [isDataLoading, setIsDataLoading] = useState(true);

    // Check if email already exists
    const emailDuplicateCheck = async (emailToCheck) => {
        try {
            // Only check for duplicate if the email has been changed
            if (user?.email === emailToCheck) {
                return false; // Not a duplicate if unchanged
            }
            
            const token = Cookies.get('authToken');
            //Checking to see if the email exists
            const response = await axios.get(`http://localhost:8080/user/check-email?email=${encodeURIComponent(emailToCheck)}`, {
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
            return true;
        }
    };

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

                //Setting the form data with the response
                setUserData({
                    email: response.data.email || '',
                    name: response.data.name || '',
                    streetAddress: response.data.streetAddress || '',
                    city: response.data.city || '',
                    state: response.data.state || '',
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

   //Form validation functions
    const validateForm = () => {
        const newErrors = {};
        let hasChanges = false;

        // Name validation (only if provided)
        if (userData.name && userData.name.trim().length < 2) {
            newErrors.name = 'Name must be at least 2 characters long';
        }

        // Email validation (only if changed)
        if (userData.email && userData.email !== user?.email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(userData.email)) {
                newErrors.email = 'Please enter a valid email address';
            }
            hasChanges = true;
        }

        // Zip code validation (if provided)
        if (userData.zipCode) {
            const zipCodeRegex = /^\d{5}(-\d{4})?$/;
            if (!zipCodeRegex.test(userData.zipCode)) {
                newErrors.zipCode = 'Please enter a valid zip code';
            }
            hasChanges = true;
        }
        
        if (userData.streetAddress) hasChanges = true;
        if (userData.city) hasChanges = true;
        if (userData.state) hasChanges = true;

        if (!hasChanges) {
            newErrors.general = 'No changes were made to update';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle input changes for profile data
    const handleChange = (element) => {
        const { name, value } = element.target;
        setUserData(prevState => ({
            ...prevState,
            [name]: value
        }));
        
        if (errors[name]) {
            setErrors(prevErrors => {
                const newErrors = {...prevErrors};
                delete newErrors[name];
                return newErrors;
            });
        }
    };
    
    // Handle input changes for password data
    const handlePasswordChange = (element) => {
        const { name, value } = element.target;
        setPasswordData(prevState => ({
            ...prevState,
            [name]: value
        }));
        
        // Clear error when user starts typing
        setSubmitError(null);
    };


    // Handle password change submission
    const handlePasswordSubmit = async (event) => {
        event.preventDefault();
        setSubmitError(null);
        setSubmitSuccess(false);
        
        // Validation
        if (!passwordData.currentPassword) {
            setSubmitError('Current password is required');
            return;
        }
        
        if (!passwordData.newPassword) {
            setSubmitError('New password is required');
            return;
        }
        
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setSubmitError('Passwords do not match');
            return;
        }
        
        if (passwordData.newPassword.length < 6) {
            setSubmitError('New password must be at least 8 characters long');
            return;
        }
        
        setIsPasswordLoading(true);
        
        try {
            // Send request to change password
            const token = Cookies.get('authToken');
            const response = await axios.post(
                'http://localhost:8080/auth/change-password',
                {
                    email: userData.email,
                    currentPassword: passwordData.currentPassword,
                    newPassword: passwordData.newPassword
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                }
            );
            
            setSubmitSuccess(true);
            
            // Password change requires login again
            setTimeout(() => {
                handleLogout();
                router.push('/Login');
            }, 2000);
        } catch (error) {
            console.error('Password change failed:', error);
            setSubmitError(error.response?.data?.message || 'Failed to change password. Please try again.');
        } finally {
            setIsPasswordLoading(false);
        }
    };
    
    // Submit handler for profile info
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

            // Only include fields that have values
            const submissionData = {};
            
            if (userData.name) submissionData.name = userData.name;
            if (userData.streetAddress) submissionData.streetAddress = userData.streetAddress;
            if (userData.city) submissionData.city = userData.city;
            if (userData.state) submissionData.state = userData.state;
            if (userData.zipCode) submissionData.zipCode = parseInt(userData.zipCode);
            
            // Only check for duplicate email if email is changing
            if (userData.email && userData.email !== user?.email) {
                const isDuplicate = await emailDuplicateCheck(userData.email);
                if (isDuplicate) {
                    setSubmitError('Email already exists');
                    setIsLoading(false);
                    return;
                }
                submissionData.email = userData.email;
            }

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
            
            // If email was updated, we need to log out and re-login
            if (submissionData.email) {
                // Show success message for 2 seconds then redirect to Login
                setTimeout(() => {
                    handleLogout();
                    router.push('/Login');
                }, 2000);
            } else {
                // Show success message for 2 seconds then redirect to Dashboard
                setTimeout(() => {
                    router.push('/Dashboard');
                }, 2000);
            }

        } catch (error) {
            // Handle errors
            console.error('Update failed:', error);
            setSubmitError(error.response?.data?.message || 'Failed to update profile. Please try again.');
        } finally {
            // Only stop loading
            setIsLoading(false);
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
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={userData.email}
                            onChange={handleChange}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mb-2">{errors.email}</p>
                        )}
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
                        <label htmlFor="state">State (Optional)</label>
                        <input
                            type="text"
                            id="state"
                            name="state"
                            value={userData.state}
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
                        {errors.general && (
                            <p className="text-red-500 text-sm mb-2">{errors.general}</p>
                        )}
                        <button 
                            type="submit" 
                            disabled={isLoading}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            {isLoading ? 'Updating...' : 'Update Info'}
                        </button>
                    </form>
                    <div className="password-container mt-8">
                        <div className="password-box">
                            <h2 className="text-xl font-bold mb-4">Change Password</h2>
                            <form onSubmit={handlePasswordSubmit}>
                                <label htmlFor="currentPassword">Current Password</label>
                                <input 
                                    type="password" 
                                    id="currentPassword" 
                                    name="currentPassword"
                                    value={passwordData.currentPassword}
                                    onChange={handlePasswordChange}
                                    className="w-full p-2 border rounded"
                                />
                                
                                <label htmlFor="newPassword">New Password</label>
                                <input 
                                    type="password" 
                                    id="newPassword" 
                                    name="newPassword"
                                    value={passwordData.newPassword}
                                    onChange={handlePasswordChange}
                                    className="w-full p-2 border rounded"
                                />
                                
                                <label htmlFor="confirmPassword">Confirm New Password</label>
                                <input 
                                    type="password" 
                                    id="confirmPassword" 
                                    name="confirmPassword"
                                    value={passwordData.confirmPassword}
                                    onChange={handlePasswordChange}
                                    className="w-full p-2 border rounded"
                                />
                                
                                <button 
                                    type="submit" 
                                    disabled={isPasswordLoading}
                                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
                                >
                                    {isPasswordLoading ? "Updating..." : "Change Password"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div> 
        </>
    );
};

export default ChangeInfoPage;