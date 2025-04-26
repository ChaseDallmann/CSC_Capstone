'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function PasswordResetForm({ token }) {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [tokenValid, setTokenValid] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080';
        const response = await axios.get(`${apiUrl}/auth/verify-token`, {
          params: { token },
          headers: { 'Content-Type': 'application/json' }
        });

        if (response.status !== 200) throw new Error('Token verification failed');
        setTokenValid(true);
      } catch (error) {
        console.error('Token verification error:', error);
        setTokenValid(false);
        setError('This password reset link has expired or is invalid. Please request a new one.');
      }
    };

    if (token) verifyToken();
  }, [token]);

  const checkPreviousPassword = async () => {
    if (!email || !newPassword) return;

    try {
      const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080';
      const response = await axios.get(`${apiUrl}/user/check-password`, {
        params: { email, password: newPassword },
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.data === false) {
        setError('This password has been used before. Please choose a different one.');
      }
    } catch (error) {
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

    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080';
      const response = await axios.post(`${apiUrl}/auth/reset-password`, {
        email,
        token,
        newPassword
      }, {
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' }
      });

      setMessage('Password has been reset successfully!');
      setError('');

      setTimeout(() => {
        router.push('/Login');
      }, 2000);

    } catch (error) {
      console.error('Reset password error:', error);
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

  if (!tokenValid) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-bold text-gray-900">Invalid Reset Link</h2>
            <p className="mt-2 text-sm text-gray-600">{error}</p>
            <div className="mt-4">
              <Link href="/ForgotPassword" className="text-indigo-600 hover:text-indigo-500">Request a new password reset link</Link>
              <br />
              <Link href="/Login" className="text-indigo-600 hover:text-indigo-500">Back to login</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="password-reset-container">
      <div className="password-reset-box">
        <h2 className="reset-password-h2">Reset Your Password</h2>
        <p className="reset-password-p">Please enter your email and new password below</p>

        {message && <div className="resert-password-message">{message}</div>}
        {error && <div className="reset-password-error">{error}</div>}

        <form className="reset-password-form" onSubmit={handleSubmit}>
          <div className="reset-password-inputs">
            <label>Email address</label>
            <input type="email" value={email} required onChange={(e) => setEmail(e.target.value)} />

            <label>New Password</label>
            <input type="password" value={newPassword} required onChange={(e) => setNewPassword(e.target.value)} />

            <label>Confirm Password</label>
            <input type="password" value={confirmPassword} required onChange={(e) => setConfirmPassword(e.target.value)} />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? 'Processing...' : 'Reset Password'}
          </button>

          <div className="text-center">
            <Link href="/Login" className="text-indigo-600 hover:text-indigo-500">Back to login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
