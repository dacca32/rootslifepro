import { useState, useEffect } from 'react';
import { UserLogin, UserRole } from '../types';
import AuthService from '../services/users/auth-service';
import { useNavigate } from '@tanstack/react-router';

type AuthInfo = {
    isAuthenticated: boolean,
    role: UserRole | null
}

export const useAuth = () => {
    const [authInfo, setAuthInfo] = useState<AuthInfo>({
        isAuthenticated: false,
        role: null
    });


    useEffect(() => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role') as UserRole | null;

        if (token && role) {
            setAuthInfo({
                isAuthenticated: true,
                role: role,
            });
        } else {
            setAuthInfo({
                isAuthenticated: false,
                role: null,
            });
        }
    }, []);


    const login = async (user: UserLogin) => {
        await AuthService.loginUser(user)
    }

    const logout = async () => {
        await AuthService.logoutUser()
    }

    return { authInfo, login, logout };
};

export type AuthContext = ReturnType<typeof useAuth>
