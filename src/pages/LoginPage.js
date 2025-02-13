import React from 'react';
import LoginForm from '../components/LoginForm';
import useLogin from '../hooks/useLogin';

const LoginPage = () => {
    const { login, error, loading } = useLogin();

    const handleLogin = async (formData) => {
        await login(formData);
    };

    return (
        <div>
            <LoginForm onSubmit={handleLogin} error={error} />
            {loading && <p>Loading...</p>}
        </div>
    );
};

export default LoginPage;
