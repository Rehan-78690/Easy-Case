import { EmailIcon } from '@chakra-ui/icons';
import axios from 'axios';

// Set the base URL for your backend
const API_URL = 'http://127.0.0.1:8000/auth';

// Login Service: Handles sending the login credentials and receiving the JWT tokens
export const loginService = async (credentials) => {
    let newCredentials = {
        email: credentials.email,
        password: credentials.password
    }
    try {
        const response = await axios.post(`${API_URL}/jwt/create/`, newCredentials);

        // Store tokens in localStorage
        localStorage.setItem('accessToken', response.data.access);
        localStorage.setItem('refreshToken', response.data.refresh);

        return response.data; // { access, refresh }
    } catch (error) {
        throw new Error(error.response?.data?.detail || 'Login failed');
    }
};

// Refresh Token Service: Handles refreshing the access token
export const refreshTokenService = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
        throw new Error('No refresh token available');
    }

    try {
        const response = await axios.post(`${API_URL}/jwt/refresh/`, {
            refresh: refreshToken,
        });
        // Update the access token in localStorage
        localStorage.setItem('accessToken', response.data.access);
        return response.data.access;
    } catch (error) {
        throw new Error('Token refresh failed');
    }
};

// Logout Service: Invalidates the refresh token and removes it from storage
export const logoutService = async () => {
    try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
            await axios.post(`${API_URL}/logout/`, {}, {
                headers: {
                    'Authorization': `Bearer ${refreshToken}`
                }
            });
        }

        // Clear tokens from local storage
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/auth';  // Redirect after logout
    } catch (error) {
        console.error('Logout failed', error.response?.data || error.message);
    }
};

// Signup Service: Create a new user
export const signupService = async (userData) => {
    try {
        await axios.post(`${API_URL}/users/`, userData);
    } catch (error) {
        throw new Error(error.response?.data?.detail || 'Signup failed');
    }
};
