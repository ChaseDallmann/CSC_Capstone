import axios from "axios";
import Cookies from "js-cookie";

export const fetchAccountInfo = async (userId) => {
    const token = Cookies.get('authToken');

    try {
        // Ensure API URL has https:// prefix
        let apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
        if (apiUrl && !apiUrl.startsWith('http')) {
            apiUrl = 'https://' + apiUrl;
        }
        const response = await axios.get(`${apiUrl}/user/${userId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.error('Failed to fetch account info:', error);
        throw error;
    }
};