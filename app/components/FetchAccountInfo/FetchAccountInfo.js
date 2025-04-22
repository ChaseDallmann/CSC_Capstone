import axios from "axios";
import Cookies from "js-cookie";

export const fetchAccountInfo = async (userId) => {
    const token = Cookies.get('authToken');

    try {
        const response = await axios.get(`http://localhost:8080/user/${userId}`, {
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
