
import React, { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import AuthService from '../../services/auth/auth-service';
import { useAuth } from '../../contexts/auth/auth-context';

const LoginComponent: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            let sessionData = await AuthService.loginUser({ email, password });
            login(sessionData)
            navigate({ to: '/home', params: {} })
        } catch (error) {
            throw new Error(error as string);
        }

    };

    return (

        <div>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>

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
        </div>
    );
};

export default LoginComponent;
