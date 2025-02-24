// src/components/Login.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from '@tanstack/react-router';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../../hooks/useAuth';

const LoginComponent: React.FC = () => {
    const [name, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await login({ name, email, password });
            navigate({ to: '/users', params: {} })
        } catch (error) {
            console.error('Login error', error);
        }
    };
    const handleGoogleLoginSuccess = async (tokenResponse: any) => {
        try {
            const res = await axios.post('http://localhost:5000/api/google-login', {
                token: tokenResponse.credential,
            });
            localStorage.setItem('token', res.data.token);
            //   navigate('/');
        } catch (error) {
            console.error('Google login error', error);
        }
    };

    return (
        <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
            <div>
                <h1>Login</h1>
                <form onSubmit={handleLogin}>
                    <div>
                        <label>Username</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Email</label>
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit">Login</button>
                </form>
                <GoogleLogin
                    onSuccess={handleGoogleLoginSuccess}
                    onError={() => console.error('Google login error')}
                />
            </div>
        </GoogleOAuthProvider>
    );
};

export default LoginComponent;
