import React, { createContext, useState, ReactNode } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

interface AuthContextType {
    auth: AuthState | null;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
}

interface AuthState {
    access_token: string;
    user: any;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [auth, setAuth] = useState<AuthState | null>(null);

    const login = async (username: string, password: string) => {
        try {
            const response = await axios.post('http://localhost:5000/login', { username, password });
            const { access_token } = response.data;
            const decoded = jwtDecode(access_token);
            setAuth({ access_token, user: decoded });
            localStorage.setItem('access_token', access_token);
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    const logout = () => {
        setAuth(null);
        localStorage.removeItem('access_token');
    };

    return (
        <AuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
