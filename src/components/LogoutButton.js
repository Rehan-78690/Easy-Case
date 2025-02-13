import React from 'react';
import { Button } from '@chakra-ui/react';
import { logoutService } from '../services/authService'; // Adjust the import path as necessary

const LogoutButton = () => {
    const handleLogout = async () => {
        try {
            await logoutService();
        } catch (error) {
            console.error('Logout failed:', error.message);
        }
    };

    return (
        <Button onClick={handleLogout} colorScheme="teal">
            Logout
        </Button>
    );
};

export default LogoutButton;
