import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:8080';

// Function to handle API calls
export async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  
  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`;
  }

  // Get CSRF token from cookie if it exists (for non-GET requests)
  if (typeof document !== 'undefined' && ['POST', 'PUT', 'DELETE', 'PATCH'].includes(options.method || '')) {
    const tokenCookie = document.cookie
      .split('; ')
      .find(cookie => cookie.startsWith('XSRF-TOKEN='));
    
    if (tokenCookie) {
      const csrfToken = decodeURIComponent(tokenCookie.split('=')[1]);
      defaultHeaders['X-CSRF-TOKEN'] = csrfToken;
    }
  }
  
  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
    credentials: 'include', // Important for cookies
  });
  
  if (!res.ok) {
    // Handle errors
    const error = new Error('API request failed');
    try {
      const errorData = await res.json();
      (error as any).status = res.status;
      (error as any).data = errorData;
    } catch {
      (error as any).status = res.status;
    }
    throw error;
  }
  
  if (res.status === 204) {
    return null; // No content
  }
  
  return res.json();
}

// Auth Services
export const authService = {
  login: async (email: string, password: string) => {
    // First, get the CSRF token
    await fetch(`${API_URL}/csrf`, { credentials: 'include' });
    
    const data = await fetchAPI('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    if (data.token) {
      localStorage.setItem('token', data.token);
    }
    
    return data;
  },
  
  logout: () => {
    localStorage.removeItem('token');
  },
  
  getToken: () => {
    return typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  },
};

// Custom hook for data fetching
export function useAPI<T>(endpoint: string) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchAPI(endpoint);
        setData(result);
      } catch (e) {
        setError(e as Error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [endpoint]);
  
  return { data, error, loading };
}