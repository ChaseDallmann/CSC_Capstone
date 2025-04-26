// Helper to manage API URLs and ensure they work in all environments
export const getApiUrl = (path = '') => {
  // Use environment variable or fallback to localhost for development
  let baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
  
  console.log('Using API base URL:', baseUrl);
  
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