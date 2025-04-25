// Helper to manage API URLs and ensure they work in all environments
export const getApiUrl = (path = '') => {
  // In development, use the environment variable
  let baseUrl = '';
  
  // When running locally but connecting to EC2
  if (process.env.NODE_ENV === 'development') {
    baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080';
  } 
  // In production on EC2, use relative URLs
  else {
    // Empty base URL means it will use relative paths
    baseUrl = '';
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