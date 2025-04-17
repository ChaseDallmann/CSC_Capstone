'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import NavbarBasic from "../../components/NavbarBasic/NavbarBasic";
import Link from 'next/link';

export default function PasswordResetPage({ params }) {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [tokenValid, setTokenValid] = useState(true);
  
  const router = useRouter();
  // Use React.use to unwrap params as recommended by Next.js
  const { token } = React.use(params);
  
  // Check token validity on component mount
  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/auth/verify-token`,
          {
            params: { token },
            headers: {
              'Content-Type': 'application/json',
            }
          }
        );
        if (response.status !== 200) {
          throw new Error('Token verification failed');
        }
        setTokenValid(true);
      } catch (error) {
        console.error('Token verification error:', error);
        setTokenValid(false);
        setError('This password reset link has expired or is invalid. Please request a new one.');
      }
    };
    
    verifyToken();
  }, [token]);

  const checkPreviousPassword = async () => {
    if (!email || !newPassword) return; // Don't check if either field is empty
    
    try {
      const response = await axios.get(`http://localhost:8080/user/check-password`, {
        params: {
          email: email,
          password: newPassword
        },
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      // Check if the password has been used before
      if (response.data === false) {
        setError('This password has been used before. Please choose a different one.');
      }
    }
    catch (error) {
      console.error('Password check error:', error);
    }
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    checkPreviousPassword();
    
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (newPassword.length < 6) {
      setError('Password must be at least 8 characters long');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.post('http://localhost:8080/auth/reset-password', {
        email: email,
        token: token,
        newPassword: newPassword
      }, { 
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      setMessage('Password has been reset successfully!');
      setError('');
      
      // Redirect to login page after 2 seconds
      setTimeout(() => {
        router.push('/Login');
      }, 2000);
      
    } catch (error) {
      console.error('Reset password error:', error);
      
      // Handle specific error for invalid token
      if (error.response?.status === 401 && error.response?.data?.message?.includes('token')) {
        setError('This password reset link has expired or is invalid. Please request a new one.');
        setTokenValid(false);
      } else {
        setError(error.response?.data?.message || 'An error occurred while resetting your password');
      }
    } finally {
      setLoading(false);
    }
  };
  
  // Render a different UI if the token is invalid
  if (!tokenValid) {
    return (
      <>
        <NavbarBasic />
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg">
            <div className="text-center">
              <h2 className="mt-6 text-3xl font-bold text-gray-900">Invalid Reset Link</h2>
              <p className="mt-2 text-sm text-gray-600">
                {error || 'This password reset link has expired or is invalid.'}
              </p>
            </div>
            
            <div className="mt-8 text-center">
              <Link href="/ForgotPassword" className="font-medium text-indigo-600 hover:text-indigo-500">
                Request a new password reset link
              </Link>
            </div>
            
            <div className="mt-4 text-center">
              <Link href="/Login" className="font-medium text-indigo-600 hover:text-indigo-500">
                Back to login
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }
  
  return (
    <>
      <NavbarBasic />
      <div className="password-reset-container">
        <div className="password-reset-box">
          <div className="password-reset-header">
            <h2 className="reset-password-h2">Reset Your Password</h2>
            <p className="reset-password-p">
              Please enter your email and new password below
            </p>
          </div>
          
          {message && (
            <div className="resert-password-message">
              {message}
            </div>
          )}
          
          {error && (
            <div className="reset-password-error">
              {error}
            </div>
          )}
          
          <form className="reset-password-form" onSubmit={handleSubmit}>
            <div className="reset-password-inputs">
              <div className="rest-password-email">
                <label htmlFor="email" className="reset-password-email-label">Email address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              
              <div className="reset-password-new-password">
                <label htmlFor="new-password" className="reset-password-new-password-label">New Password</label>
                <input
                  id="new-password"
                  name="newPassword"
                  type="password"
                  required
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              
              <div className="reset-password-confirm-password">
                <label htmlFor="confirm-password" className="reset-password-confirm-password-label">Confirm Password</label>
                <input
                  id="confirm-password"
                  name="confirmPassword"
                  type="password"
                  required
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>
            
            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {loading ? 'Processing...' : 'Reset Password'}
              </button>
            </div>
            
            <div className="text-center">
              <Link href="/Login" className="font-medium text-indigo-600 hover:text-indigo-500">
                Back to login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}