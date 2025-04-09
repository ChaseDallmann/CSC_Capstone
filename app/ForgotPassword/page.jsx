'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import NavbarBasic from '../components/NavbarBasic/NavbarBasic';
import Link from 'next/link';
import axios from 'axios';
import crypto from 'crypto';
import { AuthContext } from '../Context/AuthContext';
import Cookies from 'js-cookie';
import { sendResetEmail } from '../Actions/Emails/sendResetEmail';

export default function ForgotPassword() {
  const { user } = React.useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      // Generate a secure random token that is URL-safe in base 64
      const resetPasswordToken = crypto.randomBytes(32).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
      const token = Cookies.get('authToken');
      
      // Calculate expiration date (24 hours from now)
      const today = new Date();
      const expirationDate = new Date(today);
      expirationDate.setDate(today.getDate() + 1);
      
      // Format date properly for ISO string (ensure no milliseconds for better compatibility)
      const formattedExpiry = expirationDate.toISOString().split('.')[0];

      console.log('Sending email to:', email);
      console.log('With token:', resetPasswordToken);

      // First send email using server action (now with only two parameters)
      const emailResult = await sendResetEmail(email, resetPasswordToken);

      if (!emailResult.success) {
        console.error('Email sending failed:', emailResult.error);
        throw new Error('Failed to send reset email');
      }
      
      console.log('Email sent successfully, now updating database');
      
      // Then store the token in the database
      try {
        const response = await axios.put(
          "http://localhost:8080/auth/reset-token",
          { 
            email,
            token: resetPasswordToken,
            expiryDate: formattedExpiry
          },
          { 
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
              'Origin': 'http://localhost:3000'
            }
          }
        );
        console.log('Server response:', response.data);
      } catch (error) {
        console.error('Error saving token in database:', error.response?.data || error.message);
        throw error;
      }

      console.log('Request successful:', email, resetPasswordToken, formattedExpiry);
      
      setMessage("If your email exists in our system, you will receive a password reset link shortly.");
      setEmail('');
    } catch (putError) {
      console.error('Error with request:', putError.response?.data || putError.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavbarBasic />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-bold text-gray-900">Forgot Password</h2>
            <p className="mt-2 text-sm text-gray-600">
              Enter your email address and we'll send you a link to reset your password
            </p>
          </div>
          
          {message && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
              {message}
            </div>
          )}
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
              {error}
            </div>
          )}
          
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            
            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </div>
            
            <div className="text-sm text-center">
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