'use client';

import Cookies from 'js-cookie';

// For client components, we'll need to handle encryption/decryption differently
// or use a simpler approach since we can't use server-side encryption

export function createClientSession(userData, token) {
  // Store the session data
  const expiresInDays = 7;
  
  // Store token in cookie
  Cookies.set('authToken', token, { 
    expires: expiresInDays, 
    secure: true,
    sameSite: 'lax',
    path: '/'
  });
  
  // Store minimal user data
  // Don't store sensitive data in client-accessible cookies
  Cookies.set('userData', JSON.stringify({
    id: userData.id,
    name: userData.name,
    role: userData.role
  }), { 
    expires: expiresInDays, 
    secure: true,
    sameSite: 'lax',
    path: '/'
  });
}

export function getClientSession() {
  const token = Cookies.get('authToken');
  const userData = Cookies.get('userData');
  
  if (!token || !userData) {
    return null;
  }
  
  try {
    return {
      token,
      user: JSON.parse(userData)
    };
  } catch (e) {
    console.error('Failed to parse user data', e);
    return null;
  }
}

export function deleteClientSession() {
  Cookies.remove('authToken', { path: '/' });
  Cookies.remove('userData', { path: '/' });
}

export function updateClientSession() {
  const token = Cookies.get('authToken');
  const userData = Cookies.get('userData');
  
  if (token && userData) {
    // Reset expiration by setting the cookies again
    const expiresInDays = 7;
    Cookies.set('authToken', token, { 
      expires: expiresInDays, 
      secure: true,
      sameSite: 'lax',
      path: '/'
    });
    
    Cookies.set('userData', userData, { 
      expires: expiresInDays, 
      secure: true,
      sameSite: 'lax',
      path: '/'
    });
  }
}