// Helper to manage API URLs and ensure they work in all environments
export const getApiUrl = (path = '') => {
  // Get the base URL from environment variables
  let baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080';
  
  // Use default EC2 URL as a fallback for all environments
  const ec2Url = 'http://44.204.26.211:5000';
  
  // Convert relative paths to direct EC2 URL to avoid mixed content issues
  if ((baseUrl === '/backend' || !baseUrl.startsWith('http')) && typeof window !== 'undefined') {
    baseUrl = ec2Url;
  }
  
  // Add leading slash to path if needed
  if (path && !path.startsWith('/')) {
    path = '/' + path;
  }
  
  // Full URL handling
  if (baseUrl.endsWith('/') && path.startsWith('/')) {
    // Avoid double slashes
    path = path.substring(1);
  }
  
  return `${baseUrl}${path}`;
};

// Export axios instance with default settings
import axios from 'axios';

const apiClient = axios.create();

// Add request interceptor to modify URLs
apiClient.interceptors.request.use((config) => {
  // Extract path from the URL
  const url = new URL(config.url, 'http://placeholder.com');
  const path = url.pathname;
  
  // Replace the URL with our helper function
  config.url = getApiUrl(path);
  
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default apiClient;