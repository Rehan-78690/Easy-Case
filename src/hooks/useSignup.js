import { useState } from 'react';
import { signupService } from '../services/authService'; // Adjust the path as necessary

const useSignup = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const signup = async (formData) => {
        setLoading(true);
        setError(null); 

        console.log(formData);
        let newFormData = {
            username: formData.username,
            email: formData.email,
            password: formData.password
        }
        console.log(newFormData);
        try {
            await signupService(newFormData);
            console.log('Signup successful');
            window.location.href = '/MainSellerPage';
        } catch (err) {
            setError(err.message || 'Signup failed');
        } finally {
            setLoading(false);
        }
    };

    return { signup, error, loading };
};

export default useSignup;
